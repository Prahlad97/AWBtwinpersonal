import { useParams } from 'react-router-dom';
import { AccountDashboard } from './AccountDashboard';
import { PremiseDashboard } from './PremiseDashboard';
import { ApplianceTargetingDashboard } from './ApplianceTargetingDashboard';
import { LoadResearchDashboard } from './LoadResearchDashboard';
import { PlaceholderDashboard } from './PlaceholderDashboard';
import { CustomDashboardView } from './CustomDashboardView';
import { getTabByRoute, getSubtab } from '../config/tabs';

export function DashboardRouter() {
  const { tab, subtab } = useParams();
  const tabConfig = getTabByRoute(tab);
  const currentSub = getSubtab(tabConfig, subtab);
  const subId = currentSub?.id || 'HOME';

  switch (tabConfig.id) {
    case 'ACCOUNT':
      return <AccountDashboard />;
    case 'PREMISE':
      return <PremiseDashboard />;
    case 'APPLIANCE_TARGETING':
      return <ApplianceTargetingDashboard />;
    case 'LOAD_RESEARCH':
      return <LoadResearchDashboard />;
    case 'LOCATION':
      return <PlaceholderDashboard tabName="Location" tileCount={3} />;
    case 'EV_ANALYTICS':
      return <PlaceholderDashboard tabName="EV Analytics" tileCount={4} />;
    case 'GRID_ASSETS':
      return <PlaceholderDashboard tabName="Grid Asset" tileCount={3} />;
    case 'CUSTOM':
      return <CustomDashboardView subId={subId} />;
    default:
      return <AccountDashboard />;
  }
}
