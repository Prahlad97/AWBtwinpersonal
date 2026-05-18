import { DashboardGrid } from '../../components/charts/ChartPanel';
import { DonutChart } from '../../components/charts/DonutChart';
import {
  CUSTOM_HOME_CHART_TITLES,
  customHomeOverviewColors,
  customHomeOverviewSlices,
} from '../../fixtures/customCharts';

export function CustomHomeDashboard() {
  return (
    <DashboardGrid
      rows={[
        {
          columns: 'repeat(3, minmax(0, 1fr))',
          cells: CUSTOM_HOME_CHART_TITLES.map((title) => (
            <DonutChart
              key={title}
              title={title}
              slices={customHomeOverviewSlices}
              colors={customHomeOverviewColors}
              variant="tile"
              showInfoIcon
            />
          )),
        },
      ]}
    />
  );
}
