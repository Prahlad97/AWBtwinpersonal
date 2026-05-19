import { useEffect, useRef, useState } from 'react';
import { Box, CircularProgress, IconButton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { AWB } from '../../theme/awbTokens';
import { LocationMapLegend } from './LocationMapLegend';
import { LocationMapbox } from './LocationMapbox';

const controlBtnSx = {
  width: 36,
  height: 36,
  bgcolor: '#fff',
  border: '1px solid #d0d6e7',
  borderRadius: '6px',
  boxShadow: '0 0 1px rgba(40,41,61,0.08), 0 0.5px 2px rgba(96,97,112,0.16)',
  '&:hover': { bgcolor: '#f4f6fa' },
};

export function LocationMapPanel({ subId = 'HOME', fullHeight = false }) {
  const mapRef = useRef(null);
  const mapReadyRef = useRef(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!mapReadyRef.current) {
      setLoading(true);
      setError(null);
    }
  }, [subId]);

  useEffect(() => {
    const t1 = setTimeout(() => mapRef.current?.resize(), 50);
    const t2 = setTimeout(() => mapRef.current?.resize(), 300);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [fullHeight, subId, loading]);

  const handleLoad = () => {
    mapReadyRef.current = true;
    setLoading(false);
    setError(null);
    requestAnimationFrame(() => mapRef.current?.resize());
  };

  const handleError = (message) => {
    setError(message);
    setLoading(false);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        minHeight: fullHeight ? 480 : 520,
        height: fullHeight ? '100%' : 520,
        flex: fullHeight ? 1 : undefined,
        border: `1px solid ${AWB.border}`,
        borderRadius: '8px',
        overflow: 'hidden',
        bgcolor: '#f4f6fa',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {loading ? (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            zIndex: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1.5,
            bgcolor: 'rgba(244,246,250,0.85)',
            pointerEvents: 'none',
          }}
        >
          <CircularProgress size={40} sx={{ color: AWB.brandBlue }} />
          <Typography sx={{ fontSize: 13, color: '#565e6e' }}>Loading map…</Typography>
        </Box>
      ) : null}

      {error && !loading ? (
        <Box
          sx={{
            position: 'absolute',
            top: 12,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 4,
            px: 2,
            py: 1,
            bgcolor: 'rgba(255,243,224,0.96)',
            border: '1px solid #f0c36d',
            borderRadius: 1,
            maxWidth: '90%',
          }}
        >
          <Typography sx={{ fontSize: 12, color: '#7a4d00', textAlign: 'center' }}>{error}</Typography>
        </Box>
      ) : null}

      <Box sx={{ position: 'absolute', top: 12, left: 12, zIndex: 2, pointerEvents: 'none' }}>
        <Box sx={{ pointerEvents: 'auto' }}>
          <LocationMapLegend subId={subId} />
        </Box>
      </Box>

      <Box
        sx={{
          position: 'absolute',
          top: 12,
          right: 12,
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 0.75,
        }}
      >
        <IconButton size="small" sx={controlBtnSx} onClick={() => mapRef.current?.zoomIn()} aria-label="Zoom in">
          <AddIcon sx={{ fontSize: 18 }} />
        </IconButton>
        <IconButton size="small" sx={controlBtnSx} onClick={() => mapRef.current?.zoomOut()} aria-label="Zoom out">
          <RemoveIcon sx={{ fontSize: 18 }} />
        </IconButton>
        <IconButton size="small" sx={controlBtnSx} onClick={() => mapRef.current?.recenter()} aria-label="Recenter map">
          <MyLocationIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </Box>

      <Box sx={{ flex: 1, minHeight: 400, display: 'flex', flexDirection: 'column' }}>
        <LocationMapbox ref={mapRef} subId={subId} onLoad={handleLoad} onError={handleError} />
      </Box>
    </Box>
  );
}
