import { useMemo } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { ChartPanel } from './ChartPanel';

export function StackedBarChart({ title, categories, series, height = 280, yAxisTitle = 'Usage' }) {
  const options = useMemo(
    () => ({
      chart: { type: 'column', height, backgroundColor: 'transparent' },
      credits: { enabled: false },
      title: { text: null },
      exporting: { enabled: false },
      xAxis: { categories, labels: { style: { fontSize: '10px' } } },
      yAxis: { min: 0, title: { text: yAxisTitle, style: { fontSize: '11px' } } },
      legend: { enabled: true, itemStyle: { fontSize: '10px' } },
      plotOptions: { column: { stacking: 'normal', dataLabels: { enabled: false } } },
      series: series.map((s) => ({ name: s.name, data: s.data, color: s.color })),
    }),
    [categories, series, height, yAxisTitle]
  );

  return (
    <ChartPanel title={title} minHeight={height + 60}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </ChartPanel>
  );
}
