import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';

import { fontStyling } from '../../styles/style-utils';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Radio,
  RadioGroup,
  Checkbox,
  Divider,
  Typography,
  CircularProgress,
  Tooltip,
  Box,
} from '@mui/material';
import { OTHER_IDS_CONFIG } from '../../constants/index.js';
import { ExtensionContext } from '../../extension-context.js';

// Styles defined outside component

const dialogTitleContainerSx = {
  display: 'flex',
  gap: '8px',
  flexDirection: 'column',
  padding: '24px 24px 12px 24px !important',
};

const titleSx = {
  color: '#1E232E',
  ...fontStyling('Roboto, sans-serif', '20px', '600', '36px'),
};

const descriptionSx = {
  color: '#565E6E',
  ...fontStyling('Roboto, sans-serif', '16px', '400', '20px'),
};

const dialogContentSx = {
  display: 'flex',
  borderRadius: '8px',
  flexDirection: 'column',
  gap: '16px',
  padding: '24px 24px 0px 24px !important',
};

const mainInputSx = {
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#1D5ED8',
      borderWidth: '2px',
    },
  },
  '& .MuiInputLabel-root': {
    '&.Mui-focused': {
      color: '#1D5ED8',
    },
  },
};

const descriptionInputSx = {
  '& .MuiOutlinedInput-root': {
    height: '160px',
    alignItems: 'flex-start',
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#1D5ED8',
      borderWidth: '2px',
    },
  },
  '& .MuiOutlinedInput-input': {
    height: '100% !important',
    resize: 'none',
    overflow: 'auto',
  },
  '& .MuiInputBase-inputMultiline': {
    height: '100% !important',
    overflow: 'auto !important',
  },
};

const dividerSx = {
  backgroundColor: '#f4f4f4',
  marginTop: '24px',
};

const radioGroupContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
};

const uploadedTextStyle = {
  ...fontStyling('Roboto', '16px', '500', '20px'),
  color: '#51585B',
};

// Dynamic radio group styling based on number of items
const getRadioGroupSx = (itemCount) => ({
  color: '#51585B',
  ...fontStyling('Roboto', '16px', '400', '20px'),
  margin: '12px 0px 0px 0px',
  display: 'grid !important',
  gridTemplateColumns: itemCount <= 2 ? '1fr' : '1fr 1fr',
  gap: '8px 16px',
  '& .MuiFormControlLabel-root': {
    margin: 0,
  },
});

const dialogActionsSx = {
  padding: '16px 24px',
  paddingBottom: parent === 'dcc' && isPublished && !isRename ? 0 : '16px',
  display: 'flex',
  alignItems: 'center',
};

const checkboxSx = {
  color: '#747572',
  '&.Mui-checked': {
    color: '#1D5ED8',
  },
};

const publishCheckboxSx = {
  ...fontStyling('Roboto', '16px', '400', '20px'),
  color: '#1E232E',
};

const buttonsContainerStyle = {
  display: 'flex',
  gap: '16px',
  flex: '1',
  justifyContent: 'flex-end',
};

const cancelButtonSx = {
  backgroundColor: '#EFF5FF',
  color: '#1D5ED8',
  height: '48px',
  textTransform: 'none',
  padding: '12px 24px',
  fontSize: '16px',
  borderRadius: '6px',
  '&:hover': {
    backgroundColor: '#EFF5FF',
  },
};

const confirmButtonSx = {
  backgroundColor: '#1D5ED8',
  color: 'white',
  height: '48px',
  textTransform: 'none',
  padding: '12px 24px',
  fontSize: '16px',
  borderRadius: '6px',
  '&:hover': {
    backgroundColor: '#1D5ED8',
  },
};

// Add this helper function to get radio options based on pilot
const getRadioOptions = (allowedPilotName) => {
  const allowedIds = OTHER_IDS_CONFIG[allowedPilotName] || ['ACCOUNTID', 'PREMISEID', 'METERID'];

  const optionMap = {
    ACCOUNTID: { value: 'accountId', label: 'Account ID' },
    PREMISEID: { value: 'premiseId', label: 'Premise ID' },
    METERID: { value: 'sdpId', label: 'Meter ID/SDP ID' },
  };

  return allowedIds.map((id) => optionMap[id]).filter(Boolean);
};

const tooltipSx = {
  borderRadius: '6px',
  border: '1ps solid #DBE7FE',
  backgroundColor: '#EFF5FF',
  color: '#1E232E',
  ...fontStyling('Roboto, sans-serif', '14px', '400', '130%'),
};

const arrowContainerSx = {
  height: '8px',
  overflow: 'hidden',
  position: 'relative',
  width: '100%',
  padding: '0px 24px',
};

const arrowSx = {
  position: 'absolute',
  bottom: 0,
  left: '54.5px',
  width: '16px',
  height: '8px',
  '&::before': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 0,
    height: 0,
    borderLeft: '8px solid transparent',
    borderRight: '8px solid transparent',
    borderBottom: '8px solid #EFF5FF',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '-1px',
    left: '-1px',
    width: 0,
    height: 0,
    borderLeft: '9px solid transparent',
    borderRight: '9px solid transparent',
    borderBottom: '9px solid #DBE7FE',
    zIndex: -1,
  },
};

const infoBoxSx = {
  backgroundColor: '#EFF5FF',
  border: '1px solid #DBE7FE',
  borderRadius: '6px',
  padding: '16px',
  margin: '0px 24px 24px 24px',
};

const infoTextSx = {
  color: '#1E232E',
  ...fontStyling('Roboto, sans-serif', '14px', '400', '130%'),
  margin: 0,
};

const FormDialog = (props) => {
  const {
    title,
    label,
    confirm,
    cancel,
    open,
    value,
    descriptionValue,
    setOpen,
    onConfirm,
    validate,
    description,
    isUpload,
    isShared,
    isRename,
    isLoading,
    paperProps,
    disableOnEmpty,
    parent = '',
    trimLeadingSpaces = false,
    inputProps: inputPropsProp = {},
    ...rest
  } = props;

  // Get pilotId from context
  const {
    state: { pilotId, allowedPilotName },
  } = useContext(ExtensionContext);

  const [text, setText] = useState(value);
  const [descriptionText, setDescriptionText] = useState('');
  const [identifier, setIdentifier] = useState('accountId');
  const [isPublished, setIsPublished] = useState(true);
  const [error, setError] = useState({ state: false, msg: '' });

  useEffect(() => {
    if (open) {
      setText(value || '');
      setDescriptionText(descriptionValue || '');
      setIsPublished(isShared || false);
      setError({ state: false, msg: '' });
    }
    return () => {
      setText(value || '');
      setDescriptionText(descriptionValue || '');
      setIsPublished(isShared || false);
      setError({ state: false, msg: '' });
    };
  }, [open, value, descriptionValue, isShared]);

  const handleInputChange = async (event) => {
    let newText = event.target.value;
    if (trimLeadingSpaces) {
      newText = newText.trimStart();
    }
    setText(newText);

    // Validate on the go while typing
    if (validate) {
      const valid = await validate(newText);
      if (valid.validate) {
        setError({ state: false, msg: '' });
      } else {
        setError({ state: true, msg: valid.errorMsg });
      }
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleIdentifierChange = (event) => {
    setIdentifier(event.target.value);
  };

  const handlePublishedChange = (event) => {
    setIsPublished(event.target.checked);
  };
  const handleConfirm = async () => {
    if (!validate) {
      onConfirm(text, isPublished, descriptionText, identifier);
      return;
    }

    const valid = await validate(text);
    if (valid.validate) {
      setError({ state: false, msg: '' });
      onConfirm(text, isPublished, descriptionText, identifier);
    } else {
      setError({ state: true, msg: valid.errorMsg });
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      fullWidth={true}
      maxWidth={'xs'}
      PaperProps={paperProps}
      disableScrollLock={true}
      {...rest}
      disableEnforceFocus={true}
    >
      {title ? (
        <>
          <DialogTitle sx={dialogTitleContainerSx}>
            <Typography sx={titleSx}>{title}</Typography>
            {description && <Typography sx={descriptionSx}>{description}</Typography>}
          </DialogTitle>
        </>
      ) : null}
      <DialogContent sx={dialogContentSx}>
        <TextField
          error={error.state}
          autoFocus
          required
          label={label}
          variant='outlined'
          fullWidth
          sx={mainInputSx}
          onChange={handleInputChange}
          value={text}
          helperText={error.msg}
          inputProps={inputPropsProp}
        />
        <TextField
          variant='outlined'
          fullWidth
          multiline
          placeholder='Add a description'
          sx={descriptionInputSx}
          value={descriptionText}
          onChange={(event) => setDescriptionText(event.target.value)}
        />
        {Boolean(isUpload) && (
          <>
            <Divider sx={dividerSx} />
            <div style={radioGroupContainerStyle}>
              <span style={uploadedTextStyle}>Please Confirm what you have uploaded</span>
              {(() => {
                const radioOptions = getRadioOptions(allowedPilotName);
                const totalItems = radioOptions.length + 1; // +1 for Bidgely UUID option

                return (
                  <RadioGroup
                    aria-labelledby='demo-radio-buttons-group-label'
                    defaultValue='accountId'
                    name='radio-buttons-group'
                    value={identifier}
                    onChange={handleIdentifierChange}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                    }}
                    //sx={getRadioGroupSx(totalItems)}
                  >
                    {radioOptions.map((option) => (
                      <FormControlLabel
                        key={option.value}
                        value={option.value}
                        control={<Radio />}
                        label={option.label}
                        sx={{ width: '45%' }}
                      />
                    ))}
                    <FormControlLabel
                      value='uuid'
                      control={<Radio />}
                      label='Bidgely UUID'
                      sx={{ width: '45%' }}
                    />
                  </RadioGroup>
                );
              })()}
            </div>
            <Divider sx={dividerSx} />
          </>
        )}
      </DialogContent>
      {/* <Divider sx={dividerSx} /> */}
      <DialogActions sx={dialogActionsSx}>
        <div>
          {!isRename && (
            <FormControlLabel
              control={
                <Checkbox
                  sx={checkboxSx}
                  checked={isPublished}
                  onChange={handlePublishedChange}
                  color='primary'
                />
              }
              label='Publish'
              sx={publishCheckboxSx}
            />
          )}
        </div>
        <div style={buttonsContainerStyle}>
          <Button onClick={handleCancel} sx={cancelButtonSx} disabled={isLoading}>
            {cancel || 'Cancel'}
          </Button>
          <Button
            onClick={handleConfirm}
            variant='contained'
            sx={confirmButtonSx}
            disabled={isLoading || (disableOnEmpty && (!text || text.trim() === '')) || error.state}
          >
            {isLoading ? <CircularProgress size={20} sx={{ color: 'white' }} /> : confirm || 'OK'}
          </Button>
        </div>
      </DialogActions>
      {/* {parent === 'dcc' && isPublished && !isRename && (
        <>
          <Box sx={arrowContainerSx}>
            <Box sx={arrowSx} />
          </Box>
          <Box sx={infoBoxSx}>
            <Typography sx={infoTextSx}>
              Any segments or filters you add to this comparison later — if they are private — will
              be automatically published when you save.
            </Typography>
          </Box>
        </>
      )} */}
    </Dialog>
  );
};

FormDialog.propTypes = {
  title: PropTypes.string,
  label: PropTypes.string,
  confirm: PropTypes.string,
  cancel: PropTypes.string,
  value: PropTypes.string,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  onConfirm: PropTypes.func, // Function will receive (text, isPublished, identifier)
  validate: PropTypes.func,
  disableOnEmpty: PropTypes.bool, // If true, disables button when text is empty
  trimLeadingSpaces: PropTypes.bool, // If true, trims leading spaces on input (user cannot type leading spaces)
  inputProps: PropTypes.object, // Passed to the name input (e.g. maxLength for character limit)
};

export default FormDialog;
