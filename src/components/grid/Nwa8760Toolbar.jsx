import { Box, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { AWB } from '../../theme/awbTokens';

/** Production NWA chrome: metric pill + temperature scale toggle + refresh hint. */
export function Nwa8760Toolbar({ tempScale, onTempScaleChange }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 1.5,
        mb: 1.5,
        py: 0.5,
      }}
    >
      <Box
        sx={{
          px: 1.5,
          py: 0.5,
          borderRadius: '4px',
          bgcolor: AWB.brandBlue,
          color: '#fff',
          fontSize: 13,
          fontWeight: 500,
        }}
      >
        Gross Demand
      </Box>

      <ToggleButtonGroup
        exclusive
        size="small"
        value={tempScale}
        onChange={(_, v) => v && onTempScaleChange(v)}
        sx={{
          '& .MuiToggleButton-root': {
            textTransform: 'none',
            fontSize: 12,
            px: 1.25,
            py: 0.35,
            borderColor: AWB.border,
            color: '#1E232E',
          },
          '& .Mui-selected': {
            bgcolor: `${AWB.tabInactiveBg} !important`,
            color: `${AWB.brandBlue} !important`,
            fontWeight: 600,
          },
        }}
      >
        <ToggleButton value="C">Hourly</ToggleButton>
        <ToggleButton value="F">10°F to 100°F</ToggleButton>
      </ToggleButtonGroup>

      <Typography sx={{ fontSize: 12, color: '#6b7280', ml: 'auto' }}>
        Drag or 2-finger pinch to zoom time · Wheel to zoom · Shift+drag to pan
      </Typography>
    </Box>
  );
}
