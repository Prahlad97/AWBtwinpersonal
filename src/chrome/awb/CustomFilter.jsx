import { useEffect, useMemo, useState } from 'react';
import {
  Box,
  FormControl,
  Button,
  Radio,
  FormControlLabel,
  RadioGroup,
  FormLabel,
  makeStyles,
  FormGroup,
  Checkbox,
  Tooltip,
  ClickAwayListener,
} from '@material-ui/core';
import { isEmpty } from 'lodash';

import { fontStyling } from './style-utils';
import CustomMenu from './customMenu';
import { CUSTOM_FILTERS } from './constants';
import { getFilterLabel } from './filter-helper';
import { useLabExtension } from '../../providers/LabExtensionProvider';
import InfoIcon from '../../assets/images/Info.svg';

/** Module-level makeStyles — required for React 18 (do not call makeStyles inside the component). */
const useStyles = makeStyles({
  filtersContainer: {
    display: 'flex',
    justifyContent: ({ derGridHeader: grid }) => (grid ? 'flex-start' : 'flex-end'),
    backgroundColor: '#F3F6FA',
    padding: ({ derGridHeader: grid }) => (grid ? '8px 8px' : '8px 12px'),
    minWidth: ({ derGridHeader: grid }) => (grid ? '75px' : undefined),
    maxWidth: ({ derGridHeader: grid }) => (grid ? 'none' : undefined),
    boxSizing: 'border-box',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  filtersDropdown: {
    borderRadius: '4px',
    backgroundColor: '#FFFFFF',
    border: '1px solid #BDBFC0',
    position: 'relative',
    '& .MuiFormControl-root': {
      position: 'revert',
    },
  },
  filterBtn: {
    opacity: ({ isDashboardLoading }) => (isDashboardLoading ? '50%' : '100%'),
    padding: '0px 0px',
    '& .MuiButton-label': {
      color: ({ isDashboardLoading }) => (isDashboardLoading ? '#B3BCD0' : '#1E232E'),
      ...fontStyling('Roboto, sans-serif', '16px', 400, '24px'),
      textTransform: 'none',
      backgroundColor: '#F3F6FA',
      padding: '0px 0px',
      borderRadius: '6px',
      display: 'flex',
      alignItems: 'center',
      gap: '9px',
    },
    '&.MuiButton-root:hover': {
      backgroundColor: 'transparent',
    },
  },
  formLabel: {
    color: '#000000 !important',
    ...fontStyling('Roboto, sans-serif', '20px', 500, '24px'),
  },
  formControlLabel: {
    color: '#000000',
    minWidth: '125px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'row',
    gap: '40px',
    padding: '40px 34px',
  },
  submitBtn: {
    borderRadius: '4px',
    backgroundColor: '#0C6AE9',
    ...fontStyling('Roboto, sans-serif', '14px', 500, '16px'),
    position: 'absolute',
    padding: '10px 13px',
    bottom: '8px',
    right: '17.5px',
  },
  radio: {
    '&$checked': {
      color: '#0C6AE9',
    },
  },
  checked: {},
  checkbox: {
    color: '#747572',
    '&.Mui-checked': {
      color: '#0C6AE9',
    },
  },
  labelWithTooltip: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  infoIcon: {
    width: '16px',
    height: '16px',
    cursor: 'pointer',
  },
});

/**
 * Vendored from production `custom-filter.js` — uses LabExtensionContext instead of ExtensionContext.
 */
export default function CustomFilter({ derGridHeader = false }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const {
    state: { lookerFilters, isDashboardLoading },
    actions: { updateLookerFilter },
  } = useLabExtension();

  const classes = useStyles({ derGridHeader: !!derGridHeader, isDashboardLoading });
  const [filters, setFilters] = useState({
    'Premise Type': '',
    'Meter Type': '',
    'Fuel Type': '',
  });

  const setUpFilters = () => {
    const premiseTypes = lookerFilters[CUSTOM_FILTERS.PREMISE]
      ? lookerFilters[CUSTOM_FILTERS.PREMISE].split(',')
      : [];
    const defaultPremiseTypes = premiseTypes.length > 0 ? premiseTypes : ['Residential'];

    setFilters({
      'Premise Type': defaultPremiseTypes,
      'Meter Type': lookerFilters[CUSTOM_FILTERS.METER],
      'Fuel Type': lookerFilters[CUSTOM_FILTERS.FUEL],
    });
  };

  useEffect(() => {
    if (!isEmpty(lookerFilters)) {
      setUpFilters();
    }
  }, [lookerFilters]);

  const handleClick = (event) => {
    if (lookerFilters) {
      setUpFilters();
    }
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    if (lookerFilters) {
      setUpFilters();
    }
    setAnchorEl(null);
  };

  const handleFilterChange = (type, e) => {
    setFilters((prev) => ({ ...prev, [type]: e.target.value }));
  };

  const handleCheckboxChange = (type, e) => {
    const { name, checked } = e.target;
    let premiseData = filters[type] || [];

    if (checked) {
      if (!premiseData.includes(name)) {
        premiseData.push(name);
      }
    } else {
      const filteredData = filters[type].filter((value) => value != name);
      if (filteredData.length === 0) {
        return;
      }
      premiseData = filteredData;
    }

    setFilters((prev) => ({ ...prev, [type]: premiseData }));
  };

  const handleSubmit = () => {
    const premiseValue = Array.isArray(filters[CUSTOM_FILTERS.PREMISE])
      ? filters[CUSTOM_FILTERS.PREMISE].join(',')
      : filters[CUSTOM_FILTERS.PREMISE];
    updateLookerFilter({
      ...lookerFilters,
      [CUSTOM_FILTERS.PREMISE]: premiseValue,
      [CUSTOM_FILTERS.METER]: filters[CUSTOM_FILTERS.METER],
      [CUSTOM_FILTERS.FUEL]: filters[CUSTOM_FILTERS.FUEL],
    });
    handleClose();
  };

  const filterLabel = useMemo(() => getFilterLabel(lookerFilters), [lookerFilters]);

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Box>
        <Box
          className={classes.filtersContainer}
          onClick={handleClick}
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <Button
            id="basic-button"
            disableRipple
            disabled={isDashboardLoading}
            className={classes.filterBtn}
          >
            <div style={derGridHeader ? { whiteSpace: 'nowrap' } : undefined}>{filterLabel}</div>
          </Button>
        </Box>
        <CustomMenu anchorEl={anchorEl} open={open} handleClose={handleClose} listClassName={classes.filtersDropdown}>
          <FormControl>
            <Box className={classes.formGroup}>
              <Box>
                <Box className={classes.labelWithTooltip}>
                  <FormLabel className={classes.formLabel} id="premise-filter--label">
                    Premise Type
                  </FormLabel>
                  <Tooltip title="At least one premise type must be selected" arrow placement="right">
                    <img src={InfoIcon} className={classes.infoIcon} alt="info icon" />
                  </Tooltip>
                </Box>
                <FormGroup column>
                  <FormControlLabel
                    className={classes.formControlLabel}
                    control={
                      <Checkbox
                        className={classes.checkbox}
                        name="Residential"
                        checked={filters[CUSTOM_FILTERS.PREMISE]?.includes('Residential')}
                        onChange={(e) => handleCheckboxChange(CUSTOM_FILTERS.PREMISE, e)}
                      />
                    }
                    label="Residential"
                  />
                  <FormControlLabel
                    className={classes.formControlLabel}
                    control={
                      <Checkbox
                        className={classes.checkbox}
                        name="Business"
                        checked={filters[CUSTOM_FILTERS.PREMISE]?.includes('Business')}
                        onChange={(e) => handleCheckboxChange(CUSTOM_FILTERS.PREMISE, e)}
                      />
                    }
                    label="Business"
                  />
                </FormGroup>
              </Box>
              <Box>
                <FormLabel className={classes.formLabel} id="meter-filter--label">
                  Meter Type
                </FormLabel>
                <RadioGroup
                  column
                  value={filters['Meter Type']}
                  aria-labelledby="Meter-filter--label"
                  name="meter-radio-buttons-group"
                  onChange={(e) => handleFilterChange(CUSTOM_FILTERS.METER, e)}
                >
                  <FormControlLabel
                    className={classes.formControlLabel}
                    value="AMI"
                    control={<Radio disableRipple classes={{ root: classes.radio, checked: classes.checked }} />}
                    label="AMI"
                  />
                  <FormControlLabel
                    className={classes.formControlLabel}
                    value="NSM"
                    control={<Radio disableRipple classes={{ root: classes.radio, checked: classes.checked }} />}
                    label="NSM"
                  />
                </RadioGroup>
              </Box>
              <Box>
                <FormLabel className={classes.formLabel} id="fuel-filter--label">
                  Fuel Type
                </FormLabel>
                <RadioGroup
                  column
                  value={filters['Fuel Type']}
                  aria-labelledby="fuel-filter--label"
                  name="fuel-radio-buttons-group"
                  onChange={(e) => handleFilterChange(CUSTOM_FILTERS.FUEL, e)}
                >
                  <FormControlLabel
                    className={classes.formControlLabel}
                    value="Electricity"
                    control={<Radio disableRipple classes={{ root: classes.radio, checked: classes.checked }} />}
                    label="Electricity"
                  />
                  <FormControlLabel
                    className={classes.formControlLabel}
                    value="Gas"
                    control={<Radio disableRipple classes={{ root: classes.radio, checked: classes.checked }} />}
                    label="Gas"
                  />
                </RadioGroup>
              </Box>
            </Box>
            <Button
              color="primary"
              variant="contained"
              type="submit"
              className={classes.submitBtn}
              onClick={handleSubmit}
            >
              Apply
            </Button>
          </FormControl>
        </CustomMenu>
      </Box>
    </ClickAwayListener>
  );
}
