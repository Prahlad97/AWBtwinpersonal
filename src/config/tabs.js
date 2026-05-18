/** Analytics tab routes — mirrors AWB main app `tabRoutes`. */
export const ANALYTICS_TABS = [
  { id: 'LOCATION', name: 'Location', route: 'location', subtabs: [
    { id: 'HOME', name: 'Home', route: '' },
    { id: 'EV_MAP', name: 'EV Maps', route: 'ev-map' },
    { id: 'INCOME', name: 'Income', route: 'income' },
    { id: 'GRID_MAP', name: 'Grid Map', route: 'grid-map' },
  ]},
  { id: 'ACCOUNT', name: 'Account', route: 'account', subtabs: [
    { id: 'HOME', name: 'Home', route: '' },
    { id: 'LIFESTYLE_PROFILE', name: 'Lifestyle Profile', route: 'lifestyle-profile' },
  ]},
  { id: 'PREMISE', name: 'Premise', route: 'premise', subtabs: [{ id: 'HOME', name: 'Home', route: '' }] },
  { id: 'APPLIANCE_TARGETING', name: 'Appliance Targeting', route: 'appliance-targeting', subtabs: [{ id: 'HOME', name: 'Home', route: '' }] },
  { id: 'LOAD_RESEARCH', name: 'Load Research', route: 'load-research', subtabs: [
    { id: 'HOME', name: 'Home', route: '' },
    { id: 'CONSUMPTION_BUCKET', name: 'Consumption Bucket', route: 'consumption-bucket' },
    { id: 'PROGRAM_SIMULATION', name: 'Program Simulation', route: 'program-simulation' },
  ]},
  { id: 'EV_ANALYTICS', name: 'EV Analytics', route: 'ev-analytics', subtabs: [
    { id: 'HOME', name: 'Home', route: '' },
    { id: 'CHARGING_BEHAVIOR', name: 'EV Charging Behavior', route: 'charging-behavior' },
    { id: 'EV_ADOPTION', name: 'EV Adoption', route: 'ev-adoption' },
    { id: 'EV_GRID_IMPACT', name: 'EV Grid Impact', route: 'ev-grid-impact' },
  ]},
  { id: 'GRID_ASSETS', name: 'Grid Asset', route: 'grid-assets', subtabs: [
    { id: 'HOME', name: 'Home', route: '' },
    { id: 'GRID_PEAK', name: 'Grid Peak', route: 'grid-peak' },
    { id: 'ASSETS', name: 'Assets', route: 'assets' },
    { id: 'NWA', name: 'NWA', route: 'nwa' },
  ]},
  { id: 'CUSTOM', name: 'Custom', route: 'custom', subtabs: [
    { id: 'HOME', name: 'Home', route: '' },
    { id: 'CHART_UPLOADS', name: 'Chart Uploads', route: 'chart-uploads' },
  ]},
];

export function getTabByRoute(route) {
  return ANALYTICS_TABS.find((t) => t.route === route) || ANALYTICS_TABS[1];
}

export function getSubtab(tab, subRoute) {
  if (!subRoute) {
    const emptyRoute = tab.subtabs.find((s) => s.route === '');
    if (emptyRoute) return emptyRoute;
    return tab.subtabs.find((s) => s.id === 'HOME') || tab.subtabs[0];
  }
  return tab.subtabs.find((s) => s.route === subRoute) || tab.subtabs[0];
}
