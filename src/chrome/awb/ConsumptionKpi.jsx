import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Popover,
  Radio,
  RadioGroup,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { Tooltip } from '@mui/material';

import { fontStyling } from './style-utils';
import { CONSUMPTION_SELECT_FILTER_KEY, CONSUMPTION_SELECT_TOOLTIP } from './constants';
import { useLabExtension } from '../../providers/LabExtensionProvider';
import dropDownIcon from '../../assets/images/dropdown.svg';
import InfoIcon from '../../assets/images/Info.svg';

const useStyles = makeStyles(() => ({
  cardContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '164px',
    height: '70px',
    padding: '12px',
    borderRadius: '4px',
    border: '1px solid #D0D6E7',
    cursor: 'pointer',
    boxSizing: 'border-box',
    '&:hover': {
      backgroundColor: '#f5f5f5',
    },
  },
  topRow: {
    display: 'flex',
    alignItems: 'flex-start',
    width: '100%',
    justifyContent: 'space-between',
  },
  bottomRow: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    width: '100%',
  },
  valueContainer: {
    marginTop: '4px',
  },
  dropDownIcon: {
    width: '12px',
    height: '12px',
    marginTop: '4px',
  },
  valueText: {
    ...fontStyling('Roboto, sans-serif', '18px', '700', '22px'),
    '& span': { transition: 'all 0.3s' },
  },
  labelText: {
    ...fontStyling('Roboto, sans-serif', '14px', '400', '20px'),
  },
  cardContainerDropDown: {
    display: 'flex',
    flexDirection: 'column',
    width: '500px',
    padding: '8px',
    backgroundColor: '#FFFFFF',
    boxSizing: 'border-box',
  },
  topSection: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'stretch',
  },
  demandItem: {
    flex: 1,
    padding: '8px 16px',
  },
  verticalDivider: {
    margin: '0 8px',
  },
  horizontalDivider: {
    margin: '8px 0',
    width: '100%',
  },
  popover: {
    '& .MuiPopover-paper': {
      borderRadius: '8px',
      boxShadow: '0px 1px 4px 0px #0000000A, 0px 2px 12px 0px #0000001C',
      maxWidth: 'none',
      padding: '0',
      marginTop: '30px',
    },
  },
  demandLabel: {
    ...fontStyling('Roboto, sans-serif', '14px', '400', '20px'),
    marginBottom: '3px',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  demandValue: {
    ...fontStyling('Roboto, sans-serif', '24px', '700', '24px'),
  },
  infoIcon: {
    width: '16px',
    height: '16px',
    marginLeft: '4px',
    cursor: 'pointer',
  },
  selectRoot: {
    position: 'relative',
    width: '100%',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0 12px',
  },
  formLabel: {
    color: '#000000 !important',
    ...fontStyling('Roboto, sans-serif', '18px', 500, '22px'),
    marginBottom: '8px',
  },
  radioGroup: {
    marginLeft: '10px',
  },
  radio: {
    marginBottom: '8px',
    '&$checked': {
      color: '#0C6AE9',
    },
  },
  checked: {},
  radioLabel: {
    display: 'flex',
    flexDirection: 'column',
  },
  optionTitle: {
    ...fontStyling('Roboto, sans-serif', '16px', 500, '20px'),
    color: '#000000',
    marginTop: '15px',
  },
  optionDescription: {
    ...fontStyling('Roboto, sans-serif', '14px', 400, '18px'),
    color: '#666666',
    marginTop: '4px',
  },
  applyButton: {
    borderRadius: '4px',
    backgroundColor: '#0C6AE9',
    ...fontStyling('Roboto, sans-serif', '14px', 500, '16px'),
    padding: '8px 16px',
    color: '#FFFFFF',
    alignSelf: 'flex-end',
    marginTop: '8px',
    '&:hover': {
      backgroundColor: '#0A5AC7',
    },
  },
}));

/**
 * Vendored from production `total-consumption-v2.js` + `consumption-select-filter.js` — fixture values.
 */
export default function ConsumptionKpi({
  consumptionTotal,
  consumptionAvg,
  netDemandTotal,
  netDemandAvg,
}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [selectedConsumptionMode, setSelectedConsumptionMode] = useState('total');

  const {
    state: { lookerFilters, isDashboardLoading, isSolarAvailable },
    actions: { updateLookerFilter },
  } = useLabExtension();

  const isAvg = lookerFilters[CONSUMPTION_SELECT_FILTER_KEY] === 'avg';

  const cardValue = isAvg ? consumptionAvg : consumptionTotal;
  const netDisplay = isAvg ? netDemandAvg : netDemandTotal;
  const grossDisplay = cardValue;

  useEffect(() => {
    const v = lookerFilters[CONSUMPTION_SELECT_FILTER_KEY];
    if (v === 'avg' || v === 'total') {
      setSelectedConsumptionMode(v);
    }
  }, [lookerFilters]);

  const handleClick = (e) => {
    if (!isDashboardLoading) {
      setAnchorEl(e.currentTarget);
    }
  };

  const handleClose = () => setAnchorEl(null);

  const handleApplyConsumptionSelect = () => {
    updateLookerFilter({
      ...lookerFilters,
      [CONSUMPTION_SELECT_FILTER_KEY]: selectedConsumptionMode,
    });
    handleClose();
  };

  const totalTip = isSolarAvailable ? CONSUMPTION_SELECT_TOOLTIP.TOTAL_W_SOLAR : CONSUMPTION_SELECT_TOOLTIP.TOTAL_WO_SOLAR;
  const avgTip = isSolarAvailable ? CONSUMPTION_SELECT_TOOLTIP.AVG_W_SOLAR : CONSUMPTION_SELECT_TOOLTIP.AVG_WO_SOLAR;

  return (
    <>
      <Box
        className={classes.cardContainer}
        onClick={handleClick}
        style={{ cursor: isDashboardLoading ? 'default' : 'pointer', opacity: isDashboardLoading ? 0.6 : 1 }}
      >
        <Box className={classes.topRow}>
          <Typography component="div" className={classes.labelText}>
            {isAvg ? 'Avg. Consumption' : 'Consumption'}
          </Typography>
          <img className={classes.dropDownIcon} src={dropDownIcon} alt="" />
        </Box>
        <Box className={classes.bottomRow}>
          <Box component="div" className={classes.valueContainer}>
            <Typography component="div" className={classes.valueText}>
              <span className="sticky-label">{cardValue}</span>
            </Typography>
          </Box>
        </Box>
      </Box>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        className={classes.popover}
      >
        <Box className={classes.cardContainerDropDown}>
          <Box className={classes.topSection}>
            <Box className={classes.demandItem}>
              <Typography component="div" className={classes.demandLabel}>
                {isAvg ? 'Avg. Net Demand' : 'Net Demand'}
                <Tooltip
                  arrow
                  placement="right"
                  title="Total consumption from the grid, excluding usage covered by on-site sources like solar"
                >
                  <img src={InfoIcon} className={classes.infoIcon} alt="" />
                </Tooltip>
              </Typography>
              <Typography component="div" className={classes.demandValue}>
                <span>{netDisplay}</span>
              </Typography>
            </Box>
            <Divider orientation="vertical" flexItem className={classes.verticalDivider} />
            <Box className={classes.demandItem}>
              <Typography component="div" className={classes.demandLabel}>
                {isAvg ? 'Avg. Gross Demand' : 'Gross Demand'}
                <Tooltip
                  arrow
                  placement="right"
                  title="Total consumption by all appliances, including energy from both the grid and on-site sources like solar"
                >
                  <img src={InfoIcon} className={classes.infoIcon} alt="" />
                </Tooltip>
              </Typography>
              <Typography component="div" className={classes.demandValue}>
                <span>{grossDisplay}</span>
              </Typography>
            </Box>
          </Box>

          <Divider className={classes.horizontalDivider} />

          <Box className={classes.selectRoot}>
            <FormControl component="fieldset" className={classes.formGroup}>
              <FormLabel className={classes.formLabel} id="consumption-select-label">
                Consumption Select
              </FormLabel>
              <RadioGroup
                aria-labelledby="consumption-select-label"
                name="consumption-select"
                value={selectedConsumptionMode}
                onChange={(e) => setSelectedConsumptionMode(e.target.value)}
                className={classes.radioGroup}
              >
                <FormControlLabel
                  value="total"
                  control={<Radio disableRipple classes={{ root: classes.radio, checked: classes.checked }} />}
                  label={
                    <Box className={classes.radioLabel}>
                      <Typography className={classes.optionTitle}>Total Consumption</Typography>
                      <Typography className={classes.optionDescription}>{totalTip}</Typography>
                    </Box>
                  }
                />
                <FormControlLabel
                  value="avg"
                  control={<Radio disableRipple classes={{ root: classes.radio, checked: classes.checked }} />}
                  label={
                    <Box className={classes.radioLabel}>
                      <Typography className={classes.optionTitle}>Average Consumption</Typography>
                      <Typography className={classes.optionDescription}>{avgTip}</Typography>
                    </Box>
                  }
                />
              </RadioGroup>
              <Button variant="contained" color="primary" onClick={handleApplyConsumptionSelect} className={classes.applyButton}>
                Apply
              </Button>
            </FormControl>
          </Box>
        </Box>
      </Popover>
    </>
  );
}
