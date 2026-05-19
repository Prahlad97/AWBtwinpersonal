import { useState } from 'react';
import { Box } from '@mui/material';
import { DashboardGrid } from '../components/charts/ChartPanel';
import { DonutChart } from '../components/charts/DonutChart';
import { Disaggregated8760Chart } from '../components/grid/Disaggregated8760Chart';
import { Gross8760Chart } from '../components/grid/Gross8760Chart';
import { GridAssetsDashboard } from '../components/grid/GridAssetsDashboard';
import { GridAssetsLoadingPanel } from '../components/grid/GridAssetsLoadingPanel';
import { GridPeakDemandChart } from '../components/grid/GridPeakDemandChart';
import { GridPeakStackedChart } from '../components/grid/GridPeakStackedChart';
import { Nwa8760Toolbar } from '../components/grid/Nwa8760Toolbar';
import { useGridAssetsLoadGate } from '../hooks/useGridAssetsLoadGate';
import { placeholderDonut } from '../fixtures';

function PlaceholderTile({ title }) {
  const data = placeholderDonut(title);
  return <DonutChart title={data.title} slices={data.slices} variant="tile" />;
}

/** Grid Asset Home — 8760 gross + disaggregated demand (production default landing). */
function GridAssetsHome({ onChartLoad, mountCharts }) {
  const [tempScale, setTempScale] = useState('C');

  return (
    <Box sx={{ width: '100%' }}>
      <Nwa8760Toolbar tempScale={tempScale} onTempScaleChange={setTempScale} />
      {mountCharts ? (
        <DashboardGrid
          rows={[
            {
              columns: '1fr',
              cells: [<Gross8760Chart key="gross" tempScale={tempScale} onChartLoad={onChartLoad} />],
            },
            {
              columns: '1fr',
              cells: [<Disaggregated8760Chart key="disagg" tempScale={tempScale} onChartLoad={onChartLoad} />],
            },
          ]}
        />
      ) : null}
    </Box>
  );
}

/** Grid Peak — 8760 hours ranked highest → lowest demand (load duration curve). */
function GridPeakDashboard({ onChartLoad, mountCharts }) {
  return (
    <Box sx={{ width: '100%' }}>
      <Nwa8760Toolbar tempScale="C" onTempScaleChange={() => {}} />
      {mountCharts ? (
        <DashboardGrid
          rows={[
            { columns: '1fr', cells: [<GridPeakDemandChart key="ldc" onChartLoad={onChartLoad} />] },
            { columns: '1fr', cells: [<GridPeakStackedChart key="stack" onChartLoad={onChartLoad} />] },
          ]}
        />
      ) : null}
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

function GridAssetsBody({ subId, mountCharts, onChartLoad }) {
  switch (subId) {
    case 'HOME':
      return <GridAssetsHome mountCharts={mountCharts} onChartLoad={onChartLoad} />;
    case 'GRID_PEAK':
      return <GridPeakDashboard mountCharts={mountCharts} onChartLoad={onChartLoad} />;
    case 'ASSETS':
      return <GridAssetsDashboard />;
    case 'NWA':
      return <NwaPlaceholder />;
    default:
      return <GridAssetsHome mountCharts={mountCharts} onChartLoad={onChartLoad} />;
  }
}

export function GridAssetsView({ subId }) {
  const { mountCharts, showLoader, onChartLoad } = useGridAssetsLoadGate(subId);

  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      {showLoader ? (
        <Box sx={{ position: 'absolute', inset: 0, zIndex: 2 }}>
          <GridAssetsLoadingPanel subId={subId} />
        </Box>
      ) : null}
      <Box
        sx={{
          visibility: showLoader ? 'hidden' : 'visible',
          pointerEvents: showLoader ? 'none' : 'auto',
        }}
        aria-hidden={showLoader}
      >
        <GridAssetsBody subId={subId} mountCharts={mountCharts} onChartLoad={onChartLoad} />
      </Box>
    </Box>
  );
}
