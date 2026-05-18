import { useParams } from 'react-router-dom';
import { DonutChart } from '../components/charts/DonutChart';
import { ComboChart } from '../components/charts/ComboChart';
import { DashboardGrid } from '../components/charts/ChartPanel';
import {
  annualClusterDonut,
  censusIncomeCombo,
  dailyClusterDonut,
  ratePlanDonut,
  seasonalClusterDonut,
} from '../fixtures';

export function AccountDashboard() {
  const { subtab } = useParams();
  const isLifestyle = subtab === 'lifestyle-profile';

  if (isLifestyle) {
    return (
      <DashboardGrid
        rows={[
          {
            columns: 'repeat(3, minmax(0, 1fr))',
            cells: [
              <DonutChart key="a" {...annualClusterDonut} />,
              <DonutChart key="s" {...seasonalClusterDonut} />,
              <DonutChart key="d" {...dailyClusterDonut} />,
            ],
          },
        ]}
      />
    );
  }

  return (
    <DashboardGrid
      rows={[
        { columns: '1fr', cells: [<DonutChart key="rp" {...ratePlanDonut} variant="wide" />] },
        {
          columns: '1fr',
          cells: [
            <ComboChart
              key="income"
              title={censusIncomeCombo.title}
              categories={censusIncomeCombo.categories}
              blockGroups={censusIncomeCombo.blockGroups}
              accounts={censusIncomeCombo.accounts}
            />,
          ],
        },
      ]}
    />
  );
}
