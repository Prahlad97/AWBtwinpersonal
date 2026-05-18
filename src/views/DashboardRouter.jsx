import { useParams } from 'react-router-dom';
import { AccountDashboard } from './AccountDashboard';
import { PremiseDashboard } from './PremiseDashboard';
import { ApplianceTargetingDashboard } from './ApplianceTargetingDashboard';
import { LoadResearchDashboard } from './LoadResearchDashboard';
import { PlaceholderDashboard } from './PlaceholderDashboard';
import { getTabByRoute } from '../config/tabs';

export function DashboardRouter() {
  const { tab } = useParams();
  const tabConfig = getTabByRoute(tab);

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
      return <PlaceholderDashboard tabName="Custom" tileCount={2} />;
    default:
      return <AccountDashboard />;
  }
}
