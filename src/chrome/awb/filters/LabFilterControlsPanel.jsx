/**
 * Lab stand-in for AWB `FilterControlsPanel.js` — no `@looker/filter-components`.
 * Renders enumerations for common filters; free-text for others (mirrors dashboard field names).
 */
import React from 'react';
import {
  Box,
  Typography,
  makeStyles,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@material-ui/core';
import { fontStyling } from '../style-utils';
import { groupByTabConfig } from './labDashboardFilterConfig';

/** Static options aligned with production filter names / chrome. */
export const LAB_FILTER_ENUM_OPTIONS = {
  'Premise Type': ['Residential', 'Business'],
  'Meter Type': ['AMI', 'AMR'],
  'Fuel Type': ['Electricity', 'Gas'],
  'Consumption Select': ['total', 'avg'],
  'User Status': ['Active', 'Inactive', 'Pending'],
  'User ID Type Filter': ['accountId', 'uuid', 'premiseId'],
  'Rate Plan': ['001WA', '101WA', '012WA', '011WA', '032WA', '002WA', '102WA', '111WA'],
};

const useStyles = makeStyles({
  rightPanel: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    height: '100%',
  },
  filtersContent: {
    flex: 1,
    overflowY: 'auto',
    padding: '20px',
    scrollBehavior: 'smooth',
    height: '100%',
  },
  filterItem: {
    fontSize: '14px',
    marginBottom: '16px',
    '&.highlight': {
      backgroundColor: '#e3f2fd',
      borderRadius: '4px',
      padding: '8px',
    },
    '&.fade': {
      opacity: 0.5,
    },
  },
  customFilterTitle: {
    marginBottom: '4px',
    paddingBottom: '4px',
    fontWeight: 500,
    fontSize: '12px',
    color: '#343C42',
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
  },
});

export default function LabFilterControlsPanel({
  filteredDashboardFilters,
  selectedGroup,
  searchTerm,
  localFilterChanges,
  filterRefs,
  onFilterChange,
}) {
  const classes = useStyles();

  if (!selectedGroup || !filteredDashboardFilters[selectedGroup]) {
    return (
      <Box className={classes.rightPanel}>
        <Box className={classes.filtersContent}>
          <Typography style={{ ...fontStyling('Roboto, sans-serif', '14px', '400', '20px'), color: '#565e6e' }}>
            Select a filter group.
          </Typography>
        </Box>
      </Box>
    );
  }

  const filters = filteredDashboardFilters[selectedGroup];

  return (
    <Box className={classes.rightPanel}>
      <Box className={classes.filtersContent}>
        {filters.map((filter) => {
          const filterKey = `${selectedGroup}-${filter.name}`;
          const matchesSearch =
            searchTerm && filter.name.toLowerCase().includes(searchTerm.toLowerCase());
          const fadeSearch = searchTerm && !matchesSearch;
          const value = localFilterChanges[filter.name] ?? '';
          const enums = LAB_FILTER_ENUM_OPTIONS[filter.name];

          return (
            <Box
              key={filter.name}
              ref={(el) => {
                filterRefs.current[filterKey] = el;
              }}
              className={`${classes.filterItem} ${matchesSearch ? 'highlight' : ''} ${fadeSearch ? 'fade' : ''}`}
            >
              <Typography className={classes.customFilterTitle}>{filter.name}</Typography>
              {enums ? (
                <RadioGroup
                  value={typeof value === 'string' ? value : ''}
                  onChange={(e) => onFilterChange(filter.name)(e.target.value)}
                >
                  <Box display="flex" flexDirection="row" flexWrap="wrap">
                    {enums.map((opt) => (
                      <FormControlLabel
                        key={opt}
                        value={opt}
                        control={<Radio color="primary" size="small" />}
                        label={opt}
                      />
                    ))}
                  </Box>
                </RadioGroup>
              ) : (
                <TextField
                  fullWidth
                  size="small"
                  variant="outlined"
                  value={value}
                  placeholder="Enter value (Lab — plain text)"
                  onChange={(e) => onFilterChange(filter.name)(e.target.value)}
                  multiline={filter.name === 'User ID Filter Values'}
                  minRows={filter.name === 'User ID Filter Values' ? 2 : 1}
                />
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
