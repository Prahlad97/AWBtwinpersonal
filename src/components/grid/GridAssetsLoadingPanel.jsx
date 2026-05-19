import { Box, CircularProgress, Typography } from '@mui/material';
import { AWB } from '../../theme/awbTokens';

const SUBTAB_MESSAGES = {
  HOME: 'Preparing 8,760 hourly demand curves…',
  GRID_PEAK: 'Building load duration curves…',
  ASSETS: 'Loading grid asset tables…',
  NWA: 'Loading view…',
};

export function GridAssetsLoadingPanel({ subId = 'HOME' }) {
  const message = SUBTAB_MESSAGES[subId] || 'Loading grid analytics…';

  return (
    <Box
      role="status"
      aria-live="polite"
      aria-busy="true"
      sx={{
        minHeight: 420,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        bgcolor: '#fff',
        border: `1px solid ${AWB.border}`,
        borderRadius: '4px',
        px: 3,
        py: 6,
      }}
    >
      <CircularProgress size={44} sx={{ color: AWB.brandBlue }} aria-hidden />
      <Typography sx={{ fontSize: 15, fontWeight: 600, color: AWB.textPrimary }}>Loading Grid Asset</Typography>
      <Typography sx={{ fontSize: 13, color: '#6b7280', textAlign: 'center', maxWidth: 360 }}>
        {message}
      </Typography>
    </Box>
  );
}
