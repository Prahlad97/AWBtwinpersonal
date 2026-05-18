import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { getSubtab, getTabByRoute } from '../config/tabs';
import { MAP_VIEW } from '../config/mapView';
import { useMapView } from '../context/MapViewContext';
import { MapSplitLayout } from '../components/map/MapSplitLayout';
import { DashboardGrid } from '../components/charts/ChartPanel';
import { DonutChart } from '../components/charts/DonutChart';
import { BarChart } from '../components/charts/BarChart';
import { StackedBarChart } from '../components/charts/StackedBarChart';
import { ComboChart } from '../components/charts/ComboChart';
import { ChartLegendStrip } from '../components/charts/ChartLegendStrip';
import { EvAnalyticsView } from './EvAnalyticsView';
import {
  annualClusterDonut,
  APPLIANCE_TOOLBAR_LEGEND,
  censusIncomeCombo,
  consumptionDecileBars,
  consumptionHistogramBars,
  coolingEfficiencyDonut,
  currentOwnershipBars,
  dailyClusterDonut,
  DAILY_CATEGORIES,
  dailyStackedSeries,
  heatingEfficiencyDonut,
  heatingFuelDonut,
  homeOwnershipDonut,
  homeSizeBars,
  homeTypeDonut,
  HOURLY_CATEGORIES,
  hourlyStackedSeries,
  loadStackedSeries,
  loadTypeDonut,
  MONTHS,
  placeholderDonut,
  poolPumpAmplitudeDonut,
  poolPumpRunsDonut,
  poolPumpTypeDonut,
  premiseYearBuiltBars,
  ratePlanDonut,
  seasonalClusterDonut,
  solarCapacityBars,
  waterHeaterRatingDonut,
  waterHeaterRunsDonut,
  waterHeaterTypeDonut,
  WEEKDAY_CATEGORIES,
  weekdayStackedSeries,
} from '../fixtures';

function PlaceholderTile({ title }) {
  const data = placeholderDonut(title);
  return <DonutChart title={data.title} slices={data.slices} variant="tile" />;
}

function AccountView({ subId }) {
  if (subId === 'LIFESTYLE_PROFILE') {
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

function PremiseView() {
  return (
    <DashboardGrid
      rows={[
        {
          columns: 'repeat(3, minmax(0, 1fr))',
          cells: [
            <DonutChart key="ht" {...homeTypeDonut} />,
            <BarChart key="hs" {...homeSizeBars} />,
            <DonutChart key="ho" {...homeOwnershipDonut} />,
          ],
        },
        {
          columns: '1fr',
          cells: [<BarChart key="yb" {...premiseYearBuiltBars} />],
        },
      ]}
    />
  );
}

function ApplianceView() {
  const compact = { variant: 'compact' };
  return (
    <DashboardGrid
      rows={[
        {
          columns: '1fr',
          cells: [
            <Box key="palette" sx={{ bgcolor: '#fff', py: 1.25, px: 1 }}>
              <ChartLegendStrip items={APPLIANCE_TOOLBAR_LEGEND} />
            </Box>,
          ],
        },
        {
          columns: '1fr',
          cells: [<BarChart key="co" {...currentOwnershipBars} />],
        },
        {
          columns: 'repeat(3, minmax(0, 1fr))',
          cells: [
            <DonutChart key="1" {...heatingFuelDonut} {...compact} />,
            <DonutChart key="2" {...heatingEfficiencyDonut} {...compact} />,
            <DonutChart key="3" {...coolingEfficiencyDonut} {...compact} />,
            <DonutChart key="4" {...poolPumpTypeDonut} {...compact} />,
            <DonutChart key="5" {...poolPumpAmplitudeDonut} {...compact} />,
            <DonutChart key="6" {...poolPumpRunsDonut} {...compact} />,
            <DonutChart key="7" {...waterHeaterTypeDonut} {...compact} />,
            <DonutChart key="8" {...waterHeaterRatingDonut} {...compact} />,
            <DonutChart key="9" {...waterHeaterRunsDonut} {...compact} />,
          ],
        },
        { columns: '1fr', cells: [<BarChart key="sc" {...solarCapacityBars} />] },
      ]}
    />
  );
}

function LoadResearchView({ subId }) {
  if (subId === 'CONSUMPTION_BUCKET') {
    return (
      <DashboardGrid
        rows={[
          {
            columns: '1fr',
            cells: [
              <BarChart key="dec" {...consumptionDecileBars} />,
            ],
          },
          {
            columns: '1fr',
            cells: [<BarChart key="hist" {...consumptionHistogramBars} />],
          },
        ]}
      />
    );
  }
  return (
    <DashboardGrid
      rows={[
        {
          columns: 'minmax(280px, 1fr) 2fr',
          cells: [
            <DonutChart key="lt" {...loadTypeDonut} colors={loadTypeDonut.colors} />,
            <StackedBarChart key="mo" title="Monthly Usage" categories={MONTHS} series={loadStackedSeries} />,
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

function PlaceholderTab({ tabName }) {
  return (
    <DashboardGrid
      rows={[
        {
          columns: 'repeat(3, minmax(0, 1fr))',
          cells: [
            <PlaceholderTile key="1" title={`${tabName} — Chart A`} />,
            <PlaceholderTile key="2" title={`${tabName} — Chart B`} />,
            <PlaceholderTile key="3" title={`${tabName} — Chart C`} />,
          ],
        },
      ]}
    />
  );
}

export function DashboardContent() {
  const { tab, subtab } = useParams();
  const currentTab = getTabByRoute(tab);
  const currentSub = getSubtab(currentTab, subtab);
  const subId = currentSub?.id || 'HOME';
  const { actions: mapActions } = useMapView();

  useEffect(() => {
    mapActions.setView(MAP_VIEW.ANALYSIS);
  }, [currentTab.id, mapActions]);

  let body = null;
  switch (currentTab.id) {
    case 'ACCOUNT':
      body = <AccountView subId={subId} />;
      break;
    case 'PREMISE':
      body = <PremiseView />;
      break;
    case 'APPLIANCE_TARGETING':
      body = <ApplianceView />;
      break;
    case 'LOAD_RESEARCH':
      body = <LoadResearchView subId={subId} />;
      break;
    case 'EV_ANALYTICS':
      body = <EvAnalyticsView subId={subId} />;
      break;
    default:
      body = <PlaceholderTab tabName={currentTab.name} />;
  }

  return (
    <Box sx={{ px: 2, pb: 3 }}>
      <MapSplitLayout>{body}</MapSplitLayout>
      <Typography sx={{ fontSize: 11, color: '#9aa5b4', mt: 2, textAlign: 'right' }}>
        Analytics Lab · fixture data
      </Typography>
    </Box>
  );
}
