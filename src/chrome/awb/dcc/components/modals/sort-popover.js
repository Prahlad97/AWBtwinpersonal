import React, { useState } from 'react';
import {
  Box,
  Button,
  Paper,
  Popper,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Divider,
  Typography,
} from '@material-ui/core';
import { ArrowUpward, ArrowDownward } from '@material-ui/icons';
import SortIcon from '@/assets/images/sort-icon.svg';
import RadioCheckedIcon from '@/assets/images/radio-checked-icon.svg';
import RadioUnCheckedIcon from '@/assets/images/radio-unchecked-icon.svg';
import { Menu } from '@mui/material';
import CustomMenu from '@/components/customMenu';
import { useSortPopoverStyles } from './styles';
const SortOptions = [
  { value: 'name', label: 'Name' },
  { value: 'creationDate', label: 'Creation Date' },
];
const SortPopover = ({ onSortApply }) => {
  const classes = useSortPopoverStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOption, setSelectedOption] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleApply = () => {
    onSortApply?.({ option: selectedOption, direction: sortDirection });
    handleClose();
  };

  const open = Boolean(anchorEl);
  const id = open ? 'sort-popover' : undefined;

  return (
    <Box>
      <Box
        component='img'
        className={open ? classes.iconBackgroundActive : classes.iconBackground}
        src={SortIcon}
        alt='SortIcon'
        onClick={handleClick}
      />

      <CustomMenu
        paperClass={classes.popperPaper}
        id={id}
        open={open}
        anchorEl={anchorEl}
        // placement="bottom-start"
        handleClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Box>
          <Typography className={classes.sortByLabel}>Sort by</Typography>
          <FormControl component='fieldset' className={classes.formControl}>
            <RadioGroup
              value={selectedOption}
              onChange={(e) => {
                setSelectedOption(e.target.value);
                setSortDirection('asc');
              }}
            >
              {SortOptions?.map((option) => (
                <Box
                  key={option.value}
                  className={`${classes.optionWrapper} ${
                    selectedOption === option.value ? classes.selectedOption : ''
                  }`}
                >
                  <Box
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                      padding: '4px 8px',
                    }}
                  >
                    <FormControlLabel
                      value={option.value}
                      control={
                        <Radio
                          size='small'
                          icon={
                            <img src={RadioUnCheckedIcon} alt='unchecked' width={18} height={18} />
                          }
                          checkedIcon={
                            <img src={RadioCheckedIcon} alt='checked' width={18} height={18} />
                          }
                        />
                      }
                      label={option.label}
                      style={{
                        margin: 0,
                        display: 'flex',
                        alignItems: 'center',
                      }}
                      classes={{
                        label: `${classes.radioLabel} ${
                          selectedOption === option.value
                            ? classes.selectedLabel
                            : classes.unselectedLabel
                        }`,
                      }}
                    />
                    {selectedOption === option.value && (
                      <Box style={{ display: 'flex', gap: '4px' }}>
                        <Button
                          variant='outlined'
                          size='small'
                          onClick={() => setSortDirection('asc')}
                          className={
                            sortDirection === 'asc'
                              ? classes.selectedButtom
                              : classes.unSelectedButton
                          }
                          disableElevation
                          style={{ minWidth: '32px', padding: '4px' }}
                        >
                          <ArrowDownward fontSize='small' />
                        </Button>
                        <Button
                          variant='outlined'
                          size='small'
                          onClick={() => setSortDirection('desc')}
                          className={
                            sortDirection === 'desc'
                              ? classes.selectedButtom
                              : classes.unSelectedButton
                          }
                          disableElevation
                          style={{ minWidth: '32px', padding: '4px' }}
                        >
                          <ArrowUpward fontSize='small' />
                        </Button>
                      </Box>
                    )}
                  </Box>
                </Box>
              ))}
            </RadioGroup>
          </FormControl>
        </Box>

        <Divider />

        <Box className={classes.applyContainer}>
          <Button
            variant='contained'
            disableElevation
            onClick={handleApply}
            className={classes.applyButton}
          >
            Apply
          </Button>
        </Box>
      </CustomMenu>
    </Box>
  );
};

export default SortPopover;
