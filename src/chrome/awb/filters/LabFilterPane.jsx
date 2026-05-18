/**
 * Analytics Lab filter pane — layout + behavior mirrored from AWB `filters/filter-pane.js`.
 * Left: vendored {@link LabAppliedFiltersPanel}; right: {@link LabFilterControlsPanel} (no Looker SDK).
 */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Box, Typography, makeStyles } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { Popover, InputBase } from '@mui/material';
import { useParams } from 'react-router-dom';

import { useLabExtension } from '../../../providers/LabExtensionProvider';
import { useFilters } from '../../../context/FilterContext';
import { getTabByRoute } from '../../../config/tabs';
import { LAB_DEFAULT_LOOKER_FILTERS } from '../constants';
import { getFilterLabel } from '../filter-helper';

import LabAppliedFiltersPanel from './LabAppliedFiltersPanel';
import LabFilterControlsPanel from './LabFilterControlsPanel';
import LabFilterPaneFooter from './LabFilterPaneFooter';
import { groupByTabConfig } from './labDashboardFilterConfig';
import {
  buildLabGroupedFilters,
  getAppliedFilterGroupLab,
  getGroupNameFromCurrentTab,
  removeFilterValue as removeFilterValueStr,
} from './labFilterHelper';

const useStyles = makeStyles({
  popoverContent: {
    width: '830px',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    backgroundColor: 'white',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    height: '550px',
    position: 'relative',
  },
  topPanel: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 20px',
    borderBottom: '1px solid #e0e0e0',
    position: 'sticky',
    top: 0,
    backgroundColor: 'white',
    zIndex: 10,
    height: '64px',
  },
  mainContent: {
    display: 'flex',
    flex: 1,
    overflow: 'hidden',
    height: 'calc(100% - 64px - 72px)',
  },
  searchBar: {
    width: '200px',
    height: '40px',
    border: '1px solid #999999',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    '& .MuiInputBase-root': {
      width: '100%',
      height: '100%',
    },
    '& .MuiInputBase-input': {
      fontSize: '14px',
      padding: '8px 4px',
      height: '100%',
      width: '100%',
      border: 'none',
      outline: 'none',
    },
  },
  searchIcon: {
    color: '#999999',
    marginRight: '4px',
    fontSize: '18px',
  },
  closeButton: {
    cursor: 'pointer',
    fontSize: '20px',
    color: '#666',
    border: 'none',
    background: 'transparent',
    lineHeight: 1,
    '&:hover': {
      color: '#333',
    },
  },
});

const FILTERED_GROUPS = buildLabGroupedFilters();

export default function LabFilterPane({ anchorEl, open, onClose }) {
  const classes = useStyles();
  const { tab } = useParams();
  const currentTab = getTabByRoute(tab);
  const currentTabId = currentTab?.id || 'ACCOUNT';

  const { dateRangeLabel } = useFilters();
  const {
    state: { lookerFilters },
    actions: { updateLookerFilter },
  } = useLabExtension();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroup, setSelectedGroup] = useState(() => getGroupNameFromCurrentTab(currentTabId));
  const [localFilterChanges, setLocalFilterChanges] = useState(() => ({
    ...LAB_DEFAULT_LOOKER_FILTERS,
    ...lookerFilters,
  }));
  const [expandedFilters, setExpandedFilters] = useState({});
  const [lastSearchedFilter, setLastSearchedFilter] = useState(null);
  const filterRefs = useRef({});
  const prevOpenRef = useRef(false);

  useEffect(() => {
    const groupNames = Object.keys(FILTERED_GROUPS);
    const preferred = getGroupNameFromCurrentTab(currentTabId);
    setSelectedGroup((prev) => {
      if (prev && groupNames.includes(prev)) return prev;
      if (preferred && groupNames.includes(preferred)) return preferred;
      return groupNames[0] ?? null;
    });
  }, [currentTabId]);

  useEffect(() => {
    const openedNow = open && !prevOpenRef.current;
    if (open && openedNow) {
      setLocalFilterChanges({ ...LAB_DEFAULT_LOOKER_FILTERS, ...lookerFilters });
      setExpandedFilters({});
      setSearchTerm('');
      setLastSearchedFilter(null);
      const groupNames = Object.keys(FILTERED_GROUPS);
      const preferred = getGroupNameFromCurrentTab(currentTabId);
      setSelectedGroup(preferred && groupNames.includes(preferred) ? preferred : groupNames[0] ?? null);
    }
    prevOpenRef.current = open;
  }, [open, lookerFilters, currentTabId]);

  useEffect(() => {
    if (lastSearchedFilter && filterRefs.current[lastSearchedFilter]) {
      window.setTimeout(() => {
        filterRefs.current[lastSearchedFilter]?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }, 100);
    }
  }, [lastSearchedFilter]);

  const appliedFilterGroups = useMemo(
    () => getAppliedFilterGroupLab(localFilterChanges),
    [localFilterChanges]
  );

  const handleSearchChange = (value) => {
    setSearchTerm(value);

    if (!value) {
      setLastSearchedFilter(null);
      return;
    }

    const matchingGroup = Object.entries(FILTERED_GROUPS).find(([_, filters]) =>
      filters.some((filter) => filter?.name.toLowerCase().includes(value.toLowerCase()))
    );

    if (matchingGroup) {
      const groupName = matchingGroup[0];
      setSelectedGroup(groupName);

      const matchingFilter = matchingGroup[1].find((f) =>
        f.name.toLowerCase().includes(value.toLowerCase())
      );

      if (matchingFilter) {
        setLastSearchedFilter(`${groupName}-${matchingFilter.name}`);
      }
    }
  };

  const handleFilterChange = (filterName) => (value) => {
    setLocalFilterChanges((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  };

  const handleRemoveFilter = (filterName) => {
    setLocalFilterChanges((prev) => ({
      ...prev,
      [filterName]: '',
    }));
  };

  const handleRemoveFilterValue = (filterName, valueToRemove) => {
    const currentValue = localFilterChanges[filterName];
    const newValue = removeFilterValueStr(currentValue, valueToRemove);
    setLocalFilterChanges((prev) => ({
      ...prev,
      [filterName]: newValue,
    }));
  };

  const handleClearGroup = (group) => {
    const filtersInGroup = groupByTabConfig[group] || [];
    const updatedFilters = { ...localFilterChanges };

    filtersInGroup.forEach((filterName) => {
      updatedFilters[filterName] = '';
    });

    setLocalFilterChanges((prev) => ({
      ...prev,
      ...updatedFilters,
    }));
  };

  const handleToggleExpand = (group, filterName) => {
    setExpandedFilters((prev) => ({
      ...prev,
      [`${group}-${filterName}`]: !prev[`${group}-${filterName}`],
    }));
  };

  const hasGroupMatchingFilters = (group, term) => {
    if (!FILTERED_GROUPS[group] || !term) return false;
    return FILTERED_GROUPS[group].some((filter) =>
      filter.name.toLowerCase().includes(term.toLowerCase())
    );
  };

  const filteredDashboardFilters = FILTERED_GROUPS;

  const applyFilters = () => {
    updateLookerFilter({
      ...lookerFilters,
      ...localFilterChanges,
    });
    onClose();
  };

  const clearAllFilters = () => {
    const cleared = {};
    Object.values(groupByTabConfig)
      .flat()
      .forEach((name) => {
        cleared[name] = '';
      });
    setLocalFilterChanges({
      ...cleared,
      ...LAB_DEFAULT_LOOKER_FILTERS,
    });
  };

  const chartTitleMap = {};

  const filterPaneContent = (
    <Box className={classes.popoverContent}>
      <Box className={classes.topPanel}>
        <Typography variant="h6">Filters</Typography>
        <Box style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Box className={classes.searchBar}>
            <SearchIcon className={classes.searchIcon} />
            <InputBase
              placeholder="Search filters…"
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              fullWidth
            />
          </Box>
          <button type="button" className={classes.closeButton} onClick={onClose} aria-label="Close">
            ×
          </button>
        </Box>
      </Box>

      <Box className={classes.mainContent}>
        <LabAppliedFiltersPanel
          chartTitleMap={chartTitleMap}
          filteredDashboardFilters={filteredDashboardFilters}
          appliedFilterGroups={appliedFilterGroups}
          selectedGroup={selectedGroup}
          expandedFilters={expandedFilters}
          searchTerm={searchTerm}
          hasGroupMatchingFilters={hasGroupMatchingFilters}
          onSelectGroup={setSelectedGroup}
          onClearGroup={handleClearGroup}
          onToggleExpand={handleToggleExpand}
          onRemoveFilter={handleRemoveFilter}
          onRemoveFilterValue={handleRemoveFilterValue}
        />

        <LabFilterControlsPanel
          selectedGroup={selectedGroup}
          filteredDashboardFilters={filteredDashboardFilters}
          searchTerm={searchTerm}
          localFilterChanges={localFilterChanges}
          onFilterChange={handleFilterChange}
          filterRefs={filterRefs}
        />
      </Box>

      <LabFilterPaneFooter
        dateRangeLabel={dateRangeLabel}
        filterLabel={getFilterLabel(localFilterChanges)}
        onClearAll={clearAllFilters}
        onSave={() => {}}
        onApply={applyFilters}
      />
    </Box>
  );

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      slotProps={{
        paper: {
          sx: { overflow: 'hidden', borderRadius: 0 },
        },
      }}
    >
      {filterPaneContent}
    </Popover>
  );
}
