import { useMemo } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { ChartPanel } from './ChartPanel';
import { EV_CHART_COLORS } from '../../fixtures';

const NO_STROKE = { fontSize: '10px', fontWeight: 'normal', textOutline: 'none', textShadow: false };

/** EV Ownership Trend — mint columns + purple line (AWB EV Analytics). */
export function EvMonthlyOwnershipCombo({
  title,
  categories,
  consumptionMwh,
  evCounts,
  height = 360,
}) {
  const options = useMemo(
    () => ({
      chart: { height, backgroundColor: 'transparent' },
      credits: { enabled: false },
      title: { text: null },
      exporting: { enabled: false },
      xAxis: { categories, labels: { style: { fontSize: '11px' } } },
      yAxis: [
        {
          title: { text: 'Total Consumption EV', style: { fontSize: '11px' } },
          labels: { format: '{value}', style: { fontSize: '10px' } },
          min: 0,
        },
        {
          title: { text: 'EV Counts', style: { fontSize: '11px' } },
          opposite: true,
          labels: { format: '{value}', style: { fontSize: '10px' } },
          min: 0,
        },
      ],
      legend: { itemStyle: { fontSize: '11px' } },
      plotOptions: {
        column: {
          color: EV_CHART_COLORS.fill,
          dataLabels: {
            enabled: true,
            formatter() {
              return `${this.y.toFixed(1)} MWh`;
            },
            backgroundColor: 'transparent',
            borderWidth: 0,
            shadow: false,
            style: { ...NO_STROKE, color: EV_CHART_COLORS.dataLabelGreen },
          },
        },
        line: {
          color: '#8B5CF6',
          dataLabels: {
            enabled: true,
            formatter() {
              return `${this.y}`;
            },
            backgroundColor: 'transparent',
            borderWidth: 0,
            shadow: false,
            style: { ...NO_STROKE, color: '#7c3aed' },
          },
          marker: { enabled: true, radius: 3, fillColor: '#8B5CF6' },
        },
      },
      series: [
        { type: 'column', name: 'Total Consumption EV', yAxis: 0, data: consumptionMwh },
        { type: 'line', name: 'EV Counts', yAxis: 1, data: evCounts },
      ],
    }),
    [categories, consumptionMwh, evCounts, height]
  );

  return (
    <ChartPanel title={title} minHeight={height + 80}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </ChartPanel>
  );
}
