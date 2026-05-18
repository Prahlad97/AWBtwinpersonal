import analyticsIcon from '../assets/images/analytics_tab.svg';
import gridPlannerIcon from '../assets/images/grid_planner_tab.svg';
import evmcIcon from '../assets/images/evmc_tab.svg';
import theftIcon from '../assets/images/theft_tab.svg';
import engagementIcon from '../assets/images/engagement-icon.svg';

/** Mirrors main app `headerTabs` + `TAB_ICONS` for the product switcher menu. */
export const HEADER_PRODUCTS = [
  {
    id: 'analytics',
    label: 'Analytics',
    path: '/dashboards/location',
    icon: analyticsIcon,
    enabled: true,
    section: 'workbench',
  },
  {
    id: 'grid-planner',
    label: 'Grid Planner',
    path: '/der-grid/scenarios',
    icon: gridPlannerIcon,
    enabled: false,
    section: 'workbench',
  },
  {
    id: 'igp',
    label: 'Integrated Grid Planning',
    path: '/der-grid-v2/system-load',
    icon: gridPlannerIcon,
    enabled: false,
    section: 'workbench',
  },
  {
    id: 'evmc',
    label: 'EV Managed Charging',
    path: '/evmc/enrollment',
    icon: evmcIcon,
    enabled: false,
    section: 'other',
  },
  {
    id: 'theft',
    label: 'Theft',
    path: '/theft/smart-meter',
    icon: theftIcon,
    enabled: false,
    section: 'other',
  },
  {
    id: 'engagement',
    label: 'Engagement',
    path: '/engagement/email',
    icon: engagementIcon,
    enabled: false,
    section: 'other',
  },
];

export const ACTIVE_PRODUCT_ID = 'analytics';
