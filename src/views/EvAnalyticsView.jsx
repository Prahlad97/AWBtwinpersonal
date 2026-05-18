import { DashboardGrid } from '../components/charts/ChartPanel';
import { BarChart } from '../components/charts/BarChart';
import { HeatmapChart } from '../components/charts/HeatmapChart';
import { EvAdoptionChart } from '../components/charts/EvAdoptionChart';
import { EvMonthlyOwnershipCombo } from '../components/charts/EvMonthlyOwnershipCombo';
import { EvGridImpactDashboard } from '../components/ev/EvGridImpactDashboard';
import {
  evChargerAmplitudeBars,
  evChargingDurationBars,
  evChargingFrequencyBars,
  evChargingHeatmap,
  evHourlyConsumptionBars,
  evMonthlyOwnershipTrend,
} from '../fixtures';

/** EV Home — hourly consumption, ownership trend, charger amplitude (Bidgely EV landing). */
function EvHomeDashboard() {
  return (
    <DashboardGrid
      rows={[
        { columns: '1fr', cells: [<BarChart key="hr" {...evHourlyConsumptionBars} height={320} />] },
        {
          columns: '1fr',
          cells: [<EvMonthlyOwnershipCombo key="mo" {...evMonthlyOwnershipTrend} />],
        },
        { columns: '1fr', cells: [<BarChart key="amp" {...evChargerAmplitudeBars} height={300} />] },
      ]}
    />
  );
}

/** EV Charging Behavior — frequency, duration histogram, pattern heatmap (Figma AWB-Official 8-3060). */
function EvChargingBehaviorDashboard() {
  return (
    <DashboardGrid
      rows={[
        { columns: '1fr', cells: [<BarChart key="freq" {...evChargingFrequencyBars} height={280} />] },
        { columns: '1fr', cells: [<BarChart key="dur" {...evChargingDurationBars} height={320} />] },
        {
          columns: '1fr',
          cells: [
            <HeatmapChart
              key="hm"
              title={evChargingHeatmap.title}
              columnCategories={evChargingHeatmap.columnCategories}
              rowCategories={evChargingHeatmap.rowCategories}
              data={evChargingHeatmap.data}
              height={520}
            />,
          ],
        },
      ]}
    />
  );
}

export function EvAnalyticsView({ subId }) {
  if (subId === 'HOME') {
    return <EvHomeDashboard />;
  }

  if (subId === 'CHARGING_BEHAVIOR') {
    return <EvChargingBehaviorDashboard />;
  }

  if (subId === 'EV_ADOPTION') {
    return (
      <DashboardGrid
        rows={[{ columns: '1fr', cells: [<EvAdoptionChart key="adoption" />] }]}
      />
    );
  }

  if (subId === 'EV_GRID_IMPACT') {
    return <EvGridImpactDashboard />;
  }

  return null;
}
