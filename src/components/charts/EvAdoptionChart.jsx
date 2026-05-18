import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import {
  Box,
  IconButton,
  Slider,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  EV_ADOPTION_CHART_META,
  EV_ADOPTION_DATASETS,
  EV_ADOPTION_VIEW_OPTIONS,
} from '../../fixtures/evAdoption';
import { AWB } from '../../theme/awbTokens';

const CHART_HEIGHT = 480;

function buildChartOptions(frame, dataset) {
  /**
   * Inverted column: categories on the left (xAxis when inverted), values on the bottom (yAxis).
   * Plain `type: 'bar'` was rendering zip codes on the bottom and the value scale on the left.
   */
  return {
    chart: {
      type: 'column',
      inverted: true,
      height: CHART_HEIGHT,
      backgroundColor: 'transparent',
      animation: { duration: 450 },
      marginBottom: 56,
      marginLeft: 72,
      spacingBottom: 8,
    },
    credits: { enabled: true, text: 'Highcharts.com', style: { fontSize: '9px', color: '#9aa5b4' } },
    title: { text: null },
    exporting: { enabled: false },
    xAxis: {
      categories: frame.categories,
      reversed: true,
      title: {
        text: dataset.categoryAxisTitle,
        margin: 12,
        style: { fontSize: '11px', fontWeight: '400', color: '#1E232E' },
      },
      labels: { style: { fontSize: '10px', color: '#1E232E' } },
    },
    yAxis: {
      min: 0,
      max: EV_ADOPTION_CHART_META.valueAxisMax,
      tickInterval: 1,
      title: {
        text: 'No. of EVs',
        margin: 14,
        style: { fontSize: '11px', fontWeight: '400', color: '#1E232E' },
      },
      gridLineWidth: 1,
      gridLineColor: '#e8ecf2',
      labels: { style: { fontSize: '10px', color: '#1E232E' } },
    },
    legend: { enabled: false },
    tooltip: {
      formatter() {
        return `<b>${this.point.category}</b><br/>No. of EVs: <b>${this.point.y}</b>`;
      },
    },
    plotOptions: {
      series: {
        animation: { duration: 450 },
      },
      column: {
        grouping: false,
        colorByPoint: true,
        colors: dataset.colors,
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          align: 'right',
          inside: false,
          formatter() {
            return String(this.y);
          },
          style: {
            color: '#1E232E',
            fontWeight: '700',
            fontSize: '11px',
            textOutline: 'none',
          },
        },
      },
    },
    series: [{ type: 'column', name: EV_ADOPTION_CHART_META.title, data: frame.values }],
  };
}

export function EvAdoptionChart() {
  const [viewBy, setViewBy] = useState('ZIP');
  const dataset = EV_ADOPTION_DATASETS[viewBy];
  const frameCount = dataset.frames.length;
  const [frameIndex, setFrameIndex] = useState(frameCount - 1);
  const [playing, setPlaying] = useState(false);
  const chartRef = useRef(null);

  useEffect(() => {
    setFrameIndex(dataset.frames.length - 1);
    setPlaying(false);
  }, [viewBy, dataset.frames.length]);

  const frame = dataset.frames[frameIndex];

  const options = useMemo(() => buildChartOptions(frame, dataset), [frame, dataset]);

  useEffect(() => {
    if (!playing) return undefined;
    const id = window.setInterval(() => {
      setFrameIndex((prev) => {
        if (prev >= frameCount - 1) {
          setPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, EV_ADOPTION_CHART_META.playIntervalMs);
    return () => window.clearInterval(id);
  }, [playing, frameCount]);

  const handlePlayToggle = useCallback(() => {
    setPlaying((wasPlaying) => {
      if (wasPlaying) return false;
      if (frameIndex >= frameCount - 1) setFrameIndex(0);
      return true;
    });
  }, [frameIndex, frameCount]);

  const handleSlider = useCallback((_, value) => {
    setPlaying(false);
    setFrameIndex(value);
  }, []);

  return (
    <Box
      sx={{
        border: `1px solid ${AWB.border}`,
        borderRadius: '4px',
        bgcolor: '#fff',
        p: '12px 16px 16px',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, minWidth: 140 }}>
          <Typography sx={{ fontSize: 14, fontWeight: 600, color: '#1E232E' }}>
            {EV_ADOPTION_CHART_META.title}
          </Typography>
          <InfoOutlinedIcon sx={{ fontSize: 16, color: '#6b7280' }} aria-hidden />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography sx={{ fontSize: 12, color: '#565e6e', mr: 0.5 }}>View By</Typography>
          <ToggleButtonGroup
            exclusive
            size="small"
            value={viewBy}
            onChange={(_, next) => next && setViewBy(next)}
            sx={{
              '& .MuiToggleButton-root': {
                textTransform: 'none',
                fontSize: 12,
                px: 1.5,
                py: 0.35,
                borderColor: AWB.border,
                color: '#1E232E',
              },
              '& .Mui-selected': {
                bgcolor: `${AWB.brandBlue} !important`,
                color: '#fff !important',
              },
            }}
          >
            {EV_ADOPTION_VIEW_OPTIONS.map((opt) => (
              <ToggleButton key={opt.id} value={opt.id}>
                {opt.label}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>

        <IconButton size="small" aria-label="Chart options" sx={{ color: '#6b7280' }}>
          <MoreVertIcon fontSize="small" />
        </IconButton>
      </Box>

      <Box sx={{ position: 'relative' }}>
        <HighchartsReact ref={chartRef} highcharts={Highcharts} options={options} />

        <Box
          sx={{
            position: 'absolute',
            right: 48,
            bottom: 72,
            textAlign: 'right',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          <Typography sx={{ fontSize: 28, fontWeight: 300, color: 'rgba(30,35,46,0.35)', lineHeight: 1.1 }}>
            {frame.date}
          </Typography>
          <Typography sx={{ fontSize: 16, fontWeight: 400, color: 'rgba(30,35,46,0.45)', mt: 0.5 }}>
            Total : {frame.total} EV&apos;s
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 1, px: 2 }}>
        <IconButton
          onClick={handlePlayToggle}
          aria-label={playing ? 'Pause timeline' : 'Play timeline'}
          sx={{
            width: 44,
            height: 44,
            bgcolor: AWB.brandBlue,
            color: '#fff',
            '&:hover': { bgcolor: '#1353ab' },
          }}
        >
          {playing ? <PauseIcon /> : <PlayArrowIcon sx={{ fontSize: 28 }} />}
        </IconButton>

        <Slider
          value={frameIndex}
          min={0}
          max={frameCount - 1}
          step={1}
          onChange={handleSlider}
          sx={{
            width: '100%',
            maxWidth: 720,
            mt: 1,
            color: AWB.brandBlue,
            '& .MuiSlider-thumb': { width: 14, height: 14 },
          }}
          aria-label="EV adoption timeline"
        />
      </Box>
    </Box>
  );
}
