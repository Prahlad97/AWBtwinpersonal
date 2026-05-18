import { Box, Typography } from '@mui/material';

/** Horizontal legend matching AWB appliance / ownership charts */
export function ChartLegendStrip({ items, dense }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: dense ? '6px 12px' : '8px 14px',
        justifyContent: 'center',
        alignItems: 'center',
        py: dense ? 0.5 : 1,
        px: 0.5,
      }}
    >
      {items.map((item) => (
        <Box key={item.label} sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
          <Box
            sx={{
              width: dense ? 10 : 12,
              height: dense ? 10 : 12,
              bgcolor: item.color,
              flexShrink: 0,
              borderRadius: '2px',
            }}
          />
          <Typography sx={{ fontSize: dense ? 10 : 11, color: '#1E232E', lineHeight: 1.2 }}>{item.label}</Typography>
        </Box>
      ))}
    </Box>
  );
}
