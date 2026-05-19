import { Box, Typography } from '@mui/material';
import { MAP_VIEW } from '../config/mapView';
import { useMapView } from '../context/MapViewContext';
import { LocationMapLegend } from '../components/location/LocationMapLegend';
import { LocationMapPanel } from '../components/location/LocationMapPanel';

function LocationSplitSummary({ subId }) {
  return (
    <Box sx={{ py: 1, pr: 2 }}>
      <Typography sx={{ fontSize: 15, fontWeight: 600, color: '#1e232e', mb: 1.5 }}>Location filters</Typography>
      <Typography sx={{ fontSize: 13, color: '#565e6e', mb: 2, lineHeight: 1.5 }}>
        Heatmap reflects the active dashboard filters (fixture data in Analytics Lab). Use the map view toggle to
        switch between analysis, split, and full map.
      </Typography>
      <LocationMapLegend subId={subId} />
    </Box>
  );
}

/**
 * Location tab — map-first per Figma. Full map renders in MapSplitLayout when view is MAP or SPLIT (right pane).
 */
export function LocationView({ subId }) {
  const { state } = useMapView();
  const view = state.view;

  if (view === MAP_VIEW.MAP) {
    return null;
  }

  if (view === MAP_VIEW.SPLIT) {
    return <LocationSplitSummary subId={subId} />;
  }

  return <LocationMapPanel subId={subId} fullHeight={false} />;
}
