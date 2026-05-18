import { useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { ChartPanel } from './ChartPanel';
import { PALETTE } from '../../fixtures';

const PIE_SIZE = { wide: 240, tile: 180, compact: 130 };

function sliceColors(slices, colors) {
  if (colors?.length) return colors;
  return slices.map((_, i) => PALETTE[i % PALETTE.length]);
}

function DonutLegend({ slices, colors }) {
  const swatchColors = sliceColors(slices, colors);
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, justifyContent: 'center' }}>
      {slices.map((slice, index) => (
        <Box key={slice.name} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, fontSize: 11, lineHeight: 1.4 }}>
          <Box
            sx={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              bgcolor: swatchColors[index],
              mt: '2px',
              flexShrink: 0,
            }}
          />
          <span>
            {slice.name?.trim() ? `${slice.name}: ` : null}
            <strong>{slice.y.toFixed(2)}%</strong>
          </span>
        </Box>
      ))}
    </Box>
  );
}

export function DonutChart({ title, slices, variant = 'tile', colors, showInfoIcon = false }) {
  const pieSize = PIE_SIZE[variant] || PIE_SIZE.tile;
  const chartColors = sliceColors(slices, colors);
  const isCompact = variant === 'compact';

  const options = useMemo(
    () => ({
      chart: {
        type: 'pie',
        width: pieSize,
        height: pieSize,
        backgroundColor: 'transparent',
        margin: [0, 0, 0, 0],
        spacing: [0, 0, 0, 0],
      },
      credits: { enabled: false },
      title: { text: null },
      exporting: { enabled: false },
      legend: { enabled: false },
      plotOptions: {
        pie: {
          center: ['50%', '50%'],
          size: '100%',
          innerSize: '52%',
          dataLabels: { enabled: false },
        },
      },
      tooltip: { pointFormat: '<b>{point.percentage:.2f}%</b>' },
      series: [
        {
          name: title,
          colorByPoint: true,
          colors: chartColors,
          data: slices.map((s) => ({ name: s.name, y: Math.max(s.y, 0) })),
        },
      ],
    }),
    [title, slices, pieSize, chartColors]
  );

  const titleNode = title ? (
    showInfoIcon ? (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5, mb: 1 }}>
        <Typography
          sx={{
            fontSize: 14,
            fontWeight: 600,
            color: '#1E232E',
            textAlign: 'center',
          }}
        >
          {title}
        </Typography>
        <InfoOutlinedIcon sx={{ fontSize: 16, color: '#6b7280' }} aria-hidden />
      </Box>
    ) : (
      title
    )
  ) : null;

  return (
    <ChartPanel title={titleNode} minHeight={isCompact ? 240 : 320}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 1.75,
          minHeight: isCompact ? 200 : 280,
        }}
      >
        <Box sx={{ width: pieSize, height: pieSize, flexShrink: 0 }}>
          <HighchartsReact highcharts={Highcharts} options={options} />
        </Box>
        <DonutLegend slices={slices} colors={chartColors} />
      </Box>
    </ChartPanel>
  );
}
