import { CustomChartUploadsDashboard } from './custom/CustomChartUploadsDashboard';
import { CustomHomeDashboard } from './custom/CustomHomeDashboard';

export function CustomDashboardView({ subId }) {
  if (subId === 'CHART_UPLOADS') {
    return <CustomChartUploadsDashboard />;
  }
  return <CustomHomeDashboard />;
}
