import { useMemo } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { ChartPanel } from './ChartPanel';
import { ChartLegendStrip } from './ChartLegendStrip';

const NO_STROKE = { fontSize: '10px', fontWeight: 'normal', textOutline: 'none', textShadow: false };

export function BarChart({
  title,
  categories,
  values,
  yAxisTitle,
  xAxisTitle,
  color = '#1e3a5f',
  colors,
  valueSuffix = '',
  labelColor = '#fff',
  height = 300,
  horizontal = false,
  legendItems,
  legendPosition = 'bottom',
}) {
  const chartType = horizontal ? 'bar' : 'column';
  /** Single fill color — Highcharts ignores one-off `colors[0]` with colorByPoint in some builds. */
  const multi = Boolean(colors?.length);
  const fill = multi ? undefined : color;

  const options = useMemo(
    () => ({
      chart: { type: chartType, height, backgroundColor: 'transparent' },
      credits: { enabled: false },
      title: { text: null },
      exporting: { enabled: false },
      ...(horizontal
        ? {
            xAxis: {
              min: 0,
              title: { text: yAxisTitle, style: { fontSize: '11px' } },
              labels: { style: { fontSize: '10px' } },
            },
            yAxis: {
              categories,
              title: { text: null },
              labels: { style: { fontSize: '10px' } },
              reversed: true,
            },
          }
        : {
            xAxis: {
              categories,
              title: xAxisTitle ? { text: xAxisTitle, style: { fontSize: '11px' } } : undefined,
              labels: {
                rotation: categories.length > 8 ? -35 : 0,
                style: { fontSize: '10px' },
              },
            },
            yAxis: { min: 0, title: { text: yAxisTitle, style: { fontSize: '11px' } } },
          }),
      legend: { enabled: false },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true,
            formatter() {
              return `${this.y}${valueSuffix}`;
            },
            backgroundColor: 'transparent',
            borderWidth: 0,
            shadow: false,
            style: { ...NO_STROKE, color: labelColor },
          },
          colorByPoint: multi,
          color: fill,
          colors: multi ? colors : undefined,
        },
        column: {
          dataLabels: {
            enabled: true,
            formatter() {
              return `${this.y}${valueSuffix}`;
            },
            backgroundColor: 'transparent',
            borderWidth: 0,
            shadow: false,
            style: { ...NO_STROKE, color: labelColor },
          },
          colorByPoint: multi,
          color: fill,
          colors: multi ? colors : undefined,
        },
      },
      series: [{ name: title, data: values }],
    }),
    [title, categories, values, yAxisTitle, xAxisTitle, color, colors, multi, fill, valueSuffix, labelColor, height, horizontal, chartType]
  );

  return (
    <ChartPanel title={title}>
      {legendItems?.length && legendPosition === 'top' ? (
        <ChartLegendStrip items={legendItems} dense />
      ) : null}
      <HighchartsReact highcharts={Highcharts} options={options} />
      {legendItems?.length && legendPosition === 'bottom' ? (
        <ChartLegendStrip items={legendItems} dense />
      ) : null}
    </ChartPanel>
  );
}
