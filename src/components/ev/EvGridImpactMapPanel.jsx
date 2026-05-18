import { Box, Typography } from '@mui/material';
import { EV_GRID_UTILIZATION_LEGEND } from '../../fixtures/evGridImpact';

const MAP_MARKERS = [
  { top: '18%', left: '22%', size: 28, color: '#F5A623' },
  { top: '32%', left: '38%', size: 36, color: '#E53935' },
  { top: '28%', left: '52%', size: 22, color: '#FDD835' },
  { top: '45%', left: '30%', size: 18, color: '#43A047' },
  { top: '40%', left: '48%', size: 32, color: '#FB8C00' },
  { top: '55%', left: '42%', size: 24, color: '#AED581' },
  { top: '38%', left: '62%', size: 20, color: '#F5A623' },
  { top: '52%', left: '58%', size: 26, color: '#E53935' },
];

function MapMarkers() {
  return (
    <>
      {MAP_MARKERS.map((m, i) => (
        <Box
          key={i}
          sx={{
            position: 'absolute',
            top: m.top,
            left: m.left,
            width: m.size,
            height: m.size,
            borderRadius: '50%',
            bgcolor: m.color,
            opacity: 0.82,
            border: '2px solid rgba(255,255,255,0.9)',
            boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
          }}
        />
      ))}
    </>
  );
}

function UtilizationLegend() {
  return (
    <Box
      sx={{
        position: 'absolute',
        left: 8,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 0.25,
        py: 1,
        px: 0.75,
        bgcolor: 'rgba(255,255,255,0.92)',
        borderRadius: '2px',
        border: '1px solid #d5dbe8',
      }}
    >
      {EV_GRID_UTILIZATION_LEGEND.map((step) => (
        <Box key={step.label} sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
          <Box sx={{ width: 14, height: 10, bgcolor: step.color, borderRadius: '1px' }} />
          <Typography sx={{ fontSize: 9, color: '#1E232E', lineHeight: 1.2 }}>{step.label}</Typography>
        </Box>
      ))}
    </Box>
  );
}

/** Lab GIS preview — bubble markers over a neutral basemap grid. */
export function EvGridImpactMapPanel({ title, variant = 'penetration' }) {
  const showLegend = variant === 'utilization';

  return (
    <Box
      sx={{
        border: '1px solid #D0D6E7',
        borderRadius: '4px',
        bgcolor: '#fff',
        overflow: 'hidden',
        minHeight: 360,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography
        sx={{
          fontSize: 14,
          fontWeight: 600,
          color: '#1E232E',
          textAlign: 'center',
          py: 1.25,
          borderBottom: '1px solid #e8ecf2',
        }}
      >
        {title}
      </Typography>
      <Box
        sx={{
          position: 'relative',
          flex: 1,
          minHeight: 300,
          bgcolor: '#e8eef4',
          backgroundImage: `
            radial-gradient(ellipse 70% 55% at 45% 42%, #c5d4e8 0%, transparent 70%),
            linear-gradient(#d0dae8 1px, transparent 1px),
            linear-gradient(90deg, #d0dae8 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 28px 28px, 28px 28px',
        }}
      >
        {showLegend && <UtilizationLegend />}
        <MapMarkers />
      </Box>
    </Box>
  );
}
