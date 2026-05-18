import { useMemo, useState } from 'react';
import { Typography } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { ChartPanel } from '../charts/ChartPanel';
import { GROSS_DEMAND_8760, celsiusToFahrenheit } from '../../fixtures/gridNwa8760';
import { nwa8760ChartBase, nwa8760Tooltip, nwa8760XAxis, NWA_SERIES_PERF } from './nwaChartOptions';

function toSeriesData(timestamps, values) {
  return timestamps.map((t, i) => [t, values[i]]);
}

export function Gross8760Chart({ tempScale = 'C', height = 340 }) {
  const [zoomCaption, setZoomCaption] = useState(null);

  const options = useMemo(() => {
    const { timestamps, demand, tempC } = GROSS_DEMAND_8760;
    const temp =
      tempScale === 'F' ? tempC.map((c) => Math.round(celsiusToFahrenheit(c) * 10) / 10) : tempC;
    const tempMin = tempScale === 'F' ? 10 : 20;
    const tempMax = tempScale === 'F' ? 100 : 80;
    const tempTitle = tempScale === 'F' ? '°F' : '°C';

    return {
      chart: nwa8760ChartBase(height, setZoomCaption),
      credits: { enabled: false },
      title: { text: null },
      exporting: { enabled: false },
      time: { useUTC: true },
      xAxis: nwa8760XAxis(setZoomCaption),
      yAxis: [
        {
          title: { text: 'Gross & Net Demand', style: { fontSize: '11px', color: '#1E232E' } },
          labels: { format: '{value} MWh', style: { fontSize: '10px' } },
          min: 0,
          max: 500,
          gridLineColor: '#e8ecf2',
        },
        {
          title: { text: `Temperature (${tempTitle})`, style: { fontSize: '11px', color: '#1E232E' } },
          labels: { format: `{value}${tempTitle}`, style: { fontSize: '10px' } },
          opposite: true,
          min: tempMin,
          max: tempMax,
          gridLineWidth: 0,
        },
      ],
      tooltip: nwa8760Tooltip,
      legend: { enabled: true, itemStyle: { fontSize: '11px' } },
      plotOptions: {
        series: NWA_SERIES_PERF,
        area: { fillOpacity: 0.52, lineWidth: 0.6, marker: { enabled: false } },
        line: { marker: { enabled: false }, lineWidth: 1.5 },
      },
      series: [
        {
          name: 'Gross & Net Demand',
          type: 'area',
          yAxis: 0,
          data: toSeriesData(timestamps, demand),
          color: '#4A7FC1',
          fillColor: {
            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
            stops: [
              [0, 'rgba(74, 127, 193, 0.75)'],
              [1, 'rgba(74, 127, 193, 0.08)'],
            ],
          },
          zIndex: 1,
        },
        {
          name: 'Temperature',
          type: 'line',
          yAxis: 1,
          data: toSeriesData(timestamps, temp),
          color: '#1E232E',
          zIndex: 2,
        },
      ],
    };
  }, [tempScale, height]);

  return (
    <ChartPanel title="8760 Demand Chart (Total Usage)" minHeight={height + 56}>
      {zoomCaption ? (
        <Typography sx={{ fontSize: 11, color: '#6b7280', textAlign: 'center', mb: 0.5 }}>
          {zoomCaption}
        </Typography>
      ) : null}
      <HighchartsReact highcharts={Highcharts} options={options} />
    </ChartPanel>
  );
}
