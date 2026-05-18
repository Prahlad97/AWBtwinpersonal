import { Box } from '@mui/material';
import analysisViewIcon from '../../assets/images/table-view-icon.svg';
import splitViewIcon from '../../assets/images/split-view-icon.svg';
import mapViewIcon from '../../assets/images/map-view-icon.svg';
import { MAP_VIEW } from '../../config/mapView';
import { useMapView } from '../../context/MapViewContext';

const viewButtonsContainerSx = {
  display: 'flex',
  gap: '4px',
  backgroundColor: '#f4f6fa',
  padding: '4px',
  borderRadius: '6px',
};

const viewButtonSx = {
  width: 40,
  height: 32,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '4px',
  border: 'none',
  cursor: 'pointer',
  backgroundColor: 'transparent',
  color: '#565e6e',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: '#e8ebf2',
  },
};

const activeButtonSx = {
  backgroundColor: '#ffffff',
  color: '#1e232e',
  boxShadow: '0px 0px 1px rgba(40, 41, 61, 0.08), 0px 0.5px 2px rgba(96, 97, 112, 0.16)',
};

const iconSx = {
  width: 40,
  height: 32,
  minWidth: 40,
  minHeight: 32,
  flexShrink: 0,
  display: 'block',
  objectFit: 'contain',
};

const VIEW_CONFIG = [
  { value: MAP_VIEW.ANALYSIS, title: 'Load Research', icon: analysisViewIcon, alt: 'Analysis view' },
  { value: MAP_VIEW.SPLIT, title: 'Split View (Analysis and Map)', icon: splitViewIcon, alt: 'Split view' },
  { value: MAP_VIEW.MAP, title: 'Map', icon: mapViewIcon, alt: 'Map view' },
];

/** Production: `tabs/shared/load-research-view-toggle.js` */
export function LoadResearchViewToggle() {
  const { state, actions } = useMapView();

  return (
    <Box sx={viewButtonsContainerSx} role="group" aria-label="Dashboard view">
      {VIEW_CONFIG.map(({ value, title, icon, alt }) => (
        <Box
          key={value}
          component="button"
          type="button"
          sx={{ ...viewButtonSx, ...(state.view === value ? activeButtonSx : {}) }}
          onClick={() => actions.setView(value)}
          aria-label={title}
          aria-pressed={state.view === value}
        >
          <Box component="img" src={icon} alt={alt} sx={iconSx} />
        </Box>
      ))}
    </Box>
  );
}
