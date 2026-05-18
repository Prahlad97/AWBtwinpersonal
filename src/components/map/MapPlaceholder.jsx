import { Box, Typography } from '@mui/material';

/**
 * Phase 1 stand-in for `DashboardMapWrapper` — layout/chrome only, no Mapbox.
 */
export function MapPlaceholder({ fullHeight = false }) {
  return (
    <Box
      sx={{
        flex: 1,
        minHeight: fullHeight ? 480 : 320,
        maxHeight: fullHeight ? 'none' : '75%',
        borderRadius: 1,
        border: '1px solid #d5dbe8',
        bgcolor: '#f4f6fa',
        backgroundImage: `
          linear-gradient(#e2e8f2 1px, transparent 1px),
          linear-gradient(90deg, #e2e8f2 1px, transparent 1px)
        `,
        backgroundSize: '24px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          px: 2,
          py: 1.5,
          bgcolor: 'rgba(255,255,255,0.92)',
          borderRadius: 1,
          border: '1px solid #d5dbe8',
          textAlign: 'center',
        }}
      >
        <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#1e232e', fontFamily: 'Roboto, sans-serif' }}>
          Map preview
        </Typography>
        <Typography sx={{ fontSize: 11, color: '#565e6e', mt: 0.5, fontFamily: 'Roboto, sans-serif' }}>
          Analytics Lab · interactive map in a later phase
        </Typography>
      </Box>
    </Box>
  );
}
