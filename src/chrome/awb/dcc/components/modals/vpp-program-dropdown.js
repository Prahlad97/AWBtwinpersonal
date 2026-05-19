import React, { useState } from 'react';
import { Box } from '@material-ui/core';
import CustomMenu from '@/components/customMenu';
import { STANDARD_CALENDAR } from '@/headers/custom-headers/new-date-picker/date-picker-constants';
import { useVppProgramDropdownStyles, vppProgramDropdownStyles } from './styles';

const VppProgramDropdown = ({ anchorEl, setAnchorEl, VppPrograms, handleDropdownOptionClick }) => {
  const classes = useVppProgramDropdownStyles();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'vpp-dropdown' : undefined;

  return (
    <Box>
      <CustomMenu
        paperClass={classes.popperPaper}
        id={id}
        open={open}
        anchorEl={anchorEl}
        handleClose={handleClose}
      >
        <Box>
          <Box sx={vppProgramDropdownStyles.dropdownTextSx} onClick={() => handleDropdownOptionClick(STANDARD_CALENDAR)}>
            {STANDARD_CALENDAR?.program_name || 'Standard Calendar'}
          </Box>
          {VppPrograms.map((program) => (
            <Box
              key={program?.program_name}
              sx={vppProgramDropdownStyles.dropdownTextSx}
              onClick={() => handleDropdownOptionClick(program)}
            >
              {program?.program_name}
            </Box>
          ))}
        </Box>
      </CustomMenu>
    </Box>
  );
};

export default VppProgramDropdown;
