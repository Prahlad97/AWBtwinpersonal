import { Box, Typography, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@material-ui/core/styles';

// ============== DCC Header (dcc-header.js) ==============

export const HeaderBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  padding: '12px 0',
});

export const TitleSection = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  '& .save-icon': {
    cursor: 'pointer',
  },
});

export const TitleText = styled(Typography)({
  fontSize: '20px',
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: '24px',
});

export const ActionButtonsBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '12px',
});

export const IconButtonStyled = styled('button')({
  backgroundColor: '#F4F6FA',
  color: '#1E232E',
  textTransform: 'none',
  fontWeight: 500,
  fontSize: '16px',
  lineHeight: '150%',
  boxShadow: 'none',
  display: 'flex',
  padding: '8px 12px',
  justifyContent: 'flex-end',
  alignItems: 'center',
  gap: '8px',
  borderRadius: '6px',
  border: 'none',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#F4F6FA',
    boxShadow: 'none',
  },
});

export const EditItemIconButton = styled(IconButton)({
  backgroundColor: '#FFFFFF !important',
  borderRadius: 4,
  padding: '0',
  '&:hover': {
    backgroundColor: '#FFFFFF !important',
  },
});

const headerComparisonNameSx = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  maxWidth: '400px',
};
const menuPaperSx = {
  marginTop: '4px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  borderRadius: 2,
  backgroundColor: '#FFFFFF',
};
const menuListSx = {
  p: 0,
  '&:hover': {
    backgroundColor: '#E8F0FE',
  },
};
const backIconSx = { width: 16, height: 16, cursor: 'pointer' };
const iconImgSmallSx = { width: 18 };
const iconImgChevronSx = { width: 20 };
const csvLinkSx = { display: 'none' };

export const dccHeaderStyles = {
  headerComparisonNameSx,
  menuPaperSx,
  menuListSx,
  backIconSx,
  iconImgSmallSx,
  iconImgChevronSx,
  csvLinkSx,
};

// ============== DCC Layout (dcc-layout.js) ==============

export const useLayoutStyles = makeStyles({
  tabControls: {
    paddingTop: 0,
  },
  circularProgress: {
    marginTop: '45px',
    display: 'flex',
    justifyContent: 'center',
  },
  circularProgressContainer: {
    minHeight: '80vh',
    justifyContent: 'center',
  },
});
