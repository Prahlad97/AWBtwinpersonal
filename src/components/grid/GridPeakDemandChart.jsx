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

const PEAK_FILL = '#5B8DEF';

export function GridPeakDemandChart({ height = 340 }) {
  const [zoomCaption, setZoomCaption] = useState(null);
  const ldc = GRID_PEAK_LDC;
  const yMax = Math.ceil(Math.max(...ldc.values) * 1.05);

  const options = useMemo(
    () => ({
      chart: nwaLdcChartBase(height, setZoomCaption),
      credits: { enabled: false },
      title: { text: null },
      exporting: { enabled: false },
      xAxis: nwaLdcXAxis(ldc, setZoomCaption),
      yAxis: {
        min: 0,
        max: yMax,
        title: { text: 'Total Demand', style: { fontSize: '11px', color: '#1E232E' } },
        labels: { format: '{value}', style: { fontSize: '10px' } },
        gridLineColor: '#e8ecf2',
      },
      tooltip: ldcTooltip,
      legend: { enabled: false },
      plotOptions: {
        series: NWA_SERIES_PERF,
        area: { lineWidth: 0.35, fillOpacity: 0.55, marker: { enabled: false } },
      },
      series: [
        {
          name: 'Total Demand',
          type: 'area',
          data: ldcSeriesData(ldc.values),
          color: PEAK_FILL,
          fillColor: {
            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
            stops: [
              [0, 'rgba(91, 141, 239, 0.85)'],
              [1, 'rgba(91, 141, 239, 0.12)'],
            ],
          },
        },
      ],
    }),
    [height, ldc, yMax]
  );

  return (
    <ChartPanel title="8760 Demand Curve (Total Demand)" minHeight={height + 56}>
      {zoomCaption ? (
        <Typography sx={{ fontSize: 11, color: '#6b7280', textAlign: 'center', mb: 0.5 }}>
          {zoomCaption}
        </Typography>
      ) : null}
      <HighchartsReact highcharts={Highcharts} options={options} />
    </ChartPanel>
  );
}
