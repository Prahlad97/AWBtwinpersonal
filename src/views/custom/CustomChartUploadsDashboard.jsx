import { useMemo, useState } from 'react';
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import FilterListIcon from '@mui/icons-material/FilterList';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import PieChartOutlineIcon from '@mui/icons-material/PieChartOutline';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { DonutChart } from '../../components/charts/DonutChart';
import { AWB } from '../../theme/awbTokens';
import {
  customUploadCharts,
  customUploadChartsDefaultId,
} from '../../fixtures/customCharts';

function ChartUploadCard({ chart, selected, onSelect }) {
  return (
    <Box
      component="button"
      type="button"
      onClick={() => onSelect(chart.id)}
      sx={{
        display: 'block',
        width: '100%',
        textAlign: 'left',
        cursor: 'pointer',
        border: `1px solid ${selected ? AWB.brandBlue : AWB.border}`,
        borderRadius: '4px',
        bgcolor: '#fff',
        p: 1.5,
        mb: 1.25,
        boxShadow: selected ? `0 0 0 1px ${AWB.brandBlue}` : 'none',
        transition: 'border-color 0.15s',
        '&:hover': {
          borderColor: selected ? AWB.brandBlue : '#b8c4d9',
        },
      }}
    >
      <Typography sx={{ fontSize: 14, fontWeight: 600, color: '#1E232E', mb: 0.5, lineHeight: 1.35 }}>
        {chart.title}
      </Typography>
      <Typography sx={{ fontSize: 12, color: '#5c6b7a', mb: chart.description && selected ? 1 : 0 }}>
        {chart.author} · {chart.date}
      </Typography>
      {selected && chart.description ? (
        <Typography sx={{ fontSize: 12, color: '#5c6b7a', lineHeight: 1.5, mb: 1 }}>
          {chart.description}
        </Typography>
      ) : null}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <PieChartOutlineIcon sx={{ fontSize: 20, color: '#6b7280' }} aria-hidden />
        <IconButton
          size="small"
          aria-label="Chart options"
          onClick={(e) => e.stopPropagation()}
          sx={{ color: '#6b7280' }}
        >
          <MoreVertIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
}

export function CustomChartUploadsDashboard() {
  const [selectedId, setSelectedId] = useState(customUploadChartsDefaultId);
  const [query, setQuery] = useState('');

  const filteredCharts = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return customUploadCharts;
    return customUploadCharts.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.author.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q)
    );
  }, [query]);

  const selected =
    customUploadCharts.find((c) => c.id === selectedId) ?? customUploadCharts[0];

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        alignItems: 'stretch',
        width: '100%',
        py: 1,
      }}
    >
      <Box
        sx={{
          flex: '0 0 40%',
          maxWidth: '40%',
          minWidth: 280,
          bgcolor: '#fff',
          border: `1px solid ${AWB.border}`,
          borderRadius: '4px',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1.5 }}>
          <IconButton size="small" aria-label="Sort charts" sx={{ color: '#5c6b7a' }}>
            <SwapVertIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" aria-label="Filter charts" sx={{ color: '#5c6b7a' }}>
            <FilterListIcon fontSize="small" />
          </IconButton>
          <TextField
            size="small"
            placeholder="Search chart"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            fullWidth
            sx={{
              mx: 0.5,
              '& .MuiOutlinedInput-root': {
                fontSize: 13,
                bgcolor: '#fff',
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ fontSize: 18, color: '#9aa5b4' }} />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            size="small"
            startIcon={<FileUploadOutlinedIcon />}
            sx={{
              flexShrink: 0,
              bgcolor: AWB.brandBlue,
              textTransform: 'none',
              fontSize: 13,
              fontWeight: 500,
              boxShadow: 'none',
              '&:hover': { bgcolor: '#1353ab', boxShadow: 'none' },
            }}
          >
            Upload
          </Button>
        </Box>

        <Typography sx={{ fontSize: 11, color: '#5c6b7a', mb: 1.5, fontStyle: 'italic' }}>
          Only one chart can be used as a filter at a time
        </Typography>

        <Box sx={{ flex: 1, overflowY: 'auto', pr: 0.5 }}>
          {filteredCharts.map((chart) => (
            <ChartUploadCard
              key={chart.id}
              chart={chart}
              selected={chart.id === selectedId}
              onSelect={setSelectedId}
            />
          ))}
        </Box>
      </Box>

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <DonutChart
          key={selected.id}
          title={selected.title}
          slices={selected.slices}
          colors={selected.colors}
          variant="wide"
        />
      </Box>
    </Box>
  );
}
