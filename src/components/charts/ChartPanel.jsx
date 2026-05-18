import { Box, Typography } from '@mui/material';
import { chrome } from '../../theme';

export function ChartPanel({ title, children, minHeight = 320 }) {
  return (
    <Box
      sx={{
        border: `1px solid ${chrome.border}`,
        borderRadius: '4px',
        bgcolor: chrome.panelBg,
        p: '16px 12px 8px',
        minHeight,
        height: '100%',
      }}
    >
      {title ? (
        <Typography
          sx={{
            fontSize: 14,
            fontWeight: 600,
            color: '#1E232E',
            textAlign: 'center',
            mb: 1,
          }}
        >
          {title}
        </Typography>
      ) : null}
      {children}
    </Box>
  );
}

export function DashboardGrid({ rows }) {
  return (
    <Box sx={{ py: 1, width: '100%' }}>
      {rows.map((row, i) => (
        <Box
          key={i}
          sx={{
            display: 'grid',
            gap: 2,
            mb: 2,
            gridTemplateColumns: row.columns,
          }}
        >
          {row.cells}
        </Box>
      ))}
    </Box>
  );
}
