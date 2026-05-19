import { Box, MenuItem, Typography, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@material-ui/core/styles';
import { fontStyling } from '@/styles/style-utils';

// ============== Common (shared by consumption + demand-curve-options) ==============

export const useCommonMenuStyles = makeStyles({
  applyButton: {
    backgroundColor: '#1D5ED8',
    fontSize: '13px',
    textTransform: 'none',
    padding: '6px 18px',
    fontWeight: 500,
    color: '#FFFFFF',
    '&:hover': {
      backgroundColor: '#1D5ED8',
    },
  },
  optionRow: {
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: '8px',
    padding: '8px',
    borderRadius: '6px',
    transition: 'background-color 0.2s ease',
  },
  selectedOptionRow: {
    backgroundColor: '#F2F8FE',
  },
  textBox: {
    flex: 1,
    marginTop: '5px',
    cursor: 'pointer',
  },
  labelText: {
    fontWeight: 400,
    marginBottom: '4px',
  },
  labelTextSelected: {
    fontWeight: 500,
  },
});

// ============== Edit comparison menu (edit-comparison.js) ==============

export const MenuItemWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  padding: '8px 4px',
});

export const StyledMenuItem = styled(MenuItem)({
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  fontWeight: 300,
  color: '#333',
  padding: '8px 12px',
  '&:hover': {
    backgroundColor: '#E8F0FE',
  },
  '&.Mui-disabled': {
    opacity: 0.5,
  },
});

export const IconContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: 24,
  minHeight: 24,
});

export const ImageIcon = styled('img')({
  width: 15,
  height: 15,
});

export const MenuItemText = styled(Typography)({
  flexGrow: 1,
});

export const MenuDivider = styled(Divider)({
  margin: '4px 0',
  borderColor: '#e0e0e0',
});

const editComparisonTooltipSx = {
  borderRadius: '6px',
  border: '1px solid #DBE7FE',
  backgroundColor: '#EFF5FF',
  color: '#1E232E',
  ...fontStyling('Roboto, sans-serif', '14px', '400', '130%'),
};

export const editComparisonMenuStyles = {
  tooltipSx: editComparisonTooltipSx,
};

// ============== Consumption options menu (consumption-options.js) ==============

export const useConsumptionOptionsMenuStyles = makeStyles({
  root: {
    padding: '10px',
    width: '100%',
    boxSizing: 'border-box',
  },
  labelText: {
    fontWeight: 400,
    marginBottom: '4px',
  },
  labelTextSelected: {
    fontWeight: 500,
  },
  subText: {
    fontSize: '12px',
    color: '#4F4F4F',
  },
  applyButton: {
    backgroundColor: '#1D5ED8',
    fontSize: '13px',
    textTransform: 'none',
    padding: '6px 18px',
    fontWeight: 500,
    color: '#FFFFFF',
    '&:hover': {
      backgroundColor: '#1D5ED8',
    },
  },
  optionRow: {
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: '8px',
    padding: '8px',
    borderRadius: '6px',
    transition: 'background-color 0.2s ease',
  },
  selectedOptionRow: {
    backgroundColor: '#F2F8FE',
  },
  textBox: {
    flex: 1,
    marginTop: '5px',
    cursor: 'pointer',
  },
});

// ============== Demand curve options menu (demand-curve-options.js) ==============

export const useDemandCurveOptionsMenuStyles = makeStyles({
  root: {
    padding: '10px',
    width: '100%',
    boxSizing: 'border-box',
    overflowY: 'auto',
  },
  labelText: {
    fontWeight: 400,
    marginBottom: '4px',
    fontSize: '15px',
  },
  labelTextSelected: {
    fontWeight: 500,
  },
  applyButton: {
    backgroundColor: '#1D5ED8',
    fontSize: '13px',
    textTransform: 'none',
    padding: '6px 18px',
    fontWeight: 500,
    color: '#FFFFFF',
    '&:hover': {
      fontWeight: 500,
      backgroundColor: '#1D5ED8',
    },
  },
  optionRow: {
    display: 'flex',
    alignItems: 'flex-start',
    padding: '8px',
    borderRadius: '6px',
    transition: 'background-color 0.2s ease',
  },
  selectedOptionRow: {
    backgroundColor: '#F2F8FE',
  },
  nestedButtons: {
    display: 'flex',
    gap: '8px',
    marginTop: '8px',
  },
  nestedBtn: {
    padding: '4px 10px',
    fontSize: '12px',
    minWidth: 0,
    fontWeight: 500,
    textTransform: 'none',
    border: '1px solid #ccc',
    borderRadius: '4px',
    '&.selected': {
      backgroundColor: '#1D5ED8',
      color: '#fff',
      border: '1px solid #1D5ED8',
    },
  },
  textBox: {
    flex: 1,
    marginTop: '7px',
    cursor: 'pointer',
  },
});
