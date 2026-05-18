import { DonutChart } from '../components/charts/DonutChart';
import { BarChart } from '../components/charts/BarChart';
import { DashboardGrid } from '../components/charts/ChartPanel';
import { homeOwnershipDonut, homeSizeBars, homeTypeDonut, premiseYearBuiltBars } from '../fixtures';

export function PremiseDashboard() {
  return (
    <DashboardGrid
      rows={[
        {
          columns: 'repeat(3, minmax(0, 1fr))',
          cells: [
            <DonutChart key="ht" {...homeTypeDonut} />,
            <BarChart
              key="hs"
              title={homeSizeBars.title}
              categories={homeSizeBars.categories}
              values={homeSizeBars.values}
              yAxisTitle={homeSizeBars.yAxisTitle}
            />,
            <DonutChart key="ho" {...homeOwnershipDonut} />,
          ],
        },
        {
          columns: '1fr',
          cells: [
            <BarChart
              key="yb"
              title={premiseYearBuiltBars.title}
              categories={premiseYearBuiltBars.categories}
              values={premiseYearBuiltBars.values}
              yAxisTitle={premiseYearBuiltBars.yAxisTitle}
              color="#5B9AA0"
            />,
          ],
        },
      ]}
    />
  );
}
