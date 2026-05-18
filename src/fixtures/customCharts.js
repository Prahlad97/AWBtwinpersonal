/** Custom tab — HOME overview donuts + Chart Uploads list fixtures (Figma AWB-Official). */

export const CUSTOM_HOME_COLORS = {
  mediumBlue: '#58B4D1',
  darkGrey: '#8E8E8E',
  oliveGreen: '#A7C26D',
  lightTeal: '#A1D9D9',
};

/** Shared slice set for Custom Chart 1–3 (percentages eyedropper from Figma 8-3094). */
export const customHomeOverviewSlices = [
  { name: 'Three', y: 37.38 },
  { name: 'One', y: 22.8 },
  { name: 'Two', y: 22.73 },
  { name: ' ', y: 17.08 },
];

export const customHomeOverviewColors = [
  CUSTOM_HOME_COLORS.mediumBlue,
  CUSTOM_HOME_COLORS.darkGrey,
  CUSTOM_HOME_COLORS.oliveGreen,
  CUSTOM_HOME_COLORS.lightTeal,
];

export const CUSTOM_HOME_CHART_TITLES = ['Custom Chart 1', 'Custom Chart 2', 'Custom Chart 3'];

export const UPLOAD_CHART_COLORS = {
  naMint: '#75C9C8',
  surveyYellow: '#E5C167',
  weekdayBlue: '#58B4D1',
  weekendOlive: '#A7C26D',
  peakGrey: '#8E8E8E',
  offPeakTeal: '#A1D9D9',
};

const highUsageDescription =
  'Identifies households with disproportionately high consumption during summer peak hours. Use as a program targeting filter to prioritize outreach and demand-response enrollment.';

export const customUploadCharts = [
  {
    id: 'high-usage-summer',
    title: 'High Usage Households - Summer Peak Analysis',
    author: 'Jane Doe',
    date: 'May 4 2025',
    description: highUsageDescription,
    chartType: 'pie',
    slices: [
      { name: 'NA', y: 95.05 },
      { name: 'Completed Survey', y: 4.95 },
    ],
    colors: [UPLOAD_CHART_COLORS.naMint, UPLOAD_CHART_COLORS.surveyYellow],
  },
  {
    id: 'weekend-weekday-1',
    title: 'Weekend vs Weekday Consumption Patterns',
    author: 'Steve Wozniak',
    date: 'Apr 12 2025',
    description:
      'Compares average kWh by day type to highlight behavioral shifts between weekend and weekday load profiles.',
    chartType: 'pie',
    slices: [
      { name: 'Weekday', y: 58.42 },
      { name: 'Weekend', y: 41.58 },
    ],
    colors: [UPLOAD_CHART_COLORS.weekdayBlue, UPLOAD_CHART_COLORS.weekendOlive],
  },
  {
    id: 'weekend-weekday-2',
    title: 'Weekend vs Weekday Consumption Patterns',
    author: 'Steve Wozniak',
    date: 'Mar 28 2025',
    description:
      'Prior-period weekend vs weekday split for the same cohort; useful for season-over-season program evaluation.',
    chartType: 'pie',
    slices: [
      { name: 'Peak', y: 44.12 },
      { name: 'Off-Peak', y: 35.88 },
      { name: 'Shoulder', y: 20.0 },
    ],
    colors: [
      UPLOAD_CHART_COLORS.peakGrey,
      UPLOAD_CHART_COLORS.offPeakTeal,
      UPLOAD_CHART_COLORS.weekendOlive,
    ],
  },
];

export const customUploadChartsDefaultId = customUploadCharts[0].id;
