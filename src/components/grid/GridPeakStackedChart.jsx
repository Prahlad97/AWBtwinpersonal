import { useMemo, useState } from 'react';
import { Typography } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { ChartPanel } from '../charts/ChartPanel';
import { GRID_PEAK_LDC } from '../../fixtures/gridNwa8760';
import {
  ldcSeriesData,
  ldcTooltip,
  nwaLdcChartBase,
  nwaLdcXAxis,
} from './nwaLdcChartOptions';
import { NWA_SERIES_PERF } from './nwaChartOptions';

export function GridPeakStackedChart({ height = 340 }) {
  const [zoomCaption, setZoomCaption] = useState(null);
  const ldc = GRID_PEAK_LDC;
  const yMin = Math.floor(Math.min(0, ...ldc.layers.solar) - 2);
  const yMax = Math.ceil(Math.max(...ldc.values) * 1.05);

  const options = useMemo(() => {
    const stackSeries = ldc.layerMeta.map((meta) => ({
      name: meta.name,
      type: 'area',
      stacking: 'normal',
      data: ldcSeriesData(ldc.layers[meta.key]),
      color: meta.color,
      fillOpacity: meta.key === 'solar' ? 0.9 : 0.82,
      lineWidth: 0.5,
      marker: { enabled: false },
    }));

    return {
      chart: nwaLdcChartBase(height, setZoomCaption),
      credits: { enabled: false },
      title: { text: null },
      exporting: { enabled: false },
      xAxis: nwaLdcXAxis(ldc, setZoomCaption),
      yAxis: {
        min: yMin,
        max: yMax,
        title: { text: 'Total Demand', style: { fontSize: '11px', color: '#1E232E' } },
        labels: { format: '{value}', style: { fontSize: '10px' } },
        gridLineColor: '#e8ecf2',
        plotLines: [{ value: 0, color: '#9aa5b4', width: 1 }],
      },
      tooltip: ldcTooltip,
      legend: { enabled: true, itemStyle: { fontSize: '10px' } },
      plotOptions: {
        series: NWA_SERIES_PERF,
        area: { marker: { enabled: false }, lineWidth: 0.5 },
      },
      series: stackSeries,
    };
  }, [height, ldc, yMin, yMax]);

  return (
    <ChartPanel title="Stacked Demand Curve" minHeight={height + 56}>
      {zoomCaption ? (
        <Typography sx={{ fontSize: 11, color: '#6b7280', textAlign: 'center', mb: 0.5 }}>
          {zoomCaption}
        </Typography>
      ) : null}
      <HighchartsReact highcharts={Highcharts} options={options} />
    </ChartPanel>
  );
}
