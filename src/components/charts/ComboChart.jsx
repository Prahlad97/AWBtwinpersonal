import { useMemo } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { ChartPanel } from './ChartPanel';

const NO_STROKE = { fontSize: '9px', fontWeight: 'normal', textOutline: 'none', textShadow: false };

export function ComboChart({ title, categories, blockGroups, accounts }) {
  const options = useMemo(
    () => ({
      chart: { height: 360, backgroundColor: 'transparent' },
      credits: { enabled: false },
      title: { text: null },
      exporting: { enabled: false },
      xAxis: { categories, labels: { rotation: -40, style: { fontSize: '9px' } } },
      yAxis: [
        { title: { text: 'Count of Census Block Groups', style: { fontSize: '10px' } }, min: 0 },
        { title: { text: 'Count of Accounts', style: { fontSize: '10px' } }, opposite: true, min: 0 },
      ],
      legend: { itemStyle: { fontSize: '11px' } },
      plotOptions: {
        column: {
          dataLabels: {
            enabled: true,
            backgroundColor: 'transparent',
            borderWidth: 0,
            shadow: false,
            style: { ...NO_STROKE, color: '#fff' },
          },
          color: '#5B9AA0',
        },
        line: {
          dataLabels: {
            enabled: true,
            backgroundColor: 'transparent',
            borderWidth: 0,
            shadow: false,
            style: { ...NO_STROKE, color: '#C75B5B' },
          },
          color: '#C75B5B',
          marker: { enabled: true, radius: 3 },
        },
      },
      series: [
        { name: 'Count of Census Block Groups', type: 'column', yAxis: 0, data: blockGroups },
        { name: 'Count of Accounts', type: 'line', yAxis: 1, data: accounts },
      ],
    }),
    [categories, blockGroups, accounts]
  );

  return (
    <ChartPanel title={title} minHeight={400}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </ChartPanel>
  );
}
