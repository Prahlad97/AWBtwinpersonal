/** Mirrors main app `TAB_IDS_WITH_MAP_VIEW` in `routes.js`. */
export const TAB_IDS_WITH_MAP_VIEW = [
  'LOCATION',
  'ACCOUNT',
  'PREMISE',
  'APPLIANCE_TARGETING',
  'LOAD_RESEARCH',
  'EV_ANALYTICS',
  'GRID_ASSETS',
  'CUSTOM',
];

export const MAP_VIEW = {
  ANALYSIS: 'analysis',
  SPLIT: 'split',
  MAP: 'map',
};

export function tabSupportsMapView(tabId) {
  return TAB_IDS_WITH_MAP_VIEW.includes(tabId);
}
