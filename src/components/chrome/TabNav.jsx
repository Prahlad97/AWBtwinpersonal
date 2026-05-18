import { Link, useLocation } from 'react-router-dom';
import { Tab, Tabs } from '@mui/material';
import { ANALYTICS_TABS } from '../../config/tabs';
import { AWB, font } from '../../theme/awbTokens';

/** Production chrome: `tabs-renderer-nuj.js` tab styles */
export function TabNav() {
  const location = useLocation();
  const currentRoute =
    ANALYTICS_TABS.find((t) => location.pathname.startsWith(`/dashboards/${t.route}`))?.route ||
    'account';

  return (
    <Tabs
      value={currentRoute}
      variant="scrollable"
      scrollButtons="auto"
      sx={{
        mt: '20px',
        bgcolor: '#fff',
        minHeight: 'auto',
        pr: '50px',
        '& .MuiTabs-indicator': { display: 'none' },
        '& .MuiTabs-flexContainer': { flexWrap: 'wrap', rowGap: '10px', gap: '2px' },
      }}
    >
      {ANALYTICS_TABS.map((tab) => (
        <Tab
          key={tab.id}
          value={tab.route}
          label={tab.name}
          component={Link}
          to={`/dashboards/${tab.route}`}
          disableRipple
          sx={{
            ...font.tab,
            textTransform: 'capitalize',
            minHeight: 'auto',
            flex: '1 1 fit-content',
            maxWidth: 250,
            mr: '2px',
            py: '14px',
            px: '32px',
            color: AWB.brandBlue,
            bgcolor: AWB.tabInactiveBg,
            '&.Mui-selected': {
              color: AWB.brandBlue,
              bgcolor: '#fff',
              borderBottom: `2px solid ${AWB.tabActiveAccent}`,
            },
          }}
        />
      ))}
    </Tabs>
  );
}
