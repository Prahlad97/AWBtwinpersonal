/** Grid Asset → Assets — substation / feeder / transformer tables (AWB-Official). */

const SUBSTATION_NAMES = [
  'Southeast 115_13 Kv',
  'Northwest 115_13 Kv',
  'Central 115_13 Kv',
  'Northeast 115_13 Kv',
  'Southwest 115_13 Kv',
  'Eastside 115_13 Kv',
  'Westside 115_13 Kv',
  'Downtown 115_13 Kv',
  'Riverside 115_13 Kv',
  'Highland 115_13 Kv',
  'Valley 115_13 Kv',
  'Lakeside 115_13 Kv',
  'Parkview 115_13 Kv',
  'Industrial 115_13 Kv',
  'Airport 115_13 Kv',
  'Harbor 115_13 Kv',
];

const FEEDER_NAMES = [
  'Feeder SE-101',
  'Feeder NW-204',
  'Feeder CT-305',
  'Feeder NE-412',
  'Feeder SW-518',
  'Feeder ES-622',
  'Feeder WS-731',
  'Feeder DT-845',
  'Feeder RV-902',
  'Feeder HL-1011',
  'Feeder VY-1108',
  'Feeder LS-1204',
  'Feeder PV-1301',
  'Feeder IN-1407',
  'Feeder AP-1503',
  'Feeder HB-1610',
];

const TRANSFORMER_NAMES = [
  'XFMR SE-101-A',
  'XFMR NW-204-B',
  'XFMR CT-305-C',
  'XFMR NE-412-D',
  'XFMR SW-518-E',
  'XFMR ES-622-F',
  'XFMR WS-731-G',
  'XFMR DT-845-H',
  'XFMR RV-902-J',
  'XFMR HL-1011-K',
  'XFMR VY-1108-L',
  'XFMR LS-1204-M',
  'XFMR PV-1301-N',
  'XFMR IN-1407-P',
  'XFMR AP-1503-Q',
  'XFMR HB-1610-R',
];

function buildSubstationRow(index, name, utilizationPct) {
  const capacity = 8 + (index % 5) * 1.4 + (index % 3) * 0.6;
  const maxDemand = capacity * (0.55 + (utilizationPct / 100) * 0.35);
  const avgDemand = maxDemand * (0.62 + (index % 4) * 0.04);
  const minDemand = avgDemand * (0.28 + (index % 5) * 0.03);
  return {
    name,
    minDemand,
    avgDemand,
    maxDemand,
    capacity,
    utilizationPct,
  };
}

function buildFeederRow(index, name, utilizationPct, minNegative = false) {
  const capacity = 2.2 + (index % 4) * 0.55 + (index % 7) * 0.15;
  const maxDemand = capacity * (0.6 + (utilizationPct / 100) * 0.4);
  const avgDemand = maxDemand * (0.58 + (index % 3) * 0.05);
  let minDemand = avgDemand * (0.22 + (index % 4) * 0.04);
  if (minNegative) {
    minDemand = -Math.abs(minDemand * (0.35 + (index % 3) * 0.12));
  }
  return {
    name,
    minDemand,
    avgDemand,
    maxDemand,
    capacity,
    utilizationPct,
  };
}

function buildTransformerRow(index, name, utilizationPct) {
  const capacity = 420 + (index % 6) * 85 + (index % 4) * 40;
  const maxDemand = capacity * (0.5 + (utilizationPct / 100) * 0.42);
  const avgDemand = maxDemand * (0.6 + (index % 5) * 0.03);
  const minDemand = avgDemand * (0.25 + (index % 4) * 0.04);
  return {
    name,
    minDemand,
    avgDemand,
    maxDemand,
    capacity,
    utilizationPct,
  };
}

export const GRID_ASSETS_SUBSTATION_ROWS = SUBSTATION_NAMES.map((name, i) =>
  buildSubstationRow(
    i + 1,
    name,
    [42, 58, 67, 74, 81, 88, 92, 96, 78, 65, 52, 48, 71, 85, 91, 55][i]
  )
);

export const GRID_ASSETS_FEEDER_ROWS = FEEDER_NAMES.map((name, i) =>
  buildFeederRow(
    i + 1,
    name,
    [72, 81, 88, 95, 98, 101, 105, 108, 110, 113, 97, 86, 79, 92, 103, 99][i],
    i % 3 === 0 || i % 5 === 1
  )
);

export const GRID_ASSETS_TRANSFORMER_ROWS = TRANSFORMER_NAMES.map((name, i) =>
  buildTransformerRow(
    i + 1,
    name,
    [78, 85, 91, 94, 97, 99, 102, 105, 88, 82, 76, 93, 96, 100, 87, 84][i]
  )
);

export const GRID_ASSETS_TABLE_SECTIONS = [
  {
    id: 'substation',
    title: 'Substation',
    rows: GRID_ASSETS_SUBSTATION_ROWS,
    unit: 'MW',
    allowNegativeMin: false,
  },
  {
    id: 'feeder',
    title: 'Feeder',
    rows: GRID_ASSETS_FEEDER_ROWS,
    unit: 'MW',
    allowNegativeMin: true,
  },
  {
    id: 'transformer',
    title: 'Transformer',
    rows: GRID_ASSETS_TRANSFORMER_ROWS,
    unit: 'kW',
    allowNegativeMin: false,
  },
];
