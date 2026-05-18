import { useParams } from 'react-router-dom';
import { DonutChart } from '../components/charts/DonutChart';
import { BarChart } from '../components/charts/BarChart';
import { StackedBarChart } from '../components/charts/StackedBarChart';
import { DashboardGrid } from '../components/charts/ChartPanel';
import {
  consumptionDecileBars,
  consumptionHistogramBars,
  dailyStackedSeries,
  DAILY_CATEGORIES,
  hourlyStackedSeries,
  HOURLY_CATEGORIES,
  loadStackedSeries,
  loadTypeDonut,
  MONTHS,
  weekdayStackedSeries,
  WEEKDAY_CATEGORIES,
} from '../fixtures';
import { PlaceholderDashboard } from './PlaceholderDashboard';

export function LoadResearchDashboard() {
  const { subtab } = useParams();

  if (subtab === 'consumption-bucket') {
    return (
      <DashboardGrid
        rows={[
          {
            columns: '1fr',
            cells: [
              <BarChart
                key="dec"
                title={consumptionDecileBars.title}
                categories={consumptionDecileBars.categories}
                values={consumptionDecileBars.values}
                yAxisTitle={consumptionDecileBars.yAxisTitle}
                valueSuffix={consumptionDecileBars.valueSuffix}
              />,
            ],
          },
          {
            columns: '1fr',
            cells: [
              <BarChart
                key="hist"
                title={consumptionHistogramBars.title}
                categories={consumptionHistogramBars.categories}
                values={consumptionHistogramBars.values}
                yAxisTitle={consumptionHistogramBars.yAxisTitle}
                labelColor="#1E232E"
              />,
            ],
          },
        ]}
      />
    );
  }

  if (subtab === 'program-simulation') {
    return <PlaceholderDashboard tabName="Program Simulation" tileCount={2} />;
  }

  return (
    <DashboardGrid
      rows={[
        {
          columns: 'minmax(280px, 1fr) 2fr',
          cells: [
            <DonutChart key="lt" {...loadTypeDonut} colors={loadTypeDonut.colors} />,
            <StackedBarChart key="mo" title="Monthly Usage" categories={MONTHS} series={loadStackedSeries} height={300} />,
          ],
        },
        {
          columns: '1fr',
          cells: [
            <StackedBarChart key="da" title="Daily Usage" categories={DAILY_CATEGORIES} series={dailyStackedSeries} height={260} />,
          ],
        },
        {
          columns: '1fr',
          cells: [
            <StackedBarChart key="hr" title="Hourly Usage" categories={HOURLY_CATEGORIES} series={hourlyStackedSeries} height={260} />,
          ],
        },
        {
          columns: '1fr',
          cells: [
            <StackedBarChart
              key="wd"
              title="Day Of the Week"
              categories={WEEKDAY_CATEGORIES}
              series={weekdayStackedSeries}
              height={260}
            />,
          ],
        },
      ]}
    />
  );
}
