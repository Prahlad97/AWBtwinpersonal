/**
 * Vendored from AWB `filter-modules/AppliedFiltersPanel.js`.
 * Lab: `chartTitleMap` replaces ExtensionContext `customChartTitles`.
 */
import React from 'react';
import { Box, Typography, IconButton, Button, makeStyles } from '@material-ui/core';
import { fontStyling } from '../style-utils';
import CrossIcon from '../../../assets/images/cross.svg';
import { getFilterDisplayValue, shouldShowFilter } from './labFilterHelper';

const useStyles = makeStyles({
  leftPanel: {
    width: '315px',
    overflowY: 'auto',
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    height: '100%',
  },
  groupSection: {
    border: '1px solid #EAEDF6',
    borderRadius: '8px',
    padding: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    backgroundColor: '#FFFFFF',
    marginBottom: '4px',
    boxShadow: '0px 0.5px 2px 0px rgba(96, 97, 112, 0.16)',
    '&:hover': {
      backgroundColor: '#EFF5FF',
      border: '1px solid #EFF5FF',
    },
    '&.selected': {
      backgroundColor: '#EFF5FF',
      border: '2px solid #1D5ED8',
    },
  },
  groupHeader: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '16px',
    color: '#1E232E',
    fontWeight: 500,
    position: 'relative',
    '&:hover $groupClearButton': {
      display: 'inline-flex',
    },
  },
  groupNameContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  groupArrow: {
    fontSize: '16px',
    color: '#666',
    marginLeft: 'auto',
  },
  groupClearButton: {
    display: 'none',
    padding: '2px',
    minWidth: '12px',
    height: '12px',
    zIndex: 10,
    marginLeft: '4px',
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,0.05)',
    },
  },
  crossIcon: {
    width: '12px',
    height: '12px',
  },
  appliedFiltersInGroup: {
    marginTop: '12px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  appliedFilterContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '8px',
  },
  filterNameContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '6px',
    position: 'relative',
    '&:hover $filterClearButton': {
      display: 'inline-flex',
    },
  },
  filterName: {
    ...fontStyling('Roboto, sans-serif', '12px', '500', '16px'),
    color: '#1E232E',
    marginRight: '4px',
  },
  filterClearButton: {
    display: 'none',
    padding: '2px',
    minWidth: '12px',
    height: '12px',
    zIndex: 10,
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,0.05)',
    },
  },
  filterValuesContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    width: '100%',
  },
  filterTag: {
    display: 'flex',
    alignItems: 'center',
    padding: '1px 10px',
    backgroundColor: '#DBE7FE',
    borderRadius: '4px',
    color: '#1D5ED8',
    ...fontStyling('Roboto, sans-serif', '14px', '400', '20px'),
    position: 'relative',
    '&:hover': {
      backgroundColor: '#FDF2F8',
      color: '#9D174D',
      padding: '1px 2px',
    },
    '&:hover $tagRemoveButton': {
      display: 'inline-flex',
    },
  },
  tagRemoveButton: {
    display: 'none',
    marginLeft: '4px',
    padding: '0',
    minWidth: '12px',
    height: '12px',
    zIndex: 10,
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  tagCrossIcon: {
    width: '12px',
    height: '12px',
  },
  viewAllButton: {
    ...fontStyling('Roboto, sans-serif', '12px', '500', '16px'),
    color: '#1D5ED8',
    padding: '4px 8px',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    textDecoration: 'underline',
    textTransform: 'none',
  },
  searchedGroup: {},
  notSearchedGroup: {
    opacity: 0.5,
  },
});

export default function LabAppliedFiltersPanel({
  chartTitleMap = {},
  filteredDashboardFilters,
  appliedFilterGroups,
  selectedGroup,
  expandedFilters,
  searchTerm,
  hasGroupMatchingFilters,
  onSelectGroup,
  onClearGroup,
  onToggleExpand,
  onRemoveFilter,
  onRemoveFilterValue,
}) {
  const classes = useStyles();

  const stripQuotes = (val) => {
    return typeof val === 'string' ? val.replace(/^"(.*)"$/, '$1') : val;
  };

  const renderFilterTag = (filterName, value, index) => (
    <Box key={`${value}-${index}`} className={classes.filterTag}>
      {stripQuotes(value)}
      <IconButton
        size="small"
        className={classes.tagRemoveButton}
        onClick={(e) => {
          e.stopPropagation();
          onRemoveFilterValue(filterName, value);
        }}
      >
        <img src={CrossIcon} alt="remove" className={classes.tagCrossIcon} />
      </IconButton>
    </Box>
  );

  const renderAppliedFilter = (group, filterName, value) => {
    const displayValue = getFilterDisplayValue(value);

    let valueArray;
    if (Array.isArray(displayValue)) {
      valueArray = displayValue;
    } else if (typeof displayValue === 'string') {
      valueArray = [displayValue];
    } else {
      valueArray = [String(displayValue)];
    }

    const isExpanded = expandedFilters[`${group}-${filterName}`];
    const shouldShowViewAll = valueArray.length > 5;
    const displayValues =
      shouldShowViewAll && !isExpanded ? valueArray.slice(0, 5) : valueArray;

    return (
      <Box key={filterName} className={classes.appliedFilterContainer}>
        <Box className={classes.filterNameContainer}>
          <Typography className={classes.filterName}>
            {chartTitleMap[filterName] || filterName}
          </Typography>
          <IconButton
            size="small"
            className={classes.filterClearButton}
            onClick={(e) => {
              e.stopPropagation();
              onRemoveFilter(filterName);
            }}
          >
            <img src={CrossIcon} alt="remove" className={classes.crossIcon} />
          </IconButton>
        </Box>

        <Box className={classes.filterValuesContainer}>
          {displayValues.map((val, index) => renderFilterTag(filterName, val, index))}

          {shouldShowViewAll && (
            <Button
              className={classes.viewAllButton}
              onClick={(e) => {
                e.stopPropagation();
                onToggleExpand(group, filterName);
              }}
            >
              {isExpanded ? 'Show Less' : `View All (${valueArray.length})`}
            </Button>
          )}
        </Box>
      </Box>
    );
  };

  return (
    <Box className={classes.leftPanel}>
      {Object.keys(filteredDashboardFilters).map((group) => {
        const appliedFiltersInGroup = appliedFilterGroups[group] || {};
        const hasAppliedFilters = Object.keys(appliedFiltersInGroup).length > 0;

        return (
          <Box
            key={group}
            className={`${classes.groupSection} ${selectedGroup === group ? 'selected' : ''} ${
              searchTerm
                ? hasGroupMatchingFilters(group, searchTerm)
                  ? classes.searchedGroup
                  : classes.notSearchedGroup
                : ''
            }`}
            onClick={() => onSelectGroup(group)}
          >
            <Box className={classes.groupHeader}>
              <Box className={classes.groupNameContainer}>
                <span>{group}</span>
                {hasAppliedFilters && (
                  <IconButton
                    size="small"
                    className={classes.groupClearButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      onClearGroup(group);
                    }}
                  >
                    <img src={CrossIcon} alt="remove" className={classes.crossIcon} />
                  </IconButton>
                )}
              </Box>
              <span className={classes.groupArrow}>›</span>
            </Box>

            {hasAppliedFilters && (
              <Box className={classes.appliedFiltersInGroup}>
                {Object.entries(appliedFiltersInGroup)
                  .filter(([filterName, filterValue]) => shouldShowFilter(filterName, filterValue))
                  .map(([filterName, val]) => renderAppliedFilter(group, filterName, val))}
              </Box>
            )}
          </Box>
        );
      })}
    </Box>
  );
}
