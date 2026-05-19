import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  Box,
  Checkbox,
  FormControlLabel,
  CircularProgress,
  Tooltip,
} from '@mui/material';
import { ExtensionContext as LookerSDKContext } from '../../providers/LookerExtensionMock.jsx';
import { fontStyling } from '../../styles/style-utils.js';

const confirmDialogSx = {
  width: '480px',
  margin: 'auto',
  borderRadius: '12px',
  width: '560px',
  '&.MuiDialog-paperWidthXs': {
    maxWidth: '560px',
  },
};

const confirmDialogTitleSx = {
  color: '#3A4245',
  ...fontStyling('Roboto', '20px', '600', '36px'),
  padding: '24px 24px 8px 24px',
};

const confirmDialogContentSx = {
  padding: '0px 24px 24px 24px',
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  borderBottom: '1px solid #EAEDF6',
};

const confirmDialogWithTextSx = {
  ...confirmDialogContentSx,
  gap: '16px',
};

const confirmDialogDescriptionSx = {
  color: '#51585B',
  ...fontStyling('Roboto', '16px', '400', '20px'),
};

const confirmDialogSegmentNameSx = {
  color: '#51585B',
  ...fontStyling('Roboto', '16px', '600', '20px'),
  lineHeight: '20px',
  marginBottom: '8px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  maxWidth: '100%',
};

const dialogActionsSx = {
  padding: '12px 24px 24px 24px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const confirmDialogOkSx = {
  backgroundColor: '#1D5ED8',
  color: '#FFFFFF',
  borderRadius: '6px',
  padding: '12px 24px 12px 24px',
  textTransform: 'none',
  ...fontStyling('Roboto', '16px', '500', '20px'),
};

const confirmDialogCancelSx = {
  backgroundColor: '#EFF5FF',
  color: '#1D5ED8',
  borderRadius: '6px',
  padding: '12px 24px 12px 24px',
  textTransform: 'none',
  ...fontStyling('Roboto', '16px', '500', '20px'),
};

const checkboxContainerSx = {
  display: 'flex',
  alignItems: 'center',
};

const checkboxSx = {
  color: '#B3BCD0',
  padding: '0px',
  width: '20px',
  height: '20px',
  '&.Mui-checked': {
    color: '#1D5ED8',
  },
  '& .MuiSvgIcon-root': {
    fontSize: 20,
    width: '20px',
    height: '20px',
  },
};

const checkboxLabelSx = {
  ...fontStyling('Roboto', '16px', '400', '20px'),
  color: '#1E232E',
  marginLeft: '4px',
};

const ConfirmDialog = (props) => {
  const {
    title,
    content,
    confirm,
    cancel,
    onConfirm,
    onCancel,
    open,
    setOpen,
    showCancel,
    segmentName,
    isShareDialog,
    isLoading,
    saveBtnSx,
    disableBackdropClick = false,
    extraText = '',
  } = props;
  const [dontAskAgain, setDontAskAgain] = useState(false);
  const extensionSDK = useContext(LookerSDKContext).extensionSDK;

  // Initialize checkbox state from local storage
  useEffect(() => {
    const initializeCheckboxState = async () => {
      try {
        const storedValue = await extensionSDK.localStorageGetItem('share_confirmation_show');
        if (storedValue === 'true') {
          setDontAskAgain(true);
        }
      } catch (error) {
        console.error('Error getting share_confirmation_show from localStorage:', error);
      }
    };

    if (open) {
      initializeCheckboxState();
    }
  }, [open, extensionSDK]);

  const handleCancel = () => {
    setOpen(false);
    onCancel && onCancel();
  }

  const handleConfirm = async () => {
    // Save to local storage if checkbox is checked
    if (dontAskAgain) {
      try {
        await extensionSDK.localStorageSetItem('share_confirmation_show', 'true');
      } catch (error) {
        console.error('Error setting share_confirmation_show in localStorage:', error);
      }
    }

    // setOpen(false)
    onConfirm && onConfirm(segmentName);
  };

  const handleCheckboxChange = (event) => {
    setDontAskAgain(event.target.checked);
  };

  const handleBackdropClick = (event) => {
    if (disableBackdropClick) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    handleCancel();
  };

  return (
    <Dialog
      sx={confirmDialogSx}
      open={open}
      onClose={handleBackdropClick}
      fullWidth={true}
      maxWidth={'xs'}
      PaperProps={{
        style: {
          maxWidth: '600px',
          width: '480px',
          margin: '0px',
          borderRadius: '12px',
        },
      }}
    >
      {title ? <DialogTitle sx={confirmDialogTitleSx}>{title}</DialogTitle> : <></>}
      <DialogContent sx={extraText ? confirmDialogWithTextSx : confirmDialogContentSx}>
        <DialogContentText sx={confirmDialogDescriptionSx}>{content}</DialogContentText>
        <Tooltip title={segmentName || ''} placement="top" arrow>
          <Box sx={confirmDialogSegmentNameSx}>{segmentName}</Box>
        </Tooltip>
        {extraText && (
          <Tooltip title={extraText} placement="top" arrow>
            <Box sx={confirmDialogSegmentNameSx}>{extraText}</Box>
          </Tooltip>
        )}
      </DialogContent>
      <DialogActions
        sx={isShareDialog ? dialogActionsSx : { ...dialogActionsSx, justifyContent: 'flex-end' }}
      >
        {isShareDialog && (
          <Box sx={checkboxContainerSx}>
            <FormControlLabel
              control={
                <Checkbox checked={dontAskAgain} onChange={handleCheckboxChange} sx={checkboxSx} />
              }
              sx={{ marginX: 0 }}
              label={<Typography sx={checkboxLabelSx}>Don't ask again</Typography>}
            />
          </Box>
        )}
        <Box sx={{ display: 'flex', gap: '8px' }}>
          <Button
            onClick={handleCancel}
            color='primary'
            variant='text'
            hidden={!showCancel}
            sx={confirmDialogCancelSx}
            disabled={isLoading}
          >
            {cancel || 'Cancel'}
          </Button>
          <Button
            onClick={handleConfirm}
            color='primary'
            variant='contained'
            sx={
              isShareDialog
                ? confirmDialogOkSx
                : { ...confirmDialogOkSx, backgroundColor: '#EF4444', ...(saveBtnSx || {}) }
            }
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={20} sx={{ color: 'white' }} /> : confirm || 'OK'}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

ConfirmDialog.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  confirm: PropTypes.string,
  onConfirm: PropTypes.func,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  showCancel: PropTypes.bool,
  segmentName: PropTypes.string,
  disableBackdropClick: PropTypes.bool,
};

export default ConfirmDialog;
