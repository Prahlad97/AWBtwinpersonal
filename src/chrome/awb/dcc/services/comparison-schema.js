/**
 * Config schema for comparison CRUD: backend (DTO) vs domain (app) field names.
 * Single source of truth for API contract; mappers use this for consistent transforms.
 */

/** Comparison (list item / get-one) – API response shape uses snake_case. */
export const COMPARISON_DTO_TO_DOMAIN = {
  // comparison root
  dcc_id: 'dccID',
  name: 'name',
  description: 'description',
  user_id: 'userId',
  user_name: 'userName',
  pilot_name: 'pilotName',
  curve_type: 'curveType',
  consumption_type: 'consumptionType',
  is_shared: 'isShared',
  created_at: 'createdAt',
};

/** Demand curve – API response fields (snake_case) to domain (camelCase). */
export const DEMAND_CURVE_DTO_TO_DOMAIN = {
  dcc_id: 'dccId',
  dcc_demand_curve_id: 'demandCurveId',
  name: 'name',
  segment_name: 'segmentName',
  segment_id: 'segmentId',
  segment_data: 'segmentData',
  saved_filter_name: 'savedFilterName',
  timeframe: 'timeframe',
  program_segment: 'programSegment',
  created_at: 'createdAt',
};

/** Delta curve – API response fields. */
export const DELTA_CURVE_DTO_TO_DOMAIN = {
  dcc_id: 'dccId',
  dcc_delta_curve_id: 'deltaCurveId',
  name: 'name',
  dcc_demand_curve_id_1: 'demandCurveId1',
  dcc_demand_curve_id_2: 'demandCurveId2',
  created_at: 'createdAt',
};

/** Comparison create/update payload – domain to API (snake_case). */
export const COMPARISON_DOMAIN_TO_PAYLOAD = {
  dccID: 'dcc_id',
  name: 'name',
  description: 'description',
  pilotName: 'pilot_name',
  userId: 'user_id',
  isShared: 'is_shared',
  curveType: 'curve_type',
  PLOT_DURATION: 'curve_type', // fallback when curveType not set
  SHOW_AVERAGE: 'consumption_type', // mapped to 'AVERAGE' | 'TOTAL'
};

/** Demand curve payload – domain curveProperties + top-level to API. */
export const DEMAND_CURVE_PAYLOAD_FIELDS = [
  'dcc_demand_curve_id',
  'name',
  'saved_filter_name',
  'timeframe',
  'program_segment',
  'segment_data', // { id, name, invert } when a segment is selected
];

/** segment_data shape in create/update payload: selected segment. */
export const SEGMENT_DATA_PAYLOAD_SHAPE = {
  id: 'segment id',
  name: 'segment name',
  invert: 'boolean',
};

/** Delta curve payload – domain to API. */
export const DELTA_CURVE_DOMAIN_TO_PAYLOAD = {
  deltaCurveId: 'dcc_delta_curve_id',
  name: 'name',
  demandCurveId1: 'dcc_demand_curve_id_1',
  demandCurveId2: 'dcc_demand_curve_id_2',
};

/** Default comparison domain shape (for new comparison from API). */
export const DEFAULT_COMPARISON_META = {
  curveSeries: {},
  dataNotPresentDetails: [],
  curveMetaInfo: {
    xAxisData: [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ],
  },
  isEdited: false,
  VALUE: '',
};
