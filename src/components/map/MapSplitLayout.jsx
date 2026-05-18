import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import { getTabByRoute } from '../../config/tabs';
import { MAP_VIEW, tabSupportsMapView } from '../../config/mapView';
import { useMapView } from '../../context/MapViewContext';
import { MapPlaceholder } from './MapPlaceholder';

/** Production split/map layout from `embed-dashboard-nuj.js` (loadResearch* classes). */
const splitRootSx = {
  width: '100%',
  mt: '10px',
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'nowrap',
  alignItems: 'stretch',
  overflow: 'hidden',
  minHeight: 'calc(100vh - 280px)',
};

const chartsPanelSx = {
  flex: '0 1 60%',
  minWidth: 0,
  minHeight: 0,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
};

const mapPanelSx = {
  flex: '0 1 40%',
  minWidth: 0,
  minHeight: 0,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  pt: '80px',
  px: '12px',
  pb: '4px',
  boxSizing: 'border-box',
};

const mapOnlyRootSx = {
  width: '100%',
  mt: '10px',
  overflow: 'hidden',
  position: 'relative',
  minHeight: 'calc(100vh - 280px)',
};

const mapOnlyInnerSx = {
  position: 'absolute',
  inset: 0,
  zIndex: 0,
  bgcolor: '#fff',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  pt: '8px',
  px: '12px',
  pb: 0,
  boxSizing: 'border-box',
};

export function MapSplitLayout({ children }) {
  const { tab } = useParams();
  const currentTab = getTabByRoute(tab);
  const { state } = useMapView();

  if (!tabSupportsMapView(currentTab.id)) {
    return children;
  }

  const view = state.view;
  const isMapOnly = view === MAP_VIEW.MAP;
  const isSplit = view === MAP_VIEW.SPLIT;

  if (isMapOnly) {
    return (
      <Box sx={mapOnlyRootSx}>
        <Box sx={mapOnlyInnerSx}>
          <MapPlaceholder fullHeight />
        </Box>
      </Box>
    );
  }

  if (isSplit) {
    return (
      <Box sx={splitRootSx}>
        <Box sx={chartsPanelSx}>{children}</Box>
        <Box sx={mapPanelSx}>
          <MapPlaceholder />
        </Box>
      </Box>
    );
  }

  return children;
}
