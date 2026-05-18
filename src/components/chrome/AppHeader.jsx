import { Box } from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
import logo from '../../assets/images/Bidgely.svg';
import { AWB } from '../../theme/awbTokens';
import { AnalyticsProductMenu } from './header/AnalyticsProductMenu';
import { NotificationsPanel } from './header/NotificationsPanel';
import { ProfileMenu } from './header/ProfileMenu';

/**
 * Production: `extension-nuj` toolbar + Container (`paddingTop: 4px`, `paddingBottom: 4px`)
 * + `logo-header-nuj` header row (`height: 56px`).
 */
export function AppHeader() {
  return (
    <Box
      sx={{
        background: AWB.headerGradient,
        borderBottom: `4px solid ${AWB.headerBorderBottom}`,
        color: '#fff',
      }}
    >
      <Box
        sx={{
          maxWidth: '100%',
          px: 3,
          pt: '4px',
          pb: '4px',
          boxSizing: 'border-box',
        }}
      >
        <Box
          component="header"
          sx={{
            height: 56,
            minHeight: 56,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '25px', minWidth: 0 }}>
            <Box component="img" src={logo} alt="Bidgely" sx={{ height: 28, width: 'auto', display: 'block' }} />
            <AnalyticsProductMenu />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: '25px', flexShrink: 0 }}>
            <NotificationsPanel />
            <Box
              component="a"
              href="https://bidgely-awb-documentation.bidgely.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Help documentation"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                color: 'inherit',
                textDecoration: 'none',
                cursor: 'pointer',
                lineHeight: 0,
              }}
            >
              <HelpIcon sx={{ fontSize: 24, color: '#fff' }} />
            </Box>
            <ProfileMenu displayName="NISHANT" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
