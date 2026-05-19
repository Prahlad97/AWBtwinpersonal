import DownloadIcon from '@/assets/images/download-csv.svg';
import DownloadCSVIcon from '@/assets/images/download-csv-icon.svg';
import RenameIcon from '@/assets/images/rename-icon.svg';
import DeleteIcon from '@/assets/images/DeleteIcon.svg';
import PublishIcon from '@/assets/images/PublishIcon.svg';
import DuplicateIcon from '@/assets/images/download-csv.svg';

export const PROPERTIES = {
  SAVED_FILTER_SELECTION: 'SAVED_FILTER_SELECTION',
  SEGMENT_SELECTION: 'SEGMENT_SELECTION',
  TIME_INTERVAL: 'TIME_INTERVAL',
  PLOT_DURATION: 'PLOT_DURATION',
  VALUE: 'VALUE',
  SHOW_AVERAGE: 'SHOW_AVERAGE',
  IS_EDITED: 'isEdited',
  DEMAND_CURVE_TYPE: 'curveType',
  PROGRAM_SEGMENT: 'PROGRAM_SEGMENT',
};

export const DEFAULT_DEMAND_CURVES_DOMAIN = [
  {
    name: 'Demand Curve A',
    saved_filter_name: 'DEFAULT',
    timeframe: '2023/01/01 to 2024/01/01',
    program_segment: {},
    segment_data: null,
  },
  {
    name: 'Demand Curve B',
    saved_filter_name: 'DEFAULT',
    timeframe: '2023/01/01 to 2024/01/01',
    program_segment: {},
    segment_data: null,
  },
];

export const DEMAND_CURVE_TYPES = {
  // Consumption Curves (kWh) - matching DEMAND_CURVE_MENU_ITEMS IDs
  MONTHLY: 'MONTHLY',
  DAILY: 'DAILY',
  HOURLY: 'HOURLY',

  // Demand Curves (kW) - matching DEMAND_CURVE_MENU_ITEMS IDs
  KW_MONTHLY: 'KW_MONTHLY',
  KW_DAILY: 'KW_DAILY',
  KW_HOURLY: 'KW_HOURLY',

  // Special Chart Types
  576: '576',
  8760: '8760',

  // Legacy types for backward compatibility
  USAGE_TIME: 'USAGE_TIME',
  DEMAND_CURVE_AVG: 'DEMAND_CURVE_AVG',
  DEMAND_CURVE_MIN: 'DEMAND_CURVE_MIN',
  DEMAND_CURVE_MAX: 'DEMAND_CURVE_MAX',
  DEMAND_CURVE_CHART: 'DEMAND_CURVE_CHART',
  CHART_576: '576',
  CHART_8760: '8760',
};

export const CURVE_DATA_KEYS = {
  SERIES_DATA: 'curveSeries',
  PROPERTIES_DATA: 'curveProperties',
  CURVE_META_INFO: 'curveMetaInfo',
  PENDING_SEGMENTS: 'pendingSegmentsToLoad',
  DATA_NOT_PRESENT_DETAILS: 'dataNotPresentDetails',
  CURVE_NAME: 'metaData.description',
};

export const VALUES = {
  TOTAL: {
    id: 'TOTAL',
    name: 'Total Consumption',
  },
  COUNT: {
    id: 'COUNT',
    name: 'Count Users',
  },
  AVERAGE: {
    id: 'AVERAGE',
    name: 'Average Consumption',
  },
};

export const DEFAULT_CURVE_LABELS = {
  DEMAND: 'Demand curve',
  DELTA: 'Delta curve',
};

/** Max demand + delta curves allowed in one comparison. */
export const DCC_MAX_CURVES = 10;

/** DCC chart/error overlay copy. */
export const DCC_CHART_MESSAGES = {
  NO_DATA_TITLE: 'No data to show',
  NO_DATA_DESCRIPTION: "It looks like we don't have enough data to display this chart right now.",
  TRY_AGAIN: 'Please check back later or adjust your filters.',
  LOADING_CHART: 'Loading chart data...',
  COMPARE: 'Compare',
  COMPARING: 'Comparing...',
  ADD_ANOTHER: 'Add Another',
  UNSAVED_FILTERS_TITLE: 'Unsaved Filters',
  OK: 'OK',
  SKIP_AND_SAVE: 'Skip and Save',
};

export const EDIT_COMPARISON_ITEMS = [
  // {
  //   id: 'downloadReport',
  //   title: 'Download Report',
  //   icon: DownloadIcon,
  // },
  {
    id: 'downloadCSV',
    title: 'Download CSV',
    icon: DownloadCSVIcon,
  },
  {
    id: 'rename',
    title: 'Rename',
    icon: RenameIcon,
  },
  {
    id: 'delete',
    title: 'Delete',
    icon: DeleteIcon,
  },
  {
    id: 'publish',
    title: 'Publish',
    icon: PublishIcon,
  },
];

export const EDIT_SCENARIO_ITEMS = [
  {
    id: 'duplicate',
    title: 'Duplicate',
    icon: DuplicateIcon,
  },
  {
    id: 'rename',
    title: 'Rename',
    icon: RenameIcon,
  },
  {
    id: 'publish',
    title: 'Publish',
    icon: PublishIcon,
  },
  {
    id: 'delete',
    title: 'Delete',
    icon: DeleteIcon,
  },
];

export const SAVED_ZONE_ITEMS = [
  {
    id: 'rename',
    title: 'Rename',
    icon: RenameIcon,
  },
  {
    id: 'publish',
    title: 'Publish',
    icon: PublishIcon,
  },
  {
    id: 'delete',
    title: 'Delete',
    icon: DeleteIcon,
  },
];

export const DEMAND_CURVE_DETAILS_COLORS = [
  '#FCE7F3',
  '#DBE7FE',
  '#ECFCCB',
  '#FFEDD5',
  '#FEE2E2',
  '#F3E8FF',
  '#D1FAE5',
  '#CFFAFE',
  '#EAEDF6',
  '#FEF9C3',
];

export const DEMAND_CURVE_COLORS = [
  '#DB2777',
  '#256AEB',
  '#65A30D',
  '#EA580C',
  '#DC2626',
  '#9333EA',
  '#059669',
  '#0891B2',
  '#282C39',
  '#CA8A04',
];

export const DEMAND_CURVE_MENU_ITEMS = [
  {
    id: 'MONTHLY',
    value: 'MONTHLY',
    description: 'Monthly Consumption Curve (kWh)',
    showButtons: false,
    curveType: 'MONTHLY',
  },
  {
    id: 'DAILY',
    value: 'DAILY',
    description: 'Weekly Consumption Curve (kWh)',
    showButtons: false,
    curveType: 'DAILY',
  },
  {
    id: 'HOURLY',
    value: 'HOURLY',
    description: '24 Hour Consumption Curve (kWh)',
    showButtons: false,
    curveType: 'HOURLY',
  },
  {
    id: 'KW_MONTHLY',
    value: 'MONTHLY',
    description: 'Monthly Demand Curve (kW)',
    showButtons: true,
    curveType: 'KW_MONTHLY',
  },
  {
    id: 'KW_DAILY',
    value: 'DAILY',
    description: 'Weekly Demand Curve (kW)',
    showButtons: true,
    curveType: 'KW_DAILY',
  },
  {
    id: 'KW_HOURLY',
    value: 'HOURLY',
    description: '24 Hour Demand Curve (kW)',
    showButtons: true,
    curveType: 'KW_HOURLY',
  },
  {
    id: '576',
    value: '576',
    description: '576 (kW)',
    showButtons: false,
    curveType: '576',
  },
  {
    id: '8760',
    value: '8760',
    description: '8760 (kW)',
    showButtons: false,
    curveType: '8760',
  },
];

export const DEMAND_CURVE_WIDGETS = {
  // Special Chart Types - 8760
  DEMAND_CURVE_CHART_8760: {
    exploreFields: ['date_hour', 'dynamic_consumption_demand_curve'],
    otherFields: [],
    exploreSorts: ['date_hour'],
    limit: 9000,
  },
  DEMAND_CURVE_CHART_8760_AVERAGE: {
    exploreFields: ['date_hour', 'dynamic_consumption_demand_curve'],
    otherFields: [],
    exploreSorts: ['date_hour'],
    filters: {
      'demand_curve_sdt.consumption_select': 'avg',
    },
    limit: 9000,
  },
  8760: {
    exploreFields: ['date_hour', 'dynamic_consumption_demand_curve'],
    otherFields: [],
    exploreSorts: ['date_hour'],
    limit: 9000,
  },
  '8760_AVERAGE': {
    exploreFields: ['date_hour', 'dynamic_consumption_demand_curve'],
    otherFields: [],
    exploreSorts: ['date_hour'],
    filters: {
      'demand_curve_sdt.consumption_select': 'avg',
    },
    limit: 9000,
  },

  // Special Chart Types - 576
  DEMAND_CURVE_CHART_576: {
    exploreFields: [
      'date_year',
      'date_month_name',
      'date_hour_of_day',
      'max_consumption_dc',
      'min_consumption_dc',
    ],
    otherFields: [],
    exploreSorts: ['date_year', 'date_month_name', 'date_hour_of_day'],
    limit: 600,
  },
  DEMAND_CURVE_CHART_576_AVERAGE: {
    exploreFields: [
      'date_year',
      'date_month_name',
      'date_hour_of_day',
      'max_consumption_dc',
      'min_consumption_dc',
    ],
    otherFields: [],
    exploreSorts: ['date_year', 'date_month_name', 'date_hour_of_day'],
    filters: {
      'demand_curve_sdt.consumption_select': 'avg',
    },
    limit: 600,
  },
  576: {
    exploreFields: [
      'date_year',
      'date_month_name',
      'date_hour_of_day',
      'max_consumption_dc',
      'min_consumption_dc',
    ],
    otherFields: [],
    exploreSorts: ['date_year', 'date_month_name', 'date_hour_of_day'],
    limit: 600,
  },
  '576_AVERAGE': {
    exploreFields: [
      'date_year',
      'date_month_name',
      'date_hour_of_day',
      'max_consumption_dc',
      'min_consumption_dc',
    ],
    otherFields: [],
    exploreSorts: ['date_year', 'date_month_name', 'date_hour_of_day'],
    filters: {
      'demand_curve_sdt.consumption_select': 'avg',
    },
    limit: 600,
  },
  DEMAND_CURVE_KW_HOURLY: {
    exploreFields: ['hour_of_day_dc', 'dynamic_consumption_demand_curve'],
    otherFields: [],
    exploreSorts: ['hour_of_day_dc'],
    limit: 500,
  },
  DEMAND_CURVE_KW_HOURLY_AVERAGE: {
    exploreFields: ['hour_of_day_dc', 'dynamic_consumption_demand_curve'],
    otherFields: [],
    exploreSorts: ['hour_of_day_dc'],
    filters: {
      'demand_curve_sdt.consumption_select': 'avg',
    },
    limit: 500,
  },
  DEMAND_CURVE_MAX_KW_HOURLY: {
    exploreFields: ['hour_of_day_dc', 'max_consumption_dc'],
    otherFields: [],
    exploreSorts: ['hour_of_day_dc'],
    limit: 500,
  },
  DEMAND_CURVE_MAX_KW_HOURLY_AVERAGE: {
    exploreFields: ['hour_of_day_dc', 'max_consumption_dc'],
    otherFields: [],
    exploreSorts: ['hour_of_day_dc'],
    filters: {
      'demand_curve_sdt.consumption_select': 'avg',
    },
    limit: 500,
  },
  DEMAND_CURVE_MIN_KW_HOURLY: {
    exploreFields: ['hour_of_day_dc', 'min_consumption_dc'],
    otherFields: [],
    exploreSorts: ['hour_of_day_dc'],
    limit: 500,
  },
  DEMAND_CURVE_MIN_KW_HOURLY_AVERAGE: {
    exploreFields: ['hour_of_day_dc', 'min_consumption_dc'],
    otherFields: [],
    exploreSorts: ['hour_of_day_dc'],
    filters: {
      'demand_curve_sdt.consumption_select': 'avg',
    },
    limit: 500,
  },
  DEMAND_CURVE_AVG_KW_HOURLY: {
    exploreFields: ['hour_of_day_dc', 'avg_consumption_dc'],
    otherFields: [],
    exploreSorts: ['hour_of_day_dc'],
    limit: 500,
  },
  DEMAND_CURVE_AVG_KW_HOURLY_AVERAGE: {
    exploreFields: ['hour_of_day_dc', 'avg_consumption_dc'],
    otherFields: [],
    exploreSorts: ['hour_of_day_dc'],
    filters: {
      'demand_curve_sdt.consumption_select': 'avg',
    },
    limit: 500,
  },
  DEMAND_CURVE_KW_DAILY: {
    exploreFields: ['day_of_week_dc', 'dynamic_consumption_demand_curve'],
    otherFields: [],
    exploreSorts: ['day_of_week_dc'],
    limit: 500,
  },
  DEMAND_CURVE_KW_DAILY_AVERAGE: {
    exploreFields: ['day_of_week_dc', 'dynamic_consumption_demand_curve'],
    otherFields: [],
    exploreSorts: ['day_of_week_dc'],
    filters: {
      'demand_curve_sdt.consumption_select': 'avg',
    },
    limit: 500,
  },
  DEMAND_CURVE_MAX_KW_DAILY: {
    exploreFields: ['day_of_week_dc', 'max_consumption_dc'],
    otherFields: [],
    exploreSorts: ['day_of_week_dc'],
    limit: 500,
  },
  DEMAND_CURVE_MAX_KW_DAILY_AVERAGE: {
    exploreFields: ['day_of_week_dc', 'max_consumption_dc'],
    otherFields: [],
    exploreSorts: ['day_of_week_dc'],
    filters: {
      'demand_curve_sdt.consumption_select': 'avg',
    },
    limit: 500,
  },
  DEMAND_CURVE_MIN_KW_DAILY: {
    exploreFields: ['day_of_week_dc', 'min_consumption_dc'],
    otherFields: [],
    exploreSorts: ['day_of_week_dc'],
    limit: 500,
  },
  DEMAND_CURVE_MIN_KW_DAILY_AVERAGE: {
    exploreFields: ['day_of_week_dc', 'min_consumption_dc'],
    otherFields: [],
    exploreSorts: ['day_of_week_dc'],
    filters: {
      'demand_curve_sdt.consumption_select': 'avg',
    },
    limit: 500,
  },
  DEMAND_CURVE_AVG_KW_DAILY: {
    exploreFields: ['day_of_week_dc', 'avg_consumption_dc'],
    otherFields: [],
    exploreSorts: ['day_of_week_dc'],
    limit: 500,
  },
  DEMAND_CURVE_AVG_KW_DAILY_AVERAGE: {
    exploreFields: ['day_of_week_dc', 'avg_consumption_dc'],
    otherFields: [],
    exploreSorts: ['day_of_week_dc'],
    filters: {
      'demand_curve_sdt.consumption_select': 'avg',
    },
    limit: 500,
  },
  DEMAND_CURVE_MAX_KW_MONTHLY: {
    exploreFields: ['month_num_dc', 'max_consumption_dc'],
    otherFields: [],
    exploreSorts: ['month_num_dc'],
    limit: 500,
  },
  DEMAND_CURVE_MAX_KW_MONTHLY_AVERAGE: {
    exploreFields: ['month_num_dc', 'max_consumption_dc'],
    otherFields: [],
    exploreSorts: ['month_num_dc'],
    filters: {
      'demand_curve_sdt.consumption_select': 'avg',
    },
    limit: 500,
  },
  DEMAND_CURVE_MIN_KW_MONTHLY: {
    exploreFields: ['month_num_dc', 'min_consumption_dc'],
    otherFields: [],
    exploreSorts: ['month_num_dc'],
    limit: 500,
  },
  DEMAND_CURVE_MIN_KW_MONTHLY_AVERAGE: {
    exploreFields: ['month_num_dc', 'min_consumption_dc'],
    otherFields: [],
    exploreSorts: ['month_num_dc'],
    filters: {
      'demand_curve_sdt.consumption_select': 'avg',
    },
    limit: 500,
  },
  DEMAND_CURVE_AVG_KW_MONTHLY: {
    exploreFields: ['month_num_dc', 'avg_consumption_dc'],
    otherFields: [],
    exploreSorts: ['month_num_dc'],
    limit: 500,
  },
  DEMAND_CURVE_AVG_KW_MONTHLY_AVERAGE: {
    exploreFields: ['month_num_dc', 'avg_consumption_dc'],
    otherFields: [],
    exploreSorts: ['month_num_dc'],
    filters: {
      'demand_curve_sdt.consumption_select': 'avg',
    },
    limit: 500,
  },
  USAGE_TIME_HOURLY: {
    exploreFields: ['date_hour_of_day', 'dynamic_consumption_demand_curve'],
    otherFields: [],
    exploreSorts: ['date_hour_of_day'],
    limit: 500,
  },
  USAGE_TIME_HOURLY_AVERAGE: {
    exploreFields: ['date_hour_of_day', 'dynamic_consumption_demand_curve'],
    otherFields: [],
    exploreSorts: ['date_hour_of_day'],
    filters: {
      'demand_curve_sdt.consumption_select': 'avg',
    },
    limit: 500,
  },
  USAGE_TIME_DAILY: {
    exploreFields: ['date_day_of_week', 'dynamic_consumption_demand_curve'],
    otherFields: [],
    exploreSorts: ['date_day_of_week'],
    limit: 500,
  },
  USAGE_TIME_DAILY_AVERAGE: {
    exploreFields: ['date_day_of_week', 'dynamic_consumption_demand_curve'],
    otherFields: [],
    exploreSorts: ['date_day_of_week'],
    filters: {
      'demand_curve_sdt.consumption_select': 'avg',
    },
    limit: 500,
  },
  USAGE_TIME_MONTHLY: {
    exploreFields: ['date_month_name', 'dynamic_consumption_demand_curve'],
    otherFields: [],
    exploreSorts: ['date_month_name'],
    limit: 500,
  },
  USAGE_TIME_MONTHLY_AVERAGE: {
    exploreFields: ['date_month_name', 'dynamic_consumption_demand_curve'],
    otherFields: [],
    exploreSorts: ['date_month_name'],
    filters: {
      'demand_curve_sdt.consumption_select': 'avg',
    },
    limit: 500,
  },

  // New naming scheme - Consumption Curves (matching DEMAND_CURVE_MENU_ITEMS IDs)
  MONTHLY: {
    exploreFields: ['date_month_name', 'dynamic_consumption_demand_curve'],
    otherFields: [],
    exploreSorts: ['date_month_name'],
    limit: 500,
  },
  MONTHLY_AVERAGE: {
    exploreFields: ['date_month_name', 'dynamic_consumption_demand_curve'],
    otherFields: [],
    exploreSorts: ['date_month_name'],
    filters: {
      'demand_curve_sdt.consumption_select': 'avg',
    },
    limit: 500,
  },
  DAILY: {
    exploreFields: ['date_day_of_week', 'dynamic_consumption_demand_curve'],
    otherFields: [],
    exploreSorts: ['date_day_of_week'],
    limit: 500,
  },
  DAILY_AVERAGE: {
    exploreFields: ['date_day_of_week', 'dynamic_consumption_demand_curve'],
    otherFields: [],
    exploreSorts: ['date_day_of_week'],
    filters: {
      'demand_curve_sdt.consumption_select': 'avg',
    },
    limit: 500,
  },
  HOURLY: {
    exploreFields: ['date_hour_of_day', 'dynamic_consumption_demand_curve'],
    otherFields: [],
    exploreSorts: ['date_hour_of_day'],
    limit: 500,
  },
  HOURLY_AVERAGE: {
    exploreFields: ['date_hour_of_day', 'dynamic_consumption_demand_curve'],
    otherFields: [],
    exploreSorts: ['date_hour_of_day'],
    filters: {
      'demand_curve_sdt.consumption_select': 'avg',
    },
    limit: 500,
  },

  // New naming scheme - KW Demand Curves with AVG button (matching DEMAND_CURVE_MENU_ITEMS IDs)
  KW_MONTHLY_AVG: {
    exploreFields: ['month_num_dc', 'avg_consumption_dc'],
    otherFields: [],
    exploreSorts: ['month_num_dc'],
    limit: 500,
  },
  KW_MONTHLY_AVG_AVERAGE: {
    exploreFields: ['month_num_dc', 'avg_consumption_dc'],
    otherFields: [],
    exploreSorts: ['month_num_dc'],
    filters: {
      'demand_curve_sdt.consumption_select': 'avg',
    },
    limit: 500,
  },
  KW_MONTHLY_MAX: {
    exploreFields: ['month_num_dc', 'max_consumption_dc'],
    otherFields: [],
    exploreSorts: ['month_num_dc'],
    limit: 500,
  },
  KW_MONTHLY_MAX_AVERAGE: {
    exploreFields: ['month_num_dc', 'max_consumption_dc'],
    otherFields: [],
    exploreSorts: ['month_num_dc'],
    filters: {
      'demand_curve_sdt.consumption_select': 'avg',
    },
    limit: 500,
  },
  KW_MONTHLY_MIN: {
    exploreFields: ['month_num_dc', 'min_consumption_dc'],
    otherFields: [],
    exploreSorts: ['month_num_dc'],
    limit: 500,
  },
  KW_MONTHLY_MIN_AVERAGE: {
    exploreFields: ['month_num_dc', 'min_consumption_dc'],
    otherFields: [],
    exploreSorts: ['month_num_dc'],
    filters: {
      'demand_curve_sdt.consumption_select': 'avg',
    },
    limit: 500,
  },

  KW_DAILY_AVG: {
    exploreFields: ['day_of_week_dc', 'avg_consumption_dc'],
    otherFields: [],
    exploreSorts: ['day_of_week_dc'],
    limit: 500,
  },
  KW_DAILY_AVG_AVERAGE: {
    exploreFields: ['day_of_week_dc', 'avg_consumption_dc'],
    otherFields: [],
    exploreSorts: ['day_of_week_dc'],
    filters: {
      'demand_curve_sdt.consumption_select': 'avg',
    },
    limit: 500,
  },
  KW_DAILY_MIN: {
    exploreFields: ['day_of_week_dc', 'min_consumption_dc'],
    otherFields: [],
    exploreSorts: ['day_of_week_dc'],
    limit: 500,
  },
  KW_DAILY_MIN_AVERAGE: {
    exploreFields: ['day_of_week_dc', 'min_consumption_dc'],
    otherFields: [],
    exploreSorts: ['day_of_week_dc'],
    filters: {
      'demand_curve_sdt.consumption_select': 'avg',
    },
    limit: 500,
  },
  KW_DAILY_MAX: {
    exploreFields: ['day_of_week_dc', 'max_consumption_dc'],
    otherFields: [],
    exploreSorts: ['day_of_week_dc'],
    limit: 500,
  },
  KW_DAILY_MAX_AVERAGE: {
    exploreFields: ['day_of_week_dc', 'max_consumption_dc'],
    otherFields: [],
    exploreSorts: ['day_of_week_dc'],
    filters: {
      'demand_curve_sdt.consumption_select': 'avg',
    },
    limit: 500,
  },

  KW_HOURLY_AVG: {
    exploreFields: ['hour_of_day_dc', 'avg_consumption_dc'],
    otherFields: [],
    exploreSorts: ['hour_of_day_dc'],
    limit: 500,
  },
  KW_HOURLY_AVG_AVERAGE: {
    exploreFields: ['hour_of_day_dc', 'avg_consumption_dc'],
    otherFields: [],
    exploreSorts: ['hour_of_day_dc'],
    filters: {
      'demand_curve_sdt.consumption_select': 'avg',
    },
    limit: 500,
  },
  KW_HOURLY_MIN: {
    exploreFields: ['hour_of_day_dc', 'min_consumption_dc'],
    otherFields: [],
    exploreSorts: ['hour_of_day_dc'],
    limit: 500,
  },
  KW_HOURLY_MIN_AVERAGE: {
    exploreFields: ['hour_of_day_dc', 'min_consumption_dc'],
    otherFields: [],
    exploreSorts: ['hour_of_day_dc'],
    filters: {
      'demand_curve_sdt.consumption_select': 'avg',
    },
    limit: 500,
  },
  KW_HOURLY_MAX: {
    exploreFields: ['hour_of_day_dc', 'max_consumption_dc'],
    otherFields: [],
    exploreSorts: ['hour_of_day_dc'],
    limit: 500,
  },
  KW_HOURLY_MAX_AVERAGE: {
    exploreFields: ['hour_of_day_dc', 'max_consumption_dc'],
    otherFields: [],
    exploreSorts: ['hour_of_day_dc'],
    filters: {
      'demand_curve_sdt.consumption_select': 'avg',
    },
    limit: 500,
  },
};
