import { useMemo, useState } from 'react';
import { Box } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useParams } from 'react-router-dom';
import { useFilters } from '../../context/FilterContext';
import { useLabExtension } from '../../providers/LabExtensionProvider';
import { getTabByRoute } from '../../config/tabs';
import { tabSupportsMapView } from '../../config/mapView';
import { LoadResearchViewToggle } from '../map/LoadResearchViewToggle';
import { AWB, font } from '../../theme/awbTokens';
import savedFiltersIcon from '../../assets/images/saved-filters.svg';
import segmentSnapshotIcon from '../../assets/images/segment-snapshot.svg';
import hamburgerIcon from '../../assets/images/hamburger-icon.svg';
import LabFilterPane from '../../chrome/awb/filters/LabFilterPane';
import CustomFilter from '../../chrome/awb/CustomFilter';
import DateRangePanel from '../../chrome/awb/DateRangePanel';
import SegmentPopoverLab from './toolbar/SegmentPopoverLab';
import { FeaturesMenuLab } from './toolbar/FeaturesMenuLab';
import { countAppliedFilters } from '../../chrome/awb/filters/labFilterHelper';
import { NON_CHART_FILTERS_LIST } from '../../chrome/awb/filters/labNonChartFilters';

const pillSx = {
  display: 'flex',
  alignItems: 'center',
  bgcolor: AWB.filterBg,
  borderRadius: '6px',
  cursor: 'pointer',
  boxSizing: 'border-box',
  border: 'none',
  font: 'inherit',
};

const countBadgeSx = {
  bgcolor: '#05090d',
  color: '#fff',
  width: 22,
  height: 16,
  borderRadius: '2px',
  fontSize: 12,
  fontWeight: 500,
  lineHeight: '16px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: 'Roboto, sans-serif',
};

/** Funnel + count only — matches `AppliedFilters` (no tags in toolbar). */
function FiltersButton({ count, onClick }) {
  return (
    <Box
      component="button"
      type="button"
      onClick={onClick}
      aria-label="Filters"
      sx={{
        ...pillSx,
        gap: 1,
        px: '12px',
        py: '8px',
        display: 'inline-flex',
      }}
    >
      <Box component="img" src={savedFiltersIcon} alt="" sx={{ width: 20, height: 20, display: 'block' }} />
      <Box component="span" sx={countBadgeSx}>
        {count}
      </Box>
    </Box>
  );
}

function SegmentButton({ count, onClick }) {
  return (
    <Box
      component="button"
      type="button"
      onClick={onClick}
      aria-label="Segments"
      sx={{
        ...pillSx,
        gap: 1,
        px: '12px',
        py: '8px',
        display: 'inline-flex',
      }}
    >
      <Box component="img" src={segmentSnapshotIcon} alt="" sx={{ width: 20, height: 20, display: 'block' }} />
      <Box component="span" sx={countBadgeSx}>
        {count}
      </Box>
    </Box>
  );
}

function TextPill({ children, onClick }) {
  return (
    <Box
      component="button"
      type="button"
      onClick={onClick}
      sx={{
        ...pillSx,
        gap: 1,
        px: 1.5,
        py: 1,
        ...font.label,
        fontSize: 16,
        lineHeight: '24px',
        color: AWB.textPrimary,
        whiteSpace: 'nowrap',
      }}
    >
      {children}
      <KeyboardArrowDownIcon sx={{ fontSize: 18, color: AWB.textPrimary }} />
    </Box>
  );
}

/** Production `FeaturesMenu`: full 44×40 SVG includes grey pill background — do not shrink to 20px. */
function HamburgerButton({ onClick }) {
  return (
    <Box
      component="button"
      type="button"
      aria-label="Features menu"
      onClick={onClick}
      sx={{
        p: 0,
        m: 0,
        border: 'none',
        bgcolor: 'transparent',
        cursor: 'pointer',
        lineHeight: 0,
        display: 'inline-flex',
        alignItems: 'center',
        '&:hover': { opacity: 0.92 },
      }}
    >
      <Box component="img" src={hamburgerIcon} alt="" sx={{ width: 44, height: 40, display: 'block' }} />
    </Box>
  );
}

/** Production: `AnalyticsDashboard` `filterAndDate` — toolbar triggers only; tags live in filter pane. */
export function FilterBar() {
  const { tab } = useParams();
  const currentTab = getTabByRoute(tab);
  const showMapViewToggle = tabSupportsMapView(currentTab.id);
  const {
    state: { lookerFilters },
  } = useLabExtension();

  const appliedFiltersCount = useMemo(
    () => countAppliedFilters(lookerFilters, NON_CHART_FILTERS_LIST),
    [lookerFilters]
  );

  const { dateRangeLabel, setDateRangeLabel, segmentCount } = useFilters();
  const [dateAnchor, setDateAnchor] = useState(null);
  const [filterAnchor, setFilterAnchor] = useState(null);
  const [segmentAnchor, setSegmentAnchor] = useState(null);
  const [featuresAnchor, setFeaturesAnchor] = useState(null);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'nowrap', justifyContent: 'flex-end' }}>
      <CustomFilter />

      <TextPill onClick={(e) => setDateAnchor(e.currentTarget)}>{dateRangeLabel}</TextPill>
      <DateRangePanel
        anchorEl={dateAnchor}
        open={Boolean(dateAnchor)}
        onClose={() => setDateAnchor(null)}
        label={dateRangeLabel}
        onSelectLabel={setDateRangeLabel}
      />

      <FiltersButton count={appliedFiltersCount} onClick={(e) => setFilterAnchor(e.currentTarget)} />
      <LabFilterPane anchorEl={filterAnchor} open={Boolean(filterAnchor)} onClose={() => setFilterAnchor(null)} />

      <SegmentButton count={segmentCount} onClick={(e) => setSegmentAnchor(e.currentTarget)} />
      <SegmentPopoverLab anchorEl={segmentAnchor} open={Boolean(segmentAnchor)} onClose={() => setSegmentAnchor(null)} />

      <HamburgerButton onClick={(e) => setFeaturesAnchor(e.currentTarget)} />
      <FeaturesMenuLab anchorEl={featuresAnchor} open={Boolean(featuresAnchor)} onClose={() => setFeaturesAnchor(null)} />

      {showMapViewToggle && (
        <>
          <Box sx={{ width: '1px', height: 24, bgcolor: '#eaedf6', mx: 0.5, flexShrink: 0 }} />
          <LoadResearchViewToggle />
        </>
      )}
    </Box>
  );
}
