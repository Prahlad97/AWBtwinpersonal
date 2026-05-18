import { useMemo } from 'react';
import Highcharts from 'highcharts';
import HeatmapModule from 'highcharts/modules/heatmap';
import HighchartsReact from 'highcharts-react-official';
import { ChartPanel } from './ChartPanel';

HeatmapModule(Highcharts);

const LABEL = { fontSize: '10px', fontWeight: 'normal', textOutline: 'none', textShadow: false };

export function HeatmapChart({ title, columnCategories, rowCategories, data, height = 420 }) {
  const options = useMemo(
    () => ({
      chart: { type: 'heatmap', height, backgroundColor: 'transparent' },
      credits: { enabled: false },
      title: { text: null },
      exporting: { enabled: false },
      xAxis: {
        categories: columnCategories,
        opposite: true,
        labels: { style: { fontSize: '11px' } },
      },
      yAxis: {
        categories: rowCategories,
        title: null,
        reversed: true,
        labels: { style: { fontSize: '9px' } },
      },
      colorAxis: {
        min: 0,
        minColor: '#E0F2FE',
        maxColor: '#5B21B6',
      },
      legend: {
        align: 'right',
        layout: 'vertical',
        verticalAlign: 'top',
        symbolHeight: 180,
      },
      tooltip: {
        formatter() {
          const day = columnCategories[this.point.x];
          const hour = rowCategories[this.point.y];
          return `<b>${day}</b><br/>${hour}<br/><b>${this.point.value}</b> sessions`;
        },
      },
      series: [
        {
          name: 'Sessions',
          borderWidth: 0.5,
          borderColor: '#fff',
          data,
          dataLabels: {
            enabled: true,
            style: { ...LABEL, color: '#1E232E', fontSize: '8px' },
          },
        },
      ],
    }),
    [columnCategories, rowCategories, data, height]
  );

  return (
    <ChartPanel title={title} minHeight={height + 48}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </ChartPanel>
  );
}
