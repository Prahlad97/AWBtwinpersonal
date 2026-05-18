import { useState } from 'react';
import {
  Box,
  Button,
  Divider,
  Menu,
  MenuItem,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { Tooltip } from '@mui/material';

import { fontStyling } from './style-utils';
import { LAB_OTHER_IDS } from './constants';
import SaveAccounts from '../../assets/images/SaveAccounts.svg';
import dropDownIcon from '../../assets/images/dropdown.svg';
import InfoIcon from '../../assets/images/Info.svg';
import pinIcon from '../../assets/images/pin.svg';

const useStyles = makeStyles(() => ({
  AccountsContainer: {
    display: 'flex',
    width: '240px',
    border: '1px solid #D0D6E7',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  leftPane: {
    width: '130px',
    padding: '12px',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    height: '70px',
    boxSizing: 'border-box',
  },
  rightPane: {
    width: '120px',
    padding: '12px',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    height: '70px',
    boxSizing: 'border-box',
    cursor: 'pointer',
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
    alignItems: 'flex-end',
    width: '100%',
    justifyContent: 'space-between',
  },
  valueContainer: {
    marginTop: '4px',
    justifyContent: 'flex-start',
  },
  valueText: {
    ...fontStyling('Roboto, sans-serif', '18px', '700', '22px'),
    '& span': { transition: 'all 0.3s' },
  },
  labelText: {
    ...fontStyling('Roboto, sans-serif', '14px', '400', '20px'),
  },
  icon: {
    marginLeft: '16px',
    width: '20px',
    height: '20px',
  },
  Button: {
    minWidth: '0',
    padding: '0',
    '&.MuiButton-text': {
      padding: '0',
    },
    '&.MuiButton-root:hover': {
      backgroundColor: 'transparent',
    },
  },
  verticalDivider: {
    height: '43px',
    marginTop: '14px',
    marginBottom: '13px',
  },
  dropDownIcon: {
    width: '12px',
    height: '12px',
    cursor: 'pointer',
    marginLeft: '6px',
    marginTop: '4px',
  },
  pinIcon: {
    width: '16px',
    height: '16px',
    cursor: 'pointer',
    marginLeft: '4px',
  },
  IDText: {
    ...fontStyling('Roboto, sans-serif', '14px', '400', '20px'),
  },
  InfoIcon: {
    width: '16px',
    height: '16px',
    marginLeft: '4px',
    marginTop: '2px',
  },
  menuItem: {
    display: 'flex',
    flexDirection: 'column',
    padding: '12px',
    height: '70px',
    width: '120px',
    boxSizing: 'border-box',
    alignItems: 'flex-start',
  },
  menuItemHeader: {
    display: 'flex',
    alignItems: 'center',
  },
  menuDivider: {
    height: '43px',
    marginTop: '14px',
    marginBottom: '13px',
  },
}));

function countForId(values, id) {
  switch (id) {
    case 'ACCOUNTID':
      return values.customers;
    case 'PREMISEID':
      return values.premises;
    case 'METERID':
      return values.meters;
    default:
      return '—';
  }
}

/**
 * Vendored layout from production `accounts-V2.js` — fixture counts, no Looker queries.
 */
export default function AccountsKpi({ bidgelyIds, customers, premises, meters, onSaveSegment }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const openDropdown = Boolean(anchorEl);
  const [pinnedId, setPinnedId] = useState(LAB_OTHER_IDS[0]);

  const values = { customers, premises, meters };

  const handleChange = (item) => {
    setPinnedId(item);
    setAnchorEl(null);
  };

  const handleClose = () => setAnchorEl(null);

  const alternatives = LAB_OTHER_IDS.filter((item) => item.ID !== pinnedId.ID);

  return (
    <>
      <Box className={classes.AccountsContainer}>
        <Box className={classes.leftPane}>
          <Box className={classes.topRow}>
            <Typography component="div" className={classes.labelText}>
              Bidgely IDs
            </Typography>
            <Tooltip
              arrow
              placement="right"
              title="Bidgely ID uniquely identify users, generated from utility IDs like account, customer, premise, and contract IDs during project setup."
            >
              <img src={InfoIcon} className={classes.InfoIcon} alt="info" />
            </Tooltip>
          </Box>
          <Box className={classes.bottomRow}>
            <Box component="div" className={classes.valueContainer}>
              <Typography component="div" className={classes.valueText}>
                <span className="sticky-label">{bidgelyIds}</span>
              </Typography>
            </Box>
            <Button className={classes.Button} onClick={onSaveSegment} disableRipple>
              <img className={classes.icon} src={SaveAccounts} alt="save" />
            </Button>
          </Box>
        </Box>

        <Divider orientation="vertical" flexItem className={classes.verticalDivider} />

        <Box className={classes.rightPane} onClick={(e) => alternatives.length > 0 && setAnchorEl(e.currentTarget)}>
          <Box className={classes.topRow}>
            <Typography component="div" className={classes.IDText}>
              {pinnedId.Name}
            </Typography>
            {alternatives.length > 0 && (
              <img className={classes.dropDownIcon} src={dropDownIcon} alt="" />
            )}
          </Box>
          <Box className={classes.bottomRow}>
            <Box component="div" className={classes.valueContainer}>
              <Typography component="div" className={classes.valueText}>
                <span className="sticky-label">{countForId(values, pinnedId.ID)}</span>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {alternatives.length > 0 && (
        <Menu
          open={openDropdown}
          onClose={handleClose}
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          getContentAnchorEl={null}
          PaperProps={{
            style: {
              height: '70px',
              display: 'flex',
              flexDirection: 'row',
              padding: 0,
              overflow: 'visible',
            },
          }}
          MenuListProps={{
            style: {
              display: 'flex',
              flexDirection: 'row',
              padding: 0,
              height: '70px',
            },
          }}
        >
          {alternatives.map((item, index, filteredArray) => (
            <Box key={item.ID} style={{ display: 'flex' }}>
              <MenuItem className={classes.menuItem} onClick={() => handleChange(item)}>
                <Box className={classes.menuItemHeader}>
                  <Typography className={classes.IDText}>{item.Name}</Typography>
                  <img
                    src={pinIcon}
                    className={classes.pinIcon}
                    alt="pin"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleChange(item);
                    }}
                  />
                </Box>
                <Box component="div" className={classes.valueContainer}>
                  <Typography component="div" className={classes.valueText}>
                    <span className="sticky-label">{countForId(values, item.ID)}</span>
                  </Typography>
                </Box>
              </MenuItem>
              {index < filteredArray.length - 1 && (
                <Divider orientation="vertical" flexItem className={classes.menuDivider} />
              )}
            </Box>
          ))}
        </Menu>
      )}
    </>
  );
}
