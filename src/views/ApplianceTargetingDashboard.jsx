import { DonutChart } from '../components/charts/DonutChart';
import { BarChart } from '../components/charts/BarChart';
import { DashboardGrid } from '../components/charts/ChartPanel';
import {
  coolingEfficiencyDonut,
  currentOwnershipBars,
  heatingEfficiencyDonut,
  heatingFuelDonut,
  poolPumpAmplitudeDonut,
  poolPumpRunsDonut,
  poolPumpTypeDonut,
  solarCapacityBars,
  waterHeaterRatingDonut,
  waterHeaterRunsDonut,
  waterHeaterTypeDonut,
} from '../fixtures';

const compact = { variant: 'compact' };

export function ApplianceTargetingDashboard() {
  return (
    <DashboardGrid
      rows={[
        {
          columns: '1fr',
          cells: [
            <BarChart
              key="own"
              title={currentOwnershipBars.title}
              categories={currentOwnershipBars.categories}
              values={currentOwnershipBars.values}
              yAxisTitle="Accounts"
              colors={currentOwnershipBars.colors}
            />,
          ],
        },
        {
          columns: 'repeat(3, minmax(0, 1fr))',
          cells: [
            <DonutChart key="hf" {...compact} {...heatingFuelDonut} />,
            <DonutChart key="he" {...compact} {...heatingEfficiencyDonut} />,
            <DonutChart key="ce" {...compact} {...coolingEfficiencyDonut} />,
            <DonutChart key="pt" {...compact} {...poolPumpTypeDonut} />,
            <DonutChart key="pa" {...compact} {...poolPumpAmplitudeDonut} />,
            <DonutChart key="pr" {...compact} {...poolPumpRunsDonut} />,
            <DonutChart key="wt" {...compact} {...waterHeaterTypeDonut} />,
            <DonutChart key="wr" {...compact} {...waterHeaterRatingDonut} />,
            <DonutChart key="wrun" {...compact} {...waterHeaterRunsDonut} />,
          ],
        },
        {
          columns: '1fr',
          cells: [
            <BarChart
              key="sol"
              title={solarCapacityBars.title}
              categories={solarCapacityBars.categories}
              values={solarCapacityBars.values}
              yAxisTitle={solarCapacityBars.yAxisTitle}
              color="#5B9AA0"
            />,
          ],
        },
      ]}
    />
  );
}
