import { Box, Typography } from '@mui/material';
import { DonutChart } from '../components/charts/DonutChart';
import { DashboardGrid } from '../components/charts/ChartPanel';
import { placeholderDonut } from '../fixtures';

export function PlaceholderDashboard({ tabName, tileCount = 3 }) {
  const tiles = Array.from({ length: tileCount }, (_, i) => placeholderDonut(`${tabName} chart ${i + 1}`));
  return (
    <Box>
      <Typography sx={{ fontSize: 12, color: '#5c6b7a', mb: 2 }}>
        Fixture data pending — placeholder tiles styled like preprod.
      </Typography>
      <DashboardGrid
        rows={[
          {
            columns: `repeat(${Math.min(tileCount, 3)}, minmax(0, 1fr))`,
            cells: tiles.map((t) => <DonutChart key={t.title} title={t.title} slices={t.slices} variant="compact" />),
          },
        ]}
      />
    </Box>
  );
}
