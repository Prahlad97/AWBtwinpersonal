import {
  CURVE_DATA_KEYS,
  DEMAND_CURVE_MENU_ITEMS,
  PROPERTIES,
} from '@/constants/demand-curve-constants';
import { cloneDeep } from 'lodash';
import { getNextCurveColorIndex } from '../utils/demand-curve-utils';
import { modifyDemandCurveFilters } from '../utils/filter-utils';

// Re-export utils used by other DCC modules (single entry for helpers)
export { getButtonTypeFromCurveType } from '../utils/demand-curve-utils';
export {
  hasMeaningfulUnsavedFilters,
  validateComparisonName,
} from '../utils/comparison-validation';
export { modifyDemandCurveFilters } from '../utils/filter-utils';

/** Returns display text for demand curve options button (e.g. "Monthly Demand Curve (kW) - AVG"). */
export const getDemandCurveOptionsButtonText = (plotDurationId, buttonType) => {
  const item = DEMAND_CURVE_MENU_ITEMS.find((i) => i.id === plotDurationId);
  const description = item?.description ?? '';
  return buttonType ? `${description}- ${buttonType}` : description;
};

/**
 * Returns true when the Compare button should be disabled.
 * Requires at least 2 demand curves, each with segment/filter and time interval; delta curves must reference valid demand curve ids.
 */
export const getIsCompareButtonDisabled = (comparisonData, isComparing) => {
  if (isComparing) return true;
  const demandCurves = comparisonData?.demandCurves || [];
  const deltaCurves = comparisonData?.deltaCurves || [];
  if (demandCurves.length < 2) return true;

  const isDemandCurveValid = (curve) => {
    const curveProperties = curve?.[CURVE_DATA_KEYS.PROPERTIES_DATA];
    const hasSegment =
      curveProperties?.[PROPERTIES.SEGMENT_SELECTION]?.segment_name ||
      curveProperties?.[PROPERTIES.SEGMENT_SELECTION]?.name ||
      curveProperties?.[PROPERTIES.SEGMENT_SELECTION]?.segmentSnapshotName ||
      curveProperties?.[PROPERTIES.PROGRAM_SEGMENT]?.program_id;
    const hasSavedFilter =
      curveProperties?.[PROPERTIES.SAVED_FILTER_SELECTION]?.name &&
      curveProperties?.[PROPERTIES.SAVED_FILTER_SELECTION]?.name !== 'DEFAULT';
    const hasTimeInterval = curveProperties?.[PROPERTIES.TIME_INTERVAL];
    return (hasSegment || hasSavedFilter) && hasTimeInterval;
  };
  if (!demandCurves.every((c) => isDemandCurveValid(c))) return true;
  const validDemandCurveIds = new Set(demandCurves.map((c) => c.demandCurveId));
  const isDeltaCurveValid = (curve) =>
    curve?.demandCurveId1 &&
    curve?.demandCurveId2 &&
    validDemandCurveIds.has(curve.demandCurveId1) &&
    validDemandCurveIds.has(curve.demandCurveId2);
  return !(deltaCurves.length === 0 || deltaCurves.every((c) => isDeltaCurveValid(c)));
};

/** Resolves segment/filter references and returns curve with populated properties data. */
export const setUpCurvePropertiesData = (curve, segmentSnapshots, savedFilters) => {
  const curveProperties = curve?.[CURVE_DATA_KEYS.PROPERTIES_DATA];
  const selectedCurveSegment = curveProperties?.[PROPERTIES.SEGMENT_SELECTION];
  const selectedCurveFilter = curveProperties?.[PROPERTIES.SAVED_FILTER_SELECTION];
  let segmentData = null;
  let filterData = null;
  if (selectedCurveSegment && !selectedCurveSegment.id && selectedCurveSegment !== 'DEFAULT') {
    const seg = segmentSnapshots?.find(
      (f) => (f.segmentSnapshotName || f.segment_name) === selectedCurveSegment
    );
    segmentData =
      seg != null
        ? {
            id: seg.segmentSnapshotId || seg.segment_id || '',
            name: seg.segmentSnapshotName || seg.segment_name || '',
            invert: selectedCurveSegment.invert || false,
          }
        : selectedCurveSegment;
  } else {
    segmentData = selectedCurveSegment;
  }
  if (selectedCurveFilter && selectedCurveFilter.name && selectedCurveFilter.name !== 'DEFAULT') {
    const _savedFilter = savedFilters?.find(
      (f) => f.type === 'USER_SAVED' && f.name == selectedCurveFilter.name
    );
    filterData =
      _savedFilter != null
        ? {
            id: _savedFilter.saved_filter_id || '',
            name: _savedFilter.name || 'DEFAULT',
            filters: modifyDemandCurveFilters(_savedFilter?.filters || []),
          }
        : selectedCurveFilter;
  }
  return {
    ...curve,
    isEdited: true,
    [CURVE_DATA_KEYS.PROPERTIES_DATA]: {
      ...curveProperties,
      [PROPERTIES.SEGMENT_SELECTION]: segmentData,
      [PROPERTIES.SAVED_FILTER_SELECTION]: filterData,
    },
  };
};

export const getDemandCurveName = (currentComparison) => {
  const currentID = getNextCurveColorIndex(
    currentComparison?.demandCurves,
    currentComparison?.deltaCurves
  );
  return `Demand Curve ${String.fromCharCode(64 + currentID + 1)}`;
};

export const getDeltaCurveName = (currentComparison) => {
  const currentID = getNextCurveColorIndex(
    currentComparison?.demandCurves,
    currentComparison?.deltaCurves
  );
  return `Delta Curve ${String.fromCharCode(64 + currentID + 1)}`;
};

/** Returns handleChange args for the error path (data not present). */
export const applyDataNotPresentToComparison = (comparisonData, { curve, plotName, errorMsg }) => {
  const existingDataNotPresentDetails =
    comparisonData?.comparison?.[CURVE_DATA_KEYS.DATA_NOT_PRESENT_DETAILS] || [];
  const existingIndex = existingDataNotPresentDetails.findIndex(
    (item) => item.plotName === plotName
  );
  let dataNotPresentDetails;
  if (existingIndex !== -1) {
    dataNotPresentDetails = [...existingDataNotPresentDetails];
    dataNotPresentDetails[existingIndex] = {
      ...dataNotPresentDetails[existingIndex],
      errorMessage: errorMsg,
    };
  } else {
    dataNotPresentDetails = [
      ...existingDataNotPresentDetails,
      { plotName, errorMessage: errorMsg },
    ];
  }
  const newSeriesData = cloneDeep(comparisonData?.comparison?.[CURVE_DATA_KEYS.SERIES_DATA]);
  if (newSeriesData?.[curve.demandCurveId]) {
    newSeriesData[curve.demandCurveId] = {};
  }
  return [
    { updatedVal: newSeriesData, propertyToUpdate: CURVE_DATA_KEYS.SERIES_DATA },
    {
      updatedVal: dataNotPresentDetails,
      propertyToUpdate: CURVE_DATA_KEYS.DATA_NOT_PRESENT_DETAILS,
    },
  ];
};

/**
 * Applies one or more property updates to currentComparison.comparison.
 * @param {{ updatedVal: any, propertyToUpdate: string } | Array<{ updatedVal: any, propertyToUpdate: string }>} args - Single update or array of updates
 * @param {Object} currentComparison - Mutable comparison object (modified in place)
 * @returns {Object} currentComparison
 */
export const updateComparisonData = (args, currentComparison) => {
  if (Array.isArray(args)) {
    args.forEach(({ updatedVal, propertyToUpdate }) => {
      currentComparison.comparison[propertyToUpdate] = updatedVal;
    });
    return currentComparison;
  }
  const { updatedVal, propertyToUpdate } = args;
  currentComparison.comparison[propertyToUpdate] = updatedVal;
  currentComparison.comparison.isEdited = true;
  return currentComparison;
};

export const getDeltaCurve = (seriesData, deltaCurve, duration) => {
  let curve1 = null;
  let curve2 = null;

  if (duration == '576') {
    curve1 = seriesData[`${deltaCurve.demandCurveId1}_min`];
    curve2 = seriesData[`${deltaCurve.demandCurveId2}_min`];
  } else {
    curve1 = seriesData[deltaCurve.demandCurveId1];
    curve2 = seriesData[deltaCurve.demandCurveId2];
  }

  if (!curve1 || !curve2) {
    return null;
  }

  const deltaData = [];

  curve1.data.forEach((point, index) => {
    const isArrayFormat = duration == '8760' || duration == '576';
    const curve2Point = curve2.data[index];

    // Skip if curve2 doesn't have a corresponding point
    if (!curve2Point) {
      return;
    }

    const point1X = isArrayFormat ? point.name : point.x;
    const point2X = isArrayFormat ? curve2Point.name : curve2Point.x;

    // Check if x points match before adding to delta curve
    if (point1X !== point2X) {
      return;
    }

    // X points match, calculate delta
    const point1Y = point.y;
    const point2Y = curve2Point.y;

    let deltaPoint = {};

    if (isArrayFormat) {
      deltaPoint = {
        name: point1X,
        y: point1Y - point2Y,
        fuelType: isArrayFormat ? point.fuelType || curve1.fuelType || 'Electric' : point.fuelType,
      };
    } else {
      deltaPoint = {
        x: point1X,
        y: point1Y - point2Y,
        fuelType: isArrayFormat ? point.fuelType || curve1.fuelType || 'Electric' : point.fuelType,
      };
    }

    deltaData.push(deltaPoint);
  });

  return {
    name: deltaCurve.name,
    data: deltaData,
    color: deltaCurve.curveColor,
  };
};

/**
 * Formats comparison data for CSV export.
 * @param {object} comparisonData - The full comparison data object (with comparison, demandCurves, etc)
 * @returns {Array[]} - Array of arrays for CSV export
 */
export function formatComparisonForCSV(comparisonData) {
  const comparison = comparisonData?.comparison || {};
  const demandCurves = comparisonData?.demandCurves || [];
  const deltaCurves = comparisonData?.deltaCurves || [];
  const xAxisData = comparisonData?.comparison?.curveMetaInfo?.xAxisData || [];
  const curveSeries = comparisonData?.comparison?.curveSeries || [];

  const output = [
    [''],
    ['Comparison Name', comparison.name || ''],
    ['Comparison Description', comparison.description || ''],
  ];

  demandCurves?.length &&
    demandCurves.forEach((curve, index) => {
      const props = curve.curveProperties || {};
      output.push(
        [''],
        [`${curve.name || ''}`],
        [
          'Segment',
          props.SEGMENT_SELECTION?.segment_name ||
            props.SEGMENT_SELECTION?.segmentSnapshotName ||
            props.SEGMENT_SELECTION?.name ||
            props.PROGRAM_SEGMENT?.program_name ||
            props.PROGRAM_SEGMENT?.name ||
            '',
        ],
        ['Saved Filter', props.SAVED_FILTER_SELECTION?.name || ''],
        ['Time Interval', props.TIME_INTERVAL || '']
      );
    });

  deltaCurves?.length &&
    deltaCurves.forEach((curve, index) => {
      const props = curve.curveProperties || {};
      output.push([''], [`${curve.name || ''}`], [deltaCurveDetailText(curve, demandCurves)]);
    });

  const curveIds = Object.keys(curveSeries);
  if (xAxisData?.length && curveIds?.length) {
    output.push([''], ['X Axis Units', ...curveIds.map((id) => curveSeries[id]?.name || '')]);

    xAxisData.forEach((label, i) => {
      const row = [label];
      curveIds.forEach((id) => {
        const yVal = curveSeries[id]?.data?.[i]?.y;
        row.push(typeof yVal === 'number' && !isNaN(yVal) ? yVal : '');
      });
      output.push(row);
    });
  }

  return output;
}

export const deltaCurveDetailText = (deltaCurve, demandCurves) => {
  const curve1 = demandCurves.find((curve) => curve.demandCurveId === deltaCurve.demandCurveId1);
  const curve2 = demandCurves.find((curve) => curve.demandCurveId === deltaCurve.demandCurveId2);
  return `${curve1?.name || 'Curve 1'} - ${curve2?.name || 'Curve 2'}`;
};
