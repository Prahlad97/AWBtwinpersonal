import {
  CURVE_DATA_KEYS,
  DEMAND_CURVE_COLORS,
  DEMAND_CURVE_DETAILS_COLORS,
  PROPERTIES,
} from '@/constants/demand-curve-constants';
import { cloneDeep } from 'lodash';
import moment from 'moment';
import { getNextCurveColorIndex } from '../utils/demand-curve-utils';
import { modifyDemandCurveFilters } from '../utils/filter-utils';
import { DEFAULT_COMPARISON_META } from './comparison-schema';

/** Normalize segment_data from API (supports { id, name, invert } or { segment_id, segment_name, inverted }). */
function segmentDataToSelection(segmentData) {
  if (!segmentData || typeof segmentData !== 'object') return null;
  const id = segmentData.id ?? segmentData.segment_id ?? '';
  const name = segmentData.name ?? segmentData.segment_name ?? '';
  const invert = segmentData.invert ?? segmentData.inverted ?? false;
  return { id, name, invert };
}

/**
 * Transforms raw API comparison response (DTO) into domain shape.
 * @param {Object} comparisonData - Raw API response (snake_case)
 * @returns {Object} Domain comparison { comparison, demandCurves, deltaCurves }
 */
export function comparisonFromResponse(comparisonData) {
  if (!comparisonData) return {};
  const {
    dcc_id,
    name,
    description,
    user_id,
    user_name,
    pilot_name,
    curve_type,
    consumption_type,
    is_shared,
    created_at,
  } = comparisonData?.comparison ?? {};

  const demandCurveFromDto = (curve, index) => {
    const {
      dcc_id: demand_curves_dcc_id,
      dcc_demand_curve_id,
      name: demand_curves_name,
      segment_name,
      segment_data,
      filters,
      saved_filter_id,
      saved_filter_name,
      timeframe,
      program_segment,
      created_at: curve_created_at,
    } = curve;

    const segmentSelection = segment_data
      ? segmentDataToSelection(segment_data)
      : segment_name != null && segment_name !== ''
      ? { id: '', name: segment_name, invert: false }
      : null;

    return {
      dccId: demand_curves_dcc_id,
      demandCurveId: dcc_demand_curve_id,
      name: demand_curves_name,
      type: 'demand',
      colorIndex: index,
      bgColor: DEMAND_CURVE_DETAILS_COLORS[index % DEMAND_CURVE_DETAILS_COLORS.length],
      curveColor: DEMAND_CURVE_COLORS[index % DEMAND_CURVE_COLORS.length],
      isEdited: true,
      [CURVE_DATA_KEYS.PROPERTIES_DATA]: {
        [PROPERTIES.PROGRAM_SEGMENT]: program_segment,
        [PROPERTIES.SAVED_FILTER_SELECTION]: {
          id: saved_filter_id ?? '',
          name: saved_filter_name ?? '',
          filters: Array.isArray(filters)
            ? modifyDemandCurveFilters(filters)
            : filters && typeof filters === 'object'
            ? filters
            : {},
        },
        [PROPERTIES.SEGMENT_SELECTION]: segmentSelection,
        [PROPERTIES.TIME_INTERVAL]: timeframe,
      },
      createdAt: curve_created_at,
    };
  };

  const deltaCurveFromDto = (curve, index) => {
    const {
      dcc_id: delta_curves_dcc_id,
      dcc_delta_curve_id,
      name: delta_curve_name,
      dcc_demand_curve_id_1,
      dcc_demand_curve_id_2,
      created_at: curve_created_at,
    } = curve;

    const baseIndex = (comparisonData?.demand_curves?.length || 0) + index;

    return {
      name: delta_curve_name,
      dccId: delta_curves_dcc_id,
      type: 'delta',
      colorIndex: baseIndex,
      bgColor: DEMAND_CURVE_DETAILS_COLORS[baseIndex % DEMAND_CURVE_DETAILS_COLORS.length],
      curveColor: DEMAND_CURVE_COLORS[baseIndex % DEMAND_CURVE_COLORS.length],
      deltaCurveId: dcc_delta_curve_id,
      isEdited: true,
      demandCurveId1: dcc_demand_curve_id_1,
      demandCurveId2: dcc_demand_curve_id_2,
      createdAt: curve_created_at,
    };
  };

  let plotDuration = curve_type;
  let extractedCurveType = curve_type;
  if (
    curve_type?.endsWith('_AVG') ||
    curve_type?.endsWith('_MIN') ||
    curve_type?.endsWith('_MAX')
  ) {
    plotDuration = curve_type.replace(/_(AVG|MIN|MAX)$/, '');
    extractedCurveType = curve_type;
  }

  return {
    comparison: {
      dccID: dcc_id,
      name,
      description,
      createdAt: created_at,
      pilotName: pilot_name,
      userId: user_id,
      userName: user_name,
      isShared: is_shared,
      PLOT_DURATION: plotDuration,
      curveType: extractedCurveType,
      isEdited: false,
      SHOW_AVERAGE: consumption_type === 'AVERAGE',
      VALUE: '',
      ...DEFAULT_COMPARISON_META,
    },
    demandCurves: (comparisonData.demand_curves || []).map((curve, index) =>
      demandCurveFromDto(curve, index)
    ),
    deltaCurves: (comparisonData.delta_curves || []).map((curve, index) =>
      deltaCurveFromDto(curve, index)
    ),
  };
}

/**
 * Builds API payload for create/update comparison from domain comparison.
 * @param {Object} comparisonData - Domain comparison (comparison, demandCurves, deltaCurves)
 * @param {{ emptyCountStyleFilterNames?: boolean }} [options]
 * @returns {Object} Payload for comparison API (snake_case)
 */
export function comparisonToPayload(comparisonData, options = {}) {
  const { emptyCountStyleFilterNames } = options;
  const comp = comparisonData?.comparison ?? {};

  const demandCurveToDto = (curve) => {
    const curveProperties = curve.curveProperties ?? curve[CURVE_DATA_KEYS.PROPERTIES_DATA] ?? {};
    const sel = curveProperties[PROPERTIES.SAVED_FILTER_SELECTION];
    const saved_filter_name = emptyCountStyleFilterNames && !sel?.id ? '' : sel?.name ?? '';
    const programSegment = curveProperties[PROPERTIES.PROGRAM_SEGMENT] ?? {};
    const segmentSelection = curveProperties[PROPERTIES.SEGMENT_SELECTION] ?? {};

    const payload = {
      dcc_demand_curve_id: curve.demandCurveId,
      name: curve.name,
      saved_filter_name,
      saved_filter_id: sel?.id ?? '',
      timeframe: curveProperties[PROPERTIES.TIME_INTERVAL] ?? '',
      program_segment: programSegment,
      segment_data: {
        id: segmentSelection?.segmentSnapshotId || segmentSelection?.id,
        name: segmentSelection?.segmentSnapshotName || segmentSelection?.name,
        invert: segmentSelection?.invert,
      },
    };

    return payload;
  };

  const deltaCurveToDto = (curve) => ({
    name: curve.name,
    dcc_delta_curve_id: curve.deltaCurveId,
    dcc_demand_curve_id_1: curve?.demandCurveId1,
    dcc_demand_curve_id_2: curve?.demandCurveId2,
  });

  return {
    comparison: {
      dcc_id: comp.dccID,
      name: comp.name,
      description: comp.description,
      pilot_name: comp.pilotName,
      user_name: comp.userName,
      user_email: comp.userEmail,
      is_shared: comp.isShared,
      curve_type: comp.curveType || comp.PLOT_DURATION,
      consumption_type: comp.SHOW_AVERAGE ? 'AVERAGE' : 'TOTAL',
    },
    demand_curves: (comparisonData.demandCurves || []).map(demandCurveToDto),
    delta_curves: (comparisonData.deltaCurves || []).map(deltaCurveToDto),
  };
}

/**
 * Builds API payload for update demand curve (single curve).
 * @param {Object} domainCurve - Domain demand curve or update fields
 * @returns {Object} Payload for updateDemandCurve API
 */
export function demandCurveToUpdatePayload(domainCurve) {
  if (!domainCurve) return {};
  const curveProperties =
    domainCurve.curveProperties ?? domainCurve[CURVE_DATA_KEYS.PROPERTIES_DATA] ?? {};
  const segmentSelection = curveProperties[PROPERTIES.SEGMENT_SELECTION] ?? {};
  const programSegment = curveProperties[PROPERTIES.PROGRAM_SEGMENT] ?? {};
  const sel = curveProperties[PROPERTIES.SAVED_FILTER_SELECTION];

  const segment_name =
    segmentSelection.segment_name ||
    segmentSelection.segmentSnapshotName ||
    segmentSelection.name ||
    '';
  const segment_id =
    segmentSelection.segment_id || segmentSelection.segmentSnapshotId || segmentSelection.id || '';

  const hasSegmentSelection = segment_id || segment_name || segmentSelection.name;

  const payload = {
    name: domainCurve.name,
    saved_filter_name: sel?.name ?? '',
    timeframe: curveProperties[PROPERTIES.TIME_INTERVAL] ?? '',
    program_segment: programSegment,
  };

  if (hasSegmentSelection) {
    payload.segment_data = {
      id: (segment_id || segmentSelection.id) ?? '',
      name: (segment_name || segmentSelection.name || segmentSelection.segmentSnapshotName) ?? '',
      invert: segmentSelection.invert ?? false,
    };
  }

  return payload;
}

/**
 * Merges API response from "add demand curve" into current domain comparison.
 * @param {{ response: Object, comparisonData: Object }} args
 * @returns {Object} Updated domain comparison
 */
export function mergeNewDemandCurveIntoComparison({ response, comparisonData }) {
  const existingCurveIds = comparisonData.demandCurves?.map((c) => c.demandCurveId) || [];
  const newCurve = (response.demand_curves || []).find(
    (c) => !existingCurveIds.includes(c.dcc_demand_curve_id)
  );
  if (!newCurve) return comparisonData;

  const nextColorIndex = getNextCurveColorIndex(
    comparisonData.demandCurves,
    comparisonData.deltaCurves
  );

  const segmentSelection = newCurve.segment_data
    ? segmentDataToSelection(newCurve.segment_data)
    : {
        id: newCurve.segment_id ?? newCurve.segment_name ?? '',
        name: newCurve.segment_name ?? '',
        invert: false,
      };

  const transformedCurve = {
    demandCurveId: newCurve.dcc_demand_curve_id,
    dccId: newCurve.dcc_id,
    name: newCurve.name,
    type: 'demand',
    colorIndex: nextColorIndex,
    bgColor: DEMAND_CURVE_DETAILS_COLORS[nextColorIndex % DEMAND_CURVE_DETAILS_COLORS.length],
    curveColor: DEMAND_CURVE_COLORS[nextColorIndex % DEMAND_CURVE_COLORS.length],
    isEdited: true,
    [CURVE_DATA_KEYS.PROPERTIES_DATA]: {
      [PROPERTIES.PROGRAM_SEGMENT]: newCurve.program_segment ?? {},
      [PROPERTIES.SAVED_FILTER_SELECTION]: {
        id: newCurve.saved_filter_name ?? '',
        name: newCurve.saved_filter_name ?? '',
      },
      [PROPERTIES.SEGMENT_SELECTION]: segmentSelection,
      [PROPERTIES.TIME_INTERVAL]: '2023/01/01 to 2024/01/01',
    },
    createdAt: newCurve.created_at ? parseInt(newCurve.created_at, 10) : moment().valueOf(),
  };

  const updated = cloneDeep(comparisonData);
  if (!updated.demandCurves) updated.demandCurves = [];
  updated.demandCurves.push(transformedCurve);
  return updated;
}

/**
 * Merges API response from "add delta curve" into current domain comparison.
 * @param {{ response: Object, comparisonData: Object }} args
 * @returns {Object} Updated domain comparison
 */
export function mergeNewDeltaCurveIntoComparison({ response, comparisonData }) {
  const existingCurveIds = comparisonData.deltaCurves?.map((c) => c.deltaCurveId) || [];
  const newCurve = (response.delta_curves || []).find(
    (c) => !existingCurveIds.includes(c.dcc_delta_curve_id)
  );
  if (!newCurve) return comparisonData;

  const nextColorIndex = getNextCurveColorIndex(
    comparisonData.demandCurves,
    comparisonData.deltaCurves
  );

  const transformedCurve = {
    deltaCurveId: newCurve.dcc_delta_curve_id,
    dccId: newCurve.dcc_id,
    name: newCurve.name,
    type: 'delta',
    colorIndex: nextColorIndex,
    bgColor: DEMAND_CURVE_DETAILS_COLORS[nextColorIndex % DEMAND_CURVE_DETAILS_COLORS.length],
    curveColor: DEMAND_CURVE_COLORS[nextColorIndex % DEMAND_CURVE_COLORS.length],
    isEdited: true,
    demandCurveId1: newCurve.dcc_demand_curve_id_1 ?? '',
    demandCurveId2: newCurve.dcc_demand_curve_id_2 ?? '',
    createdAt: newCurve.created_at ? parseInt(newCurve.created_at, 10) : moment().valueOf(),
  };

  const updated = cloneDeep(comparisonData);
  if (!updated.deltaCurves) updated.deltaCurves = [];
  updated.deltaCurves.push(transformedCurve);
  return updated;
}

/**
 * Merges API response from "update demand curve" into current domain comparison.
 * @param {{ response: Object, comparisonData: Object }} args
 * @returns {Object} Updated domain comparison
 */
export function mergeDemandCurveUpdateIntoComparison({ response, comparisonData }) {
  const { dcc_demand_curve_id } = response;
  const updated = cloneDeep(comparisonData);

  (updated.demandCurves || []).forEach((c) => {
    if (c.demandCurveId === dcc_demand_curve_id) {
      c.name = response.name;
      c.isEdited = true;
    }
  });

  const seriesKey = CURVE_DATA_KEYS.SERIES_DATA;
  if (updated.comparison?.[seriesKey]) {
    updated.comparison[seriesKey] = {
      ...updated.comparison[seriesKey],
      [dcc_demand_curve_id]: {
        ...updated.comparison[seriesKey][dcc_demand_curve_id],
        name: response.name,
      },
    };
  }
  updated.comparison.isEdited = true;
  return updated;
}

/**
 * Merges API response from "update delta curve" into current domain comparison.
 * @param {{ response: Object, comparisonData: Object }} args
 * @returns {Object} Updated domain comparison
 */
export function mergeDeltaCurveUpdateIntoComparison({ response, comparisonData }) {
  const { dcc_delta_curve_id } = response;
  const updated = cloneDeep(comparisonData);

  (updated.deltaCurves || []).forEach((c) => {
    if (c.deltaCurveId === dcc_delta_curve_id) {
      c.name = response.name;
      c.isEdited = true;
    }
  });

  const seriesKey = CURVE_DATA_KEYS.SERIES_DATA;
  if (updated.comparison?.[seriesKey]) {
    updated.comparison[seriesKey] = {
      ...updated.comparison[seriesKey],
      [dcc_delta_curve_id]: {
        ...updated.comparison[seriesKey][dcc_delta_curve_id],
        name: response.name,
      },
    };
  }
  updated.comparison.isEdited = true;
  return updated;
}

/**
 * Returns updated domain comparison with demand curve removed (local state after delete).
 * @param {{ demandCurveId: string, comparisonData: Object }} args
 * @returns {Object} Updated domain comparison
 */
export function deleteDemandCurveFromComparison({ demandCurveId, comparisonData }) {
  const updated = cloneDeep(comparisonData);
  const updatedCurves = (updated.demandCurves || []).filter(
    (c) => c.demandCurveId !== demandCurveId
  );
  const seriesKey = CURVE_DATA_KEYS.SERIES_DATA;
  if (updated.comparison?.[seriesKey]?.[demandCurveId]) {
    const next = { ...updated.comparison[seriesKey] };
    delete next[demandCurveId];
    updated.comparison[seriesKey] = next;
  }
  return {
    ...updated,
    comparison: { ...updated.comparison, isEdited: true },
    demandCurves: updatedCurves,
  };
}

/**
 * Returns updated domain comparison with delta curve removed (local state after delete).
 * @param {{ deltaCurveId: string, comparisonData: Object }} args
 * @returns {Object} Updated domain comparison
 */
export function deleteDeltaCurveFromComparison({ deltaCurveId, comparisonData }) {
  const updated = cloneDeep(comparisonData);
  const updatedCurves = (updated.deltaCurves || []).filter((c) => c.deltaCurveId !== deltaCurveId);
  const seriesKey = CURVE_DATA_KEYS.SERIES_DATA;
  if (updated.comparison?.[seriesKey]?.[deltaCurveId]) {
    const next = { ...updated.comparison[seriesKey] };
    delete next[deltaCurveId];
    updated.comparison[seriesKey] = next;
  }
  return {
    ...updated,
    comparison: { ...updated.comparison, isEdited: true },
    deltaCurves: updatedCurves,
  };
}
