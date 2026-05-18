/**
 * Vendored from AWB `filter-modules/FilterPaneFooter.js`.
 * Lab: Saved Filters disabled (no Looker saved-filter APIs).
 */
import React from 'react';
import { Box, Button, Typography, makeStyles } from '@material-ui/core';
import Tooltip from '@mui/material/Tooltip';
import { fontStyling } from '../style-utils';
import SaveFilterBlue from '../../../assets/images/SaveFilterBlue.svg';
import FunnelSave from '../../../assets/images/funnel_save.svg';

const useStyles = makeStyles({
  footer: {
    padding: '12px 24px 24px 10px',
    display: 'flex',
    justifyContent: 'space-between',
    borderTop: '1px solid #e0e0e0',
    backgroundColor: 'white',
    width: '100%',
    position: 'sticky',
    bottom: 0,
    zIndex: 10,
    height: '84px',
  },
  leftSideBox: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
  },
  savedFiltersButton: {
    padding: '0px',
    '& .MuiButton-label': {
      display: 'flex',
      gap: '4px',
      padding: '12px 24px',
      backgroundColor: '#EFF5FF',
      color: '#1D5ED8',
      fontSize: '16px',
      fontWeight: 500,
      textTransform: 'none',
      borderRadius: '6px',
      border: 'none',
      cursor: 'pointer',
      alignItems: 'center',
    },
  },
  savedFiltersIcon: {
    width: '20px',
    height: '20px',
  },
  footerActions: {
    display: 'flex',
    gap: '12px',
  },
  filterLabels: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    maxWidth: '400px',
  },
  filterLabelText: {
    ...fontStyling('Roboto, sans-serif', '14px', '400', '20px'),
    color: '#B3BCD0',
    textOverflow: 'ellipsis',
    overflow: 'visible',
    whiteSpace: 'nowrap',
  },
  actionButton: {
    fontSize: '16px',
    fontWeight: 500,
    textTransform: 'none',
    padding: '12px 24px',
  },
  clearSaveButton: {
    backgroundColor: '#EFF5FF',
    color: '#1D5ED8',
    '&:hover': {
      backgroundColor: '#E1EBFA',
    },
  },
  applyButton: {
    backgroundColor: '#0C6AE9',
    color: '#FFFFFF',
    '&:hover': {
      backgroundColor: '#0A5BC9',
    },
  },
  saveButtonIcon: {
    marginRight: '8px',
    width: '16px',
    height: '16px',
    verticalAlign: 'middle',
  },
});

export default function LabFilterPaneFooter({ dateRangeLabel, filterLabel, onClearAll, onSave, onApply }) {
  const classes = useStyles();

  return (
    <Box className={classes.footer}>
      <Box className={classes.leftSideBox}>
        <Tooltip title="Saved filters require Looker APIs — disabled in Analytics Lab." arrow>
          <span>
            <Button className={classes.savedFiltersButton} disabled>
              <img src={FunnelSave} alt="" className={classes.savedFiltersIcon} />
              Saved Filters
            </Button>
          </span>
        </Tooltip>

        <Box className={classes.filterLabels}>
          <Typography className={classes.filterLabelText} title={filterLabel}>
            {filterLabel}
          </Typography>
          <Typography className={classes.filterLabelText} title={dateRangeLabel}>
            {dateRangeLabel}
          </Typography>
        </Box>
      </Box>

      <Box className={classes.footerActions}>
        <Button className={`${classes.actionButton} ${classes.clearSaveButton}`} onClick={onClearAll}>
          Clear All
        </Button>
        <Tooltip title="Save preset uses Looker in production — Lab no-op." arrow>
          <Button className={`${classes.actionButton} ${classes.clearSaveButton}`} onClick={() => onSave?.()}>
            <img src={SaveFilterBlue} alt="" className={classes.saveButtonIcon} />
            Save
          </Button>
        </Tooltip>
        <Button className={`${classes.actionButton} ${classes.applyButton}`} variant="contained" onClick={onApply}>
          Apply
        </Button>
      </Box>
    </Box>
  );
}
