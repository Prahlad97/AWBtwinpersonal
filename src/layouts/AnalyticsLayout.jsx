import { Outlet } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import { AppHeader } from '../components/chrome/AppHeader';
import { DashboardToolbar } from '../components/chrome/DashboardToolbar';
import { TabNav } from '../components/chrome/TabNav';
import { SubTabNav } from '../components/chrome/SubTabNav';
import { AWB } from '../theme/awbTokens';

/** Production chrome: `extension-nuj` + `AnalyticsDashboard` layout */
export function AnalyticsLayout() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#fff' }}>
      <AppHeader />
      <Container maxWidth={false} sx={{ maxWidth: '100% !important', px: 2, pb: 0 }}>
        <DashboardToolbar />
        <TabNav />
        <Box sx={{ bgcolor: AWB.pageBg, minHeight: 'calc(100vh - 220px)', px: 0, pb: 3 }}>
          <SubTabNav />
          <Outlet />
        </Box>
      </Container>
    </Box>
  );
}
