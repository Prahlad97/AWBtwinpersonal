/** Matches production `AWB-frontend` CUSTOM_FILTERS keys. */
export const CUSTOM_FILTERS = {
  PREMISE: 'Premise Type',
  METER: 'Meter Type',
  FUEL: 'Fuel Type',
};

/** Matches production `lookerFilters['Consumption Select']`: `total` | `avg`. */
export const CONSUMPTION_SELECT_FILTER_KEY = 'Consumption Select';

export const LAB_DEFAULT_LOOKER_FILTERS = {
  'Premise Type': 'Residential',
  'Meter Type': 'AMI',
  'Fuel Type': 'Electricity',
  [CONSUMPTION_SELECT_FILTER_KEY]: 'total',
};

/** KPI secondary IDs — shape aligned with production `otherIds`. */
export const LAB_OTHER_IDS = [
  { ID: 'ACCOUNTID', Name: 'Customers', type: 'accountId' },
  { ID: 'PREMISEID', Name: 'Premises', type: 'premiseId' },
  { ID: 'METERID', Name: 'Meters', type: 'meterId' },
];

export const CONSUMPTION_SELECT_TOOLTIP = {
  TOTAL_W_SOLAR:
    'Combined energy consumption and solar generation of all users during the selected time period and applied filters.',
  AVG_W_SOLAR:
    'Per-user average energy consumption and solar generation during the selected time period and applied filters.',
  TOTAL_WO_SOLAR:
    'Combined energy usage of all users during the selected timeframe, based on applied filters.',
  AVG_WO_SOLAR:
    'Per-user average energy usage during the selected timeframe, based on applied filters.',
};
