import { Box, Typography } from '@mui/material';
import { LOCATION_MAP_LEGENDS, LOCATION_MAP_TITLES } from '../../fixtures/locationAreas';

export function LocationMapLegend({ subId = 'HOME', compact = false }) {
  const legend = LOCATION_MAP_LEGENDS[subId] || LOCATION_MAP_LEGENDS.HOME;
  const title = LOCATION_MAP_TITLES[subId] || LOCATION_MAP_TITLES.HOME;

  return (
    <Box
      sx={{
        bgcolor: 'rgba(255,255,255,0.94)',
        border: '1px solid #d0d6e7',
        borderRadius: '6px',
        px: compact ? 1.5 : 2,
        py: compact ? 1 : 1.25,
        minWidth: compact ? 160 : 200,
      }}
    >
      <Typography sx={{ fontSize: 12, fontWeight: 600, color: '#1e232e', mb: 0.75 }}>{title}</Typography>
      {legend.map((item) => (
        <Box key={item.label} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.35 }}>
          <Box sx={{ width: 14, height: 14, borderRadius: '2px', bgcolor: item.color, border: '1px solid rgba(0,0,0,0.08)' }} />
          <Typography sx={{ fontSize: 11, color: '#565e6e' }}>{item.label}</Typography>
        </Box>
      ))}
    </Box>
  );
}
