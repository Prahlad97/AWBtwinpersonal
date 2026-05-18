import { useMemo, useState } from 'react';
import { Typography } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { ChartPanel } from '../charts/ChartPanel';
import { DISAGG_DEMAND_8760, celsiusToFahrenheit } from '../../fixtures/gridNwa8760';
import { nwa8760ChartBase, nwa8760Tooltip, nwa8760XAxis, NWA_SERIES_PERF } from './nwaChartOptions';

function toSeriesData(timestamps, values) {
  return timestamps.map((t, i) => [t, values[i]]);
}

export function Disaggregated8760Chart({ tempScale = 'C', height = 340 }) {
  const [zoomCaption, setZoomCaption] = useState(null);

  const options = useMemo(() => {
    const { timestamps, layers, layerMeta, total, tempC } = DISAGG_DEMAND_8760;
    const temp =
      tempScale === 'F' ? tempC.map((c) => Math.round(celsiusToFahrenheit(c) * 10) / 10) : tempC;
    const tempMin = tempScale === 'F' ? 10 : 20;
    const tempMax = tempScale === 'F' ? 100 : 80;
    const tempTitle = tempScale === 'F' ? '°F' : '°C';

    const stackSeries = layerMeta.map((meta) => ({
      name: meta.name,
      type: 'area',
      yAxis: 0,
      stacking: 'normal',
      data: toSeriesData(timestamps, layers[meta.key]),
      color: meta.color,
      fillOpacity: meta.key === 'solar' ? 0.88 : 0.78,
      lineWidth: 0.6,
      marker: { enabled: false },
      zIndex: 1,
    }));

    return {
      chart: nwa8760ChartBase(height, setZoomCaption),
      credits: { enabled: false },
      title: { text: null },
      exporting: { enabled: false },
      time: { useUTC: true },
      xAxis: nwa8760XAxis(setZoomCaption),
      yAxis: [
        {
          title: { text: 'Total Demand', style: { fontSize: '11px', color: '#1E232E' } },
          labels: { format: '{value}', style: { fontSize: '10px' } },
          min: -8,
          max: 60,
          gridLineColor: '#e8ecf2',
          plotLines: [{ value: 0, color: '#9aa5b4', width: 1 }],
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
      legend: { enabled: true, itemStyle: { fontSize: '10px' } },
      plotOptions: {
        series: NWA_SERIES_PERF,
        area: { marker: { enabled: false }, lineWidth: 0.6 },
        line: { marker: { enabled: false } },
      },
      series: [
        ...stackSeries,
        {
          name: 'Total Demand',
          type: 'line',
          yAxis: 0,
          data: toSeriesData(timestamps, total),
          color: '#1E232E',
          lineWidth: 1.25,
          zIndex: 5,
          enableMouseTracking: false,
        },
        {
          name: 'Temperature',
          type: 'line',
          yAxis: 1,
          data: toSeriesData(timestamps, temp),
          color: '#1E232E',
          lineWidth: 1.5,
          zIndex: 6,
        },
      ],
    };
  }, [tempScale, height]);

  return (
    <ChartPanel title="8760 Disaggregated Demand Curve (Total Demand)" minHeight={height + 56}>
      {zoomCaption ? (
        <Typography sx={{ fontSize: 11, color: '#6b7280', textAlign: 'center', mb: 0.5 }}>
          {zoomCaption}
        </Typography>
      ) : null}
      <HighchartsReact highcharts={Highcharts} options={options} />
    </ChartPanel>
  );
}
