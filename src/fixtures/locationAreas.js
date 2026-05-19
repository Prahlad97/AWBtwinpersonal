/** Synthetic zip-like polygons for Location map fixtures (Spokane / Inland NW). */

const CENTER_LON = -117.37888;
const CENTER_LAT = 47.63387;

const CONSUMPTION_COLORS = {
  low: '#EBB9FF',
  mid: '#C759F3',
  high: '#981EC8',
  peak: '#3F174F',
};

const INCOME_COLORS = {
  low: '#D8F0D8',
  mid: '#8FCC8F',
  high: '#4BAF4B',
  peak: '#1F6B2E',
};

const EV_COLORS = {
  low: '#B9DFFF',
  mid: '#59ADF3',
  high: '#1E7BC8',
  peak: '#17364F',
};

const GRID_COLORS = {
  low: '#FFE8B8',
  mid: '#F5B84A',
  high: '#E07A2F',
  peak: '#B83218',
};

function bucketConsumption(kwh) {
  if (kwh <= 50) return { key: 'low', color: CONSUMPTION_COLORS.low };
  if (kwh <= 100) return { key: 'mid', color: CONSUMPTION_COLORS.mid };
  if (kwh <= 200) return { key: 'high', color: CONSUMPTION_COLORS.high };
  return { key: 'peak', color: CONSUMPTION_COLORS.peak };
}

function bucketIncome(k) {
  if (k < 45) return { key: 'low', color: INCOME_COLORS.low };
  if (k < 65) return { key: 'mid', color: INCOME_COLORS.mid };
  if (k < 85) return { key: 'high', color: INCOME_COLORS.high };
  return { key: 'peak', color: INCOME_COLORS.peak };
}

function bucketEv(count) {
  if (count < 8) return { key: 'low', color: EV_COLORS.low };
  if (count < 18) return { key: 'mid', color: EV_COLORS.mid };
  if (count < 32) return { key: 'high', color: EV_COLORS.high };
  return { key: 'peak', color: EV_COLORS.peak };
}

function bucketGrid(load) {
  if (load < 0.55) return { key: 'low', color: GRID_COLORS.low };
  if (load < 0.72) return { key: 'mid', color: GRID_COLORS.mid };
  if (load < 0.88) return { key: 'high', color: GRID_COLORS.high };
  return { key: 'peak', color: GRID_COLORS.peak };
}

function cellPolygon(row, col, wobble = 0) {
  const dx = 0.11;
  const dy = 0.075;
  const lon0 = CENTER_LON + (col - 2) * dx + wobble * 0.012;
  const lat0 = CENTER_LAT + (row - 1.5) * dy + wobble * 0.008;
  const lon1 = lon0 + dx * 0.92;
  const lat1 = lat0 + dy * 0.88;
  return [
    [lon0, lat0],
    [lon1, lat0 + 0.008],
    [lon1 - 0.006, lat1],
    [lon0 + 0.01, lat1 - 0.005],
    [lon0, lat0],
  ];
}

const CELL_SEEDS = [
  { row: 0, col: 0, w: 0.1, consumption: 38, income: 42, ev: 4, grid: 0.48 },
  { row: 0, col: 1, w: 0.2, consumption: 72, income: 58, ev: 12, grid: 0.61 },
  { row: 0, col: 2, w: 0.15, consumption: 118, income: 71, ev: 22, grid: 0.74 },
  { row: 0, col: 3, w: 0.25, consumption: 245, income: 88, ev: 38, grid: 0.91 },
  { row: 1, col: 0, w: 0.3, consumption: 55, income: 48, ev: 7, grid: 0.52 },
  { row: 1, col: 1, w: 0.05, consumption: 92, income: 62, ev: 16, grid: 0.68 },
  { row: 1, col: 2, w: 0.35, consumption: 165, income: 76, ev: 28, grid: 0.82 },
  { row: 1, col: 3, w: 0.4, consumption: 210, income: 92, ev: 41, grid: 0.95 },
  { row: 2, col: 0, w: 0.45, consumption: 28, income: 38, ev: 2, grid: 0.44 },
  { row: 2, col: 1, w: 0.5, consumption: 88, income: 55, ev: 14, grid: 0.64 },
  { row: 2, col: 2, w: 0.55, consumption: 132, income: 68, ev: 24, grid: 0.78 },
  { row: 2, col: 3, w: 0.6, consumption: 188, income: 84, ev: 35, grid: 0.87 },
  { row: 0, col: 4, w: 0.7, consumption: 198, income: 79, ev: 31, grid: 0.85 },
  { row: 1, col: 4, w: 0.75, consumption: 142, income: 73, ev: 26, grid: 0.8 },
  { row: 2, col: 4, w: 0.8, consumption: 76, income: 51, ev: 11, grid: 0.58 },
];

function metricForVariant(variant, seed) {
  switch (variant) {
    case 'EV_MAP':
      return { value: seed.ev, bucket: bucketEv(seed.ev), label: `${seed.ev} EV homes` };
    case 'INCOME':
      return { value: seed.income, bucket: bucketIncome(seed.income), label: `$${seed.income}k median` };
    case 'GRID_MAP':
      return {
        value: seed.grid,
        bucket: bucketGrid(seed.grid),
        label: `${Math.round(seed.grid * 100)}% utilization`,
      };
    case 'HOME':
    default:
      return {
        value: seed.consumption,
        bucket: bucketConsumption(seed.consumption),
        label: `${seed.consumption} kWh`,
      };
  }
}

export const LOCATION_MAP_LEGENDS = {
  HOME: [
    { label: '>0 kWh', color: CONSUMPTION_COLORS.low },
    { label: '>50 kWh', color: CONSUMPTION_COLORS.mid },
    { label: '>100 kWh', color: CONSUMPTION_COLORS.high },
    { label: '>200 kWh', color: CONSUMPTION_COLORS.peak },
  ],
  EV_MAP: [
    { label: '1–7 EVs', color: EV_COLORS.low },
    { label: '8–17 EVs', color: EV_COLORS.mid },
    { label: '18–31 EVs', color: EV_COLORS.high },
    { label: '32+ EVs', color: EV_COLORS.peak },
  ],
  INCOME: [
    { label: '<$45k', color: INCOME_COLORS.low },
    { label: '$45–64k', color: INCOME_COLORS.mid },
    { label: '$65–84k', color: INCOME_COLORS.high },
    { label: '$85k+', color: INCOME_COLORS.peak },
  ],
  GRID_MAP: [
    { label: '<55%', color: GRID_COLORS.low },
    { label: '55–71%', color: GRID_COLORS.mid },
    { label: '72–87%', color: GRID_COLORS.high },
    { label: '88%+', color: GRID_COLORS.peak },
  ],
};

export const LOCATION_MAP_TITLES = {
  HOME: 'Consumption by zip code',
  EV_MAP: 'EV adoption by zip code',
  INCOME: 'Median income by zip code',
  GRID_MAP: 'Grid utilization by zip code',
};

export function buildLocationAreasGeoJSON(variant = 'HOME') {
  const features = CELL_SEEDS.map((seed, i) => {
    const metric = metricForVariant(variant, seed);
    return {
      type: 'Feature',
      id: i,
      properties: {
        zip: `99${200 + i}`,
        consumption: seed.consumption,
        income: seed.income,
        evCount: seed.ev,
        gridLoad: seed.grid,
        fillColor: metric.bucket.color,
        metricLabel: metric.label,
        areaLabel: `Zip ${99200 + i}`,
      },
      geometry: {
        type: 'Polygon',
        coordinates: [cellPolygon(seed.row, seed.col, seed.w)],
      },
    };
  });

  return { type: 'FeatureCollection', features };
}
