/** Static fixture data — preprod screenshot values (Analytics Lab). */

export const KPI = {
  bidgelyIds: '8,821',
  customers: '7,332',
  premises: '7,102',
  meters: '8,102',
  /** Gross consumption — card when Consumption Select = total */
  consumptionTotal: '286.38 GWh',
  /** Gross consumption — card when Consumption Select = avg */
  consumptionAvg: '772 GWh',
  netDemandTotal: '283.43 GWh',
  netDemandAvg: '760 GWh',
  avgConsumption: '772 GWh',
  solarGeneration: '2.95 GWh',
};

export const PALETTE = [
  '#5B9AA0',
  '#E8C547',
  '#9B7BB8',
  '#E8A04C',
  '#C75B5B',
  '#F0C17A',
  '#7EB8DA',
  '#8FBC8F',
  '#D4A5C8',
  '#6B7B8C',
];

/**
 * Appliance Targeting — **global legend** swatches (eyedropper from user screenshot).
 * Extended ownership & donuts use additional rows below where noted.
 */
export const APPLIANCE_COLORS = {
  ALWAYS_ON: '#A3A0FB',
  EV: '#71FFB7',
  LIGHTING: '#FFEB3B',
  POOL_PUMP: '#F06292',
  REFRIGERATION: '#4DD0E1',
  HEATING: '#F44336',
  COOLING: '#2196F3',
  WATER_HEATER: '#FF9800',
  /** Toolbar “Solar” chip (gold); Current Ownership **SOLAR bar** uses `SOLAR_OWNERSHIP_BAR`. */
  SOLAR: '#FFD54F',
  OTHERS: '#9E9E9E',
  ANOMALOUS_LOAD: '#4DB6AC',
  OPERATIONAL_LOAD: '#FFB74D',
  BASE_LOAD: '#7986CB',
  COOKING: '#AED581',
  /** Current Ownership column only (brown tan in screenshot — not toolbar gold). */
  SOLAR_OWNERSHIP_BAR: '#A1887F',
};

/** EV Analytics charts — mint bars (Bidgely screenshot `#71FFB7`). */
export const EV_CHART_COLORS = {
  fill: '#71FFB7',
  label: '#1E232E',
  dataLabelGreen: '#1B5E20',
};

/** Load Research → Consumption Bucket bar fill (screenshot). */
export const LOAD_RESEARCH_BAR = '#0D4751';

/** Premise tab — eyedropper from user Premise screenshot. */
export const PREMISE_COLORS = {
  primaryTeal: '#78A19B',
  homeSizeNavy: '#004D54',
  mustard: '#E5C167',
  unknownLtGrey: '#D3D3D3',
  lime: '#B5D333',
  aqua: '#75C9C8',
  bungalow: '#004D54',
  rented: '#A9A9A9',
};

/** Solar Generation Capacity — all bars medium blue (not toolbar Solar gold). */
export const SOLAR_CAPACITY_BAR = '#4A90E2';

/** Exact global legend order + labels from Appliance Targeting screenshot. */
export const APPLIANCE_TOOLBAR_LEGEND = [
  { label: 'Always On', color: APPLIANCE_COLORS.ALWAYS_ON },
  { label: 'EV', color: APPLIANCE_COLORS.EV },
  { label: 'Lighting', color: APPLIANCE_COLORS.LIGHTING },
  { label: 'Pool Pump', color: APPLIANCE_COLORS.POOL_PUMP },
  { label: 'Refrigerator', color: APPLIANCE_COLORS.REFRIGERATION },
  { label: 'Heating', color: APPLIANCE_COLORS.HEATING },
  { label: 'Cooling', color: APPLIANCE_COLORS.COOLING },
  { label: 'Water Heater', color: APPLIANCE_COLORS.WATER_HEATER },
  { label: 'Solar', color: APPLIANCE_COLORS.SOLAR },
];

export const ratePlanDonut = {
  title: 'Rate Plan',
  slices: [
    { name: '001WA', y: 60.08 },
    { name: '101WA', y: 33.69 },
    { name: '012WA', y: 4.71 },
    { name: '011WA', y: 0.55 },
    { name: '032WA', y: 0.32 },
    { name: '002WA', y: 0.28 },
    { name: '102WA', y: 0.12 },
    { name: '111WA', y: 0.05 },
  ],
};

export const annualClusterDonut = {
  title: 'Annual Cluster',
  slices: [
    { name: 'High', y: 36.18 },
    { name: 'Mid-High', y: 19.4 },
    { name: 'Not Detected', y: 16.91 },
    { name: 'Mid', y: 13.13 },
    { name: 'Low-Mid', y: 9.2 },
    { name: 'Low', y: 5.17 },
  ],
  colors: ['#48c9b0', '#f4d03f', '#cbb6e6', '#ec7063', '#85c1e9', '#f5b041'],
};

export const seasonalClusterDonut = {
  title: 'Seasonal Cluster',
  slices: [
    { name: 'All Year Baseload', y: 29.37 },
    { name: 'Heavy Summer and Winter Peak', y: 22.89 },
    { name: 'Heavy Winter Peak', y: 17.0 },
    { name: 'Not Detected', y: 16.91 },
    { name: 'Heavy Summer Peak', y: 13.82 },
  ],
  colors: ['#48c9b0', '#f4d03f', '#a69bc4', '#cbb6e6', '#85c1e9'],
};

export const dailyClusterDonut = {
  title: 'Daily Cluster',
  slices: [
    { name: 'Late Evening', y: 23.31 },
    { name: 'Base', y: 19.37 },
    { name: 'Not Detected', y: 16.92 },
    { name: 'Night', y: 8.63 },
    { name: 'Day', y: 8.36 },
    { name: 'Noon', y: 7.94 },
    { name: 'Late Morning', y: 7.87 },
    { name: 'Early Evening', y: 6.96 },
    { name: 'Night Evening', y: 0.64 },
  ],
  colors: ['#48c9b0', '#f4d03f', '#cbb6e6', '#ec7063', '#85c1e9', '#f5b041', '#b8e356', '#f1948a', '#bdc3c7'],
};

export const censusIncomeCombo = {
  title: 'Area Median Income (Census)',
  categories: [
    '$0 to $19,999',
    '$20,000 to $29,999',
    '$30,000 to $39,999',
    '$40,000 to $49,999',
    '$50,000 to $59,999',
    '$60,000 to $74,999',
    '$75,000 to $99,999',
    '$100,000 to $124,999',
    '$125,000 to $149,999',
    '$150,000 to $199,999',
    '$200,000 or more',
  ],
  blockGroups: [2661, 1859, 1520, 1280, 980, 720, 540, 380, 210, 95, 42],
  accounts: [26666, 32447, 28901, 25031, 22100, 18500, 14200, 9800, 6200, 3100, 1400],
};

export const homeTypeDonut = {
  title: 'Home Type',
  slices: [
    { name: 'Single Family', y: 82.65 },
    { name: 'Apartment', y: 8.39 },
    { name: 'Unknown', y: 6.58 },
    { name: 'Condominium', y: 2.32 },
    { name: 'Multiplex', y: 0.05 },
    { name: 'Bungalow', y: 0.0 },
  ],
  colors: [
    PREMISE_COLORS.primaryTeal,
    PREMISE_COLORS.mustard,
    PREMISE_COLORS.unknownLtGrey,
    PREMISE_COLORS.lime,
    PREMISE_COLORS.aqua,
    PREMISE_COLORS.bungalow,
  ],
};

export const homeSizeBars = {
  title: 'Home Size',
  yAxisTitle: 'Accounts',
  categories: ['<800 sq ft.', '800-1.2k sq ft.', '1.2k-2k sq ft.', '2k-3k sq ft.', '>3k sq ft.', 'Unknown'],
  values: [420, 1850, 7218, 2100, 1210, 534],
  color: PREMISE_COLORS.homeSizeNavy,
  labelColor: '#ffffff',
};

export const homeOwnershipDonut = {
  title: 'Home Ownership',
  slices: [
    { name: 'Rented', y: 18.34 },
    { name: 'Unknown', y: 37.03 },
    { name: 'Owned', y: 44.63 },
  ],
  colors: [PREMISE_COLORS.rented, PREMISE_COLORS.primaryTeal, PREMISE_COLORS.mustard],
};

export const premiseYearBuiltBars = {
  title: 'Premise Year Built',
  yAxisTitle: 'Accounts',
  categories: [
    'Below 1900',
    '1900 to 1909',
    '1910 to 1919',
    '1920 to 1929',
    '1930 to 1939',
    '1940 to 1949',
    '1950 to 1959',
    '1960 to 1969',
    '1970 to 1979',
    '1980 to 1989',
    '1990 to 1999',
    '2000 to 2009',
    '2010 to 2019',
    '2020 or Above',
    'Undefined',
  ],
  values: [120, 95, 110, 130, 155, 180, 320, 480, 620, 890, 1100, 1350, 1820, 980, 6112],
  color: PREMISE_COLORS.primaryTeal,
  labelColor: '#1E232E',
  height: 400,
};

export const loadTypeDonut = {
  title: 'Load Type Usage',
  slices: [
    { name: 'ALWAYS_ON', y: 16.46 },
    { name: 'COOLING', y: 13.41 },
    { name: 'EV', y: 0.78 },
    { name: 'HEATING', y: 28.32 },
    { name: 'LIGHTING', y: 1.94 },
    { name: 'OTHERS', y: 30.17 },
    { name: 'POOL_PUMP', y: 2.05 },
    { name: 'REFRIGERATION', y: 2.73 },
    { name: 'SOLAR', y: -1.0 },
    { name: 'WATER_HEATER', y: 4.14 },
  ],
  colors: [
    APPLIANCE_COLORS.ALWAYS_ON,
    APPLIANCE_COLORS.COOLING,
    APPLIANCE_COLORS.EV,
    APPLIANCE_COLORS.HEATING,
    APPLIANCE_COLORS.LIGHTING,
    APPLIANCE_COLORS.OTHERS,
    APPLIANCE_COLORS.POOL_PUMP,
    APPLIANCE_COLORS.REFRIGERATION,
    APPLIANCE_COLORS.SOLAR,
    APPLIANCE_COLORS.WATER_HEATER,
  ],
};

/**
 * Current Ownership — **each bar color** from Appliance screenshot (Solar bar is brown `#A1887F`, not toolbar gold).
 * Values are **percent on chart** (0–100% axis on screenshot).
 */
const CURRENT_OWNERSHIP_ORDER = [
  { label: 'ALWAYS ON', color: APPLIANCE_COLORS.ALWAYS_ON },
  { label: 'ANOMALOUS LOAD', color: APPLIANCE_COLORS.ANOMALOUS_LOAD },
  { label: 'BASE LOAD', color: APPLIANCE_COLORS.BASE_LOAD },
  { label: 'COOLING', color: APPLIANCE_COLORS.COOLING },
  { label: 'COOKING', color: APPLIANCE_COLORS.COOKING },
  { label: 'EV', color: APPLIANCE_COLORS.EV },
  { label: 'HEATING', color: APPLIANCE_COLORS.HEATING },
  { label: 'LIGHTING', color: APPLIANCE_COLORS.LIGHTING },
  { label: 'OPERATIONAL LOAD', color: APPLIANCE_COLORS.OPERATIONAL_LOAD },
  { label: 'POOL PUMP', color: APPLIANCE_COLORS.POOL_PUMP },
  { label: 'REFRIGERATION', color: APPLIANCE_COLORS.REFRIGERATION },
  { label: 'WATER HEATER', color: APPLIANCE_COLORS.WATER_HEATER },
  { label: 'SOLAR', color: APPLIANCE_COLORS.SOLAR_OWNERSHIP_BAR },
];

export const currentOwnershipBars = {
  title: 'Current Ownership',
  yAxisTitle: '%',
  categories: CURRENT_OWNERSHIP_ORDER.map((r) => r.label),
  values: [86, 12, 78, 70, 41, 5, 84, 76, 61, 24, 65, 46, 14],
  colors: CURRENT_OWNERSHIP_ORDER.map((r) => r.color),
  legendItems: CURRENT_OWNERSHIP_ORDER.map((r) => ({ label: r.label, color: r.color })),
  valueSuffix: '%',
  labelColor: '#1E232E',
};

export const heatingFuelDonut = {
  title: 'Heating Fuel Type',
  slices: [
    { name: 'Primary Electric', y: 38.0 },
    { name: 'Primary Non-electric', y: 32.0 },
    { name: 'Primary Non-electric, Secondary Electric', y: 18.0 },
    { name: 'Not Detected / Other', y: 12.0 },
  ],
  colors: ['#69F0AE', '#FFEB3B', '#AED581', '#FFCCBC'],
};

export const heatingEfficiencyDonut = {
  title: 'Heating Efficiency (Right click to drill)',
  slices: [
    { name: 'High Efficiency', y: 31.4 },
    { name: 'Medium Efficiency', y: 26.2 },
    { name: 'Low Efficiency', y: 18.9 },
    { name: 'Very Low Efficiency', y: 12.8 },
    { name: 'Not Detected', y: 10.7 },
  ],
  colors: ['#4A0F0F', '#F48FB1', '#F44336', '#9E9E9E', '#FFCDD2'],
};

export const coolingEfficiencyDonut = {
  title: 'Cooling Efficiency (Right click to drill)',
  slices: [
    { name: 'High Efficiency', y: 29.8 },
    { name: 'Medium Efficiency', y: 33.6 },
    { name: 'Low Efficiency', y: 22.4 },
    { name: 'Very Low Efficiency', y: 8.6 },
    { name: 'Not Detected', y: 5.6 },
  ],
  colors: ['#0D47A1', '#2196F3', '#64B5F6', '#BBDEFB', '#9E9E9E'],
};

export const poolPumpTypeDonut = {
  title: 'Pool Pump Type',
  slices: [
    { name: 'Single Speed', y: 67.4 },
    { name: 'Variable Speed', y: 32.6 },
  ],
  colors: ['#4DD0E1', '#FFEB3B'],
};

export const poolPumpAmplitudeDonut = {
  title: 'Pool Pumps Amplitude',
  slices: [
    { name: '0-1 kW', y: 22.4 },
    { name: '1-2 kW', y: 34.8 },
    { name: '2-3 kW', y: 26.2 },
    { name: '3-4 kW', y: 11.9 },
    { name: '>4 kW', y: 4.7 },
  ],
  colors: ['#FFEB3B', '#69F0AE', '#CE93D8', '#E53935', '#4DD0E1'],
};

export const poolPumpRunsDonut = {
  title: 'Pool Pump Runs',
  slices: [
    { name: '1 Run', y: 28.4 },
    { name: '2 Runs', y: 34.2 },
    { name: '3 Runs', y: 22.8 },
    { name: '4 Runs', y: 14.6 },
  ],
  colors: ['#69F0AE', '#FFEB3B', '#CE93D8', '#E53935'],
};

export const waterHeaterTypeDonut = {
  title: 'Water Heater Type',
  slices: [
    { name: 'Thermostat', y: 52.0 },
    { name: 'Timed', y: 48.0 },
  ],
  colors: ['#69F0AE', '#FFEB3B'],
};

export const waterHeaterRatingDonut = {
  title: 'Water Heater Rating',
  slices: [
    { name: '1-2 kW', y: 28.0 },
    { name: '2-3 kW', y: 32.0 },
    { name: '3-4 kW', y: 24.0 },
    { name: '4-5 kW', y: 16.0 },
  ],
  colors: ['#FFEB3B', '#CE93D8', '#E53935', '#2196F3'],
};

export const waterHeaterRunsDonut = {
  title: 'Water Heater Runs',
  slices: [
    { name: '4 Runs', y: 38.2 },
    { name: '3 Runs', y: 33.8 },
    { name: '2 Runs', y: 18.6 },
    { name: '1 Run', y: 9.4 },
  ],
  colors: ['#69F0AE', '#FFEB3B', '#CE93D8', '#E53935'],
};

export const solarCapacityBars = {
  title: 'Solar Generation Capacity',
  yAxisTitle: 'Accounts',
  categories: [
    'Less than 2kW',
    '2-4 kW',
    '4-6 kW',
    '6-8 kW',
    '8-10 kW',
    '10-15 kW',
    '15-20 kW',
    '20-30 kW',
  ],
  values: [420, 1280, 2100, 1850, 920, 520, 340, 210],
  color: SOLAR_CAPACITY_BAR,
  labelColor: '#1E232E',
};

export const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const loadStackedSeries = [
  { name: 'HEATING', color: APPLIANCE_COLORS.HEATING, data: [420, 380, 310, 240, 180, 140, 120, 130, 200, 320, 410, 450] },
  { name: 'OTHERS', color: APPLIANCE_COLORS.OTHERS, data: [380, 360, 340, 320, 300, 290, 280, 285, 310, 350, 370, 390] },
  { name: 'ALWAYS_ON', color: APPLIANCE_COLORS.ALWAYS_ON, data: [220, 210, 205, 200, 198, 195, 192, 194, 198, 205, 210, 215] },
  { name: 'COOLING', color: APPLIANCE_COLORS.COOLING, data: [80, 90, 140, 220, 320, 380, 410, 400, 280, 160, 100, 85] },
  { name: 'WATER_HEATER', color: APPLIANCE_COLORS.WATER_HEATER, data: [90, 88, 86, 85, 84, 83, 82, 83, 85, 88, 90, 92] },
  { name: 'REFRIGERATION', color: APPLIANCE_COLORS.REFRIGERATION, data: [55, 54, 53, 52, 52, 51, 51, 51, 52, 53, 54, 55] },
  { name: 'POOL_PUMP', color: APPLIANCE_COLORS.POOL_PUMP, data: [40, 42, 48, 55, 62, 68, 70, 68, 58, 48, 42, 40] },
  { name: 'LIGHTING', color: APPLIANCE_COLORS.LIGHTING, data: [35, 34, 33, 32, 31, 30, 29, 30, 32, 34, 35, 36] },
];

export const DAILY_CATEGORIES = Array.from({ length: 31 }, (_, i) => String(i + 1));
export const HOURLY_CATEGORIES = [
  '12 AM', '1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM',
  '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM',
];

export const WEEKDAY_CATEGORIES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function buildEvChargingHeatmapData() {
  const data = [];
  for (let h = 0; h < 24; h += 1) {
    for (let d = 0; d < 7; d += 1) {
      let v = 52 + ((h + d * 5) % 9) * 6;
      if (h >= 5 && h <= 9) v = Math.round(v * 0.32);
      if (h >= 17 && h <= 22) {
        v += 560 + (d % 4) * 45 + (h === 18 ? 120 : 0);
      }
      data.push([d, h, Math.min(920, v)]);
    }
  }
  return data;
}

/** EV Analytics — match global EV swatch */
export const evChargingFrequencyBars = {
  title: 'EV Charging Frequency',
  yAxisTitle: 'Number of EV Owners',
  xAxisTitle: 'Median Charging Sessions per Week',
  categories: ['1', '2', '3', '4', '5', '6', '7', '8'],
  values: [18, 142, 96, 72, 48, 31, 22, 14],
  color: EV_CHART_COLORS.fill,
  labelColor: EV_CHART_COLORS.label,
};

export const evChargingDurationBars = {
  title: 'EV Charging Duration Histogram',
  yAxisTitle: 'Number of EV Owners',
  xAxisTitle: 'Median Weekly Charging Duration (Hrs)',
  categories: [
    '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21 or Above',
  ],
  values: [12, 22, 58, 56, 42, 38, 28, 22, 18, 14, 11, 9, 8, 7, 6, 6, 5, 5, 5, 24],
  color: EV_CHART_COLORS.fill,
  labelColor: EV_CHART_COLORS.label,
};

export const evChargingHeatmap = {
  title: 'EV Charging Pattern Heatmap',
  columnCategories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  rowCategories: HOURLY_CATEGORIES,
  data: buildEvChargingHeatmapData(),
};

export { evAdoptionByZip, EV_ADOPTION_DATASETS, EV_ADOPTION_CHART_META } from './evAdoption';

export const evHourlyConsumptionBars = {
  title: 'Total EV Consumption (Right click on the chart to drill down)',
  yAxisTitle: 'Total Consumption EV',
  categories: HOURLY_CATEGORIES,
  values: [
    132, 128, 118, 108, 102, 96, 88, 72, 52, 42, 38, 36, 34, 38, 48, 72, 96, 118, 128, 122, 118, 122, 126, 130,
  ],
  color: EV_CHART_COLORS.fill,
  labelColor: EV_CHART_COLORS.label,
};

export const evMonthlyOwnershipTrend = {
  title: 'EV Ownership Trend (Total EV L2/L3 Consumption and Ownership)',
  categories: MONTHS,
  consumptionMwh: [112.9, 121.4, 138.2, 151.6, 166.4, 182.8, 195.2, 208.6, 221.4, 235.8, 248.2, 259.6],
  evCounts: [292, 318, 443, 472, 498, 534, 561, 589, 628, 662, 688, 719],
};

export const evChargerAmplitudeBars = {
  title: 'EV L2/L3 Charger Amplitude',
  yAxisTitle: 'Accounts',
  categories: ['<4 kW Charger', '4-5 kW Charger', '5-6 kW Charger', '6-7 kW Charger', '7-8 kW Charger', '8-9 kW Charger', '9-10 kW Charger', '10-11 kW Charger', '11+ kW Charger'],
  values: [6, 39, 49, 75, 100, 117, 51, 82, 365],
  color: EV_CHART_COLORS.fill,
  labelColor: EV_CHART_COLORS.label,
};

export { EV_GRID_IMPACT_DATASETS, EV_GRID_IMPACT_VIEW_OPTIONS } from './evGridImpact';

function expandSeriesData(data, length, factor = 1) {
  return Array.from({ length }, (_, i) =>
    Math.round((data[i % data.length] || 0) * factor * (0.9 + (i % 4) * 0.04))
  );
}

export const dailyStackedSeries = loadStackedSeries.map((s) => ({
  ...s,
  data: expandSeriesData(s.data, 31, 0.35),
}));

export const hourlyStackedSeries = loadStackedSeries.map((s) => ({
  ...s,
  data: expandSeriesData(s.data, 24, 0.12),
}));

export const weekdayStackedSeries = loadStackedSeries.map((s) => ({
  ...s,
  data: expandSeriesData(s.data, 7, 2.1),
}));

export const consumptionDecileBars = {
  title: 'Consumption Decile',
  yAxisTitle: 'Total Consumption',
  categories: [
    '0% - 10%',
    '10% - 20%',
    '20% - 30%',
    '30% - 40%',
    '40% - 50%',
    '50% - 60%',
    '60% - 70%',
    '70% - 80%',
    '80% - 90%',
    '90% - 100%',
  ],
  values: [5.1, 12.4, 18.2, 24.1, 31.5, 38.2, 45.8, 55.3, 64.0, 73.9],
  valueSuffix: ' G(Wh/T)',
  color: LOAD_RESEARCH_BAR,
  labelColor: '#1E232E',
};

export const consumptionHistogramBars = {
  title: 'Consumption Histogram',
  yAxisTitle: 'Total Accounts',
  categories: [
    '0.0 M(Wh/T) - 3.4 M(Wh/T)',
    '3.4 M(Wh/T) - 6.7 M(Wh/T)',
    '6.7 M(Wh/T) - 10.1 M(Wh/T)',
    '10.1 M(Wh/T) - 13.4 M(Wh/T)',
    '13.4 M(Wh/T) - 16.8 M(Wh/T)',
    '16.8 M(Wh/T) - 20.2 M(Wh/T)',
    '20.2 M(Wh/T) - 23.5 M(Wh/T)',
    '23.5 M(Wh/T) - 26.9 M(Wh/T)',
    '26.9 M(Wh/T) - 30.3 M(Wh/T)',
    '>30.3 M(Wh/T)',
  ],
  values: [1417, 3135, 3951, 3745, 2958, 2069, 1390, 859, 562, 1156],
  color: LOAD_RESEARCH_BAR,
  labelColor: '#1E232E',
};

export {
  CUSTOM_HOME_CHART_TITLES,
  CUSTOM_HOME_COLORS,
  customHomeOverviewColors,
  customHomeOverviewSlices,
  customUploadCharts,
  customUploadChartsDefaultId,
  UPLOAD_CHART_COLORS,
} from './customCharts';

/** Placeholder tiles for tabs without full fixture sets yet */
export const placeholderDonut = (title) => ({
  title,
  slices: [
    { name: 'Segment A', y: 45 },
    { name: 'Segment B', y: 35 },
    { name: 'Segment C', y: 20 },
  ],
});
