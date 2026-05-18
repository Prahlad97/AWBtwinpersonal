import { useState } from 'react';
import { Box } from '@mui/material';
import { DashboardGrid } from '../components/charts/ChartPanel';
import { DonutChart } from '../components/charts/DonutChart';
import { Disaggregated8760Chart } from '../components/grid/Disaggregated8760Chart';
import { Gross8760Chart } from '../components/grid/Gross8760Chart';
import { GridAssetsDashboard } from '../components/grid/GridAssetsDashboard';
import { GridPeakDemandChart } from '../components/grid/GridPeakDemandChart';
import { GridPeakStackedChart } from '../components/grid/GridPeakStackedChart';
import { Nwa8760Toolbar } from '../components/grid/Nwa8760Toolbar';
import { placeholderDonut } from '../fixtures';

function PlaceholderTile({ title }) {
  const data = placeholderDonut(title);
  return <DonutChart title={data.title} slices={data.slices} variant="tile" />;
}

/** Grid Asset Home — 8760 gross + disaggregated demand (production default landing). */
function GridAssetsHome() {
  const [tempScale, setTempScale] = useState('C');

  return (
    <Box sx={{ width: '100%' }}>
      <Nwa8760Toolbar tempScale={tempScale} onTempScaleChange={setTempScale} />
      <DashboardGrid
        rows={[
          { columns: '1fr', cells: [<Gross8760Chart key="gross" tempScale={tempScale} />] },
          { columns: '1fr', cells: [<Disaggregated8760Chart key="disagg" tempScale={tempScale} />] },
        ]}
      />
    </Box>
  );
}

/** Grid Peak — 8760 hours ranked highest → lowest demand (load duration curve). */
function GridPeakDashboard() {
  return (
    <Box sx={{ width: '100%' }}>
      <Nwa8760Toolbar tempScale="C" onTempScaleChange={() => {}} />
      <DashboardGrid
        rows={[
          { columns: '1fr', cells: [<GridPeakDemandChart key="ldc" />] },
          { columns: '1fr', cells: [<GridPeakStackedChart key="stack" />] },
        ]}
      />
    </Box>
  );
}

function NwaPlaceholder() {
  return (
    <DashboardGrid
      rows={[
        {
          columns: '1fr 1fr',
          cells: [
            <PlaceholderTile key="1" title="NWA — Program Overview" />,
            <PlaceholderTile key="2" title="NWA — Forecast" />,
          ],
        },
      ]}
    />
  );
}

export function GridAssetsView({ subId }) {
  switch (subId) {
    case 'HOME':
      return <GridAssetsHome />;
    case 'GRID_PEAK':
      return <GridPeakDashboard />;
    case 'ASSETS':
      return <GridAssetsDashboard />;
    case 'NWA':
      return <NwaPlaceholder />;
    default:
      return <GridAssetsHome />;
  }
}
