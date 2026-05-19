import {
  CURVE_DATA_KEYS,
  DEMAND_CURVE_COLORS,
  DEMAND_CURVE_DETAILS_COLORS,
  PROPERTIES,
} from '../demand-curve-constants.js';
import { DEFAULT_COMPARISON_META } from '@dcc/services/comparison-schema';

const HOURS = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`);

function hourlyPoints(seed, base = 120, amp = 80) {
  return HOURS.map((cat, i) => {
    const peak = Math.sin(((i - 18) / 24) * Math.PI * 2) * amp;
    const ripple = Math.sin(i * 0.7 + seed) * 12;
    return { x: i, y: Math.max(20, Math.round(base + peak + ripple)), category: cat };
  });
}

function buildCurveSeries(demandCurves, deltaCurves) {
  const curveSeries = {};
  demandCurves.forEach((c) => {
    curveSeries[c.demandCurveId] = {
      name: c.name,
      data: hourlyPoints(c.colorIndex + 1),
      color: c.curveColor,
      lineWidth: 1,
      connectNulls: true,
    };
  });
  deltaCurves.forEach((c) => {
    curveSeries[c.deltaCurveId] = {
      name: c.name,
      data: hourlyPoints(c.colorIndex + 10),
      color: c.curveColor,
      lineWidth: 1,
      dashStyle: 'ShortDash',
      connectNulls: true,
    };
  });
  return curveSeries;
}

function demandCurve(id, dccId, name, index, segmentName, filterName, timeframe) {
  return {
    demandCurveId: id,
    dccId,
    name,
    type: 'demand',
    colorIndex: index,
    bgColor: DEMAND_CURVE_DETAILS_COLORS[index % DEMAND_CURVE_DETAILS_COLORS.length],
    curveColor: DEMAND_CURVE_COLORS[index % DEMAND_CURVE_COLORS.length],
    isEdited: true,
    createdAt: Date.UTC(2025, 0, 15),
    [CURVE_DATA_KEYS.PROPERTIES_DATA]: {
      [PROPERTIES.PROGRAM_SEGMENT]: {},
      [PROPERTIES.SAVED_FILTER_SELECTION]: {
        id: '',
        name: filterName,
        filters: {},
      },
      [PROPERTIES.SEGMENT_SELECTION]: segmentName
        ? { id: `seg-${id}`, name: segmentName, invert: false }
        : null,
      [PROPERTIES.TIME_INTERVAL]: timeframe,
    },
  };
}

function deltaCurve(id, dccId, name, index, id1, id2) {
  const baseIndex = index + 2;
  return {
    deltaCurveId: id,
    dccId,
    name,
    type: 'delta',
    colorIndex: baseIndex,
    bgColor: DEMAND_CURVE_DETAILS_COLORS[baseIndex % DEMAND_CURVE_DETAILS_COLORS.length],
    curveColor: DEMAND_CURVE_COLORS[baseIndex % DEMAND_CURVE_COLORS.length],
    demandCurveId1: id1,
    demandCurveId2: id2,
    isEdited: true,
    createdAt: Date.UTC(2025, 0, 16),
  };
}

function buildComparison(meta, demandCurves, deltaCurves) {
  const curveSeries = buildCurveSeries(demandCurves, deltaCurves);
  return {
    comparison: {
      ...DEFAULT_COMPARISON_META,
      dccID: meta.dcc_id,
      name: meta.name,
      description: meta.description,
      userId: meta.user_id,
      userName: meta.user_name,
      userEmail: meta.user_email,
      pilotName: 'demo',
      isShared: meta.is_shared,
      createdAt: meta.created_at,
      PLOT_DURATION: 'HOURLY',
      curveType: 'HOURLY',
      SHOW_AVERAGE: false,
      isEdited: false,
      [CURVE_DATA_KEYS.SERIES_DATA]: curveSeries,
      [CURVE_DATA_KEYS.CURVE_META_INFO]: {
        xAxisData: HOURS,
        yTitle: 'Total Consumption',
      },
    },
    demandCurves,
    deltaCurves,
  };
}

/** Domain-shaped comparisons for Lab (matches production `comparisonFromResponse` output). */
export function buildInitialLabDomains() {
  const winter = buildComparison(
    {
      dcc_id: 'dcc-winter-peak',
      name: 'Winter peak vs baseline',
      description: 'Compares AMI winter peak cohort against last-year baseline for program sizing.',
      user_id: 'lab-user-1',
      user_name: 'Alex Morgan',
      user_email: 'lab@bidgely.com',
      created_at: Date.UTC(2025, 0, 12),
      is_shared: true,
    },
    [
      demandCurve('dc-1', 'dcc-winter-peak', 'Winter peak cohort', 0, 'Winter peak cohort', 'AMI filters', '2024/11/01 to 2025/03/31'),
      demandCurve('dc-2', 'dcc-winter-peak', 'Prior year baseline', 1, 'All AMI electric', 'Baseline', '2023/11/01 to 2024/03/31'),
    ],
    [deltaCurve('delta-1', 'dcc-winter-peak', 'Peak − Baseline', 0, 'dc-2', 'dc-1')]
  );

  const ev = buildComparison(
    {
      dcc_id: 'dcc-ev-load',
      name: 'EV load ramp — feeder A',
      description: 'EV adoption segment on Feeder A vs system average.',
      user_id: 'lab-user-2',
      user_name: 'Jordan Lee',
      user_email: 'jordan@bidgely.com',
      created_at: Date.UTC(2025, 1, 4),
      is_shared: false,
    },
    [
      demandCurve('dc-3', 'dcc-ev-load', 'Feeder A EV homes', 0, 'EV homes — Feeder A', 'Feeder A', '2025/02/01 to 2025/02/28'),
      demandCurve('dc-4', 'dcc-ev-load', 'System average', 1, 'Resi AMI — Electric', 'DEFAULT', '2025/02/01 to 2025/02/28'),
    ],
    []
  );

  const solar = buildComparison(
    {
      dcc_id: 'dcc-solar-midday',
      name: 'Solar midday export',
      description: 'Solar export hours compared across west vs east substations.',
      user_id: 'lab-user-1',
      user_name: 'Alex Morgan',
      user_email: 'lab@bidgely.com',
      created_at: Date.UTC(2025, 2, 1),
      is_shared: true,
    },
    [demandCurve('dc-5', 'dcc-solar-midday', 'West substation', 0, 'Solar homes — West', 'Solar west', '2025/03/01 to 2025/03/31')],
    []
  );

  return [winter, ev, solar];
}

export function domainToListItem(domain) {
  const c = domain.comparison;
  return {
    dcc_id: c.dccID,
    name: c.name,
    description: c.description,
    user_id: c.userId,
    user_name: c.userName,
    created_at: c.createdAt,
    is_shared: c.isShared,
  };
}
