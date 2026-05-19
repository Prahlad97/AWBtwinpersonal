import { Box, Card, IconButton, Typography, Select, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

// ============== Common (shared by delta + demand curve cards) ==============

export const FieldRow = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '8px',
  alignSelf: 'stretch',
});

export const TitleSection = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
});

export const LabelIcon = styled(Box)({
  display: 'flex',
  width: '20px',
  height: '20px',
  justifyContent: 'center',
  alignItems: 'center',
  aspectRatio: '1 / 1',
});

export const ActionButton = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  aspectRatio: '1 / 1',
  cursor: 'pointer',
});

export const CheckUncheckButton = styled(Box)({
  width: '23px',
  height: '23px',
  padding: '4px',
  borderRadius: '4px',
  backgroundColor: '#FFFFFF',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
  cursor: 'pointer',
});

export const EditCurveName = styled(TextField)({
  '& input': {
    fontSize: '20px',
    fontWeight: 500,
    padding: 0,
    caretColor: 'black',
  },
});

export const editButtonSx = { marginLeft: '12px', width: '18px', height: '18px' };
export const deleteButtonSx = { marginLeft: '8px', width: '18px', height: '18px' };
export const checkIconSx = { color: '#1E232E' };

export const commonStyles = {
  editButtonSx,
  deleteButtonSx,
  checkIconSx,
};

// ============== Comparison card ==============

export const CardBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  cursor: 'pointer',
  backgroundColor: 'transparent',
  transition: 'background-color 0.2s ease-in-out',
  borderRadius: 0,
  '&:hover': {
    backgroundColor: '#E8F0FE',
  },
}));

export const HighlightedBox = styled(CardBox)({
  backgroundColor: '#E8F0FE !important',
});

export const EditItemIconButton = styled(IconButton)({
  backgroundColor: '#FFFFFF !important',
  borderRadius: 4,
  padding: '4px 8px',
  '&:hover': {
    backgroundColor: '#FFFFFF !important',
  },
});

export const IconWrapper = styled('img')({
  width: 25,
  height: 25,
  marginRight: 12,
});

export const SubtitleTypography = styled(Typography)({
  fontWeight: 600,
});

export const InfoRow = styled(Box)({
  paddingLeft: 37,
  marginTop: 4,
  gap: 8,
  display: 'flex',
  alignItems: 'center',
});

export const InfoItem = styled(Box)({
  gap: 8,
  display: 'flex',
  alignItems: 'center',
  marginRight: 8,
});

export const DescriptionTypography = styled(Typography)({
  paddingLeft: 37,
  marginTop: 4,
});

const comparisonNameSx = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  maxWidth: '600px',
};
const comparisonMenuPaperSx = {
  marginTop: '4px',
  boxShadow: '0px 2px 8px rgba(96, 97, 112, 0.16)',
  borderRadius: '8px',
  backgroundColor: '#FFFFFF',
  minWidth: '224px',
};
const comparisonMenuListSx = {
  p: 0,
  '&:hover': {
    backgroundColor: '#E8F0FE',
    borderRadius: '4px',
  },
};
const descriptionSx = { fontSize: '15px', mt: '4px' };

export const comparisonCardStyles = {
  comparisonNameSx,
  menuPaperSx: comparisonMenuPaperSx,
  menuListSx: comparisonMenuListSx,
  descriptionSx,
};

// ============== Delta curve card ==============

export const DeltaCard = styled(Card)({
  display: 'flex',
  padding: '12px 12px 12px 20px',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  gap: '4px',
  flex: '1 0 0',
  boxSizing: 'border-box',
  minWidth: '456px',
  minHeight: '192px',
  borderRadius: '8px !important',
  maxWidth: '50%',
  height: 'stretch',
});

export const DeltaLabel = styled(Typography)({
  fontSize: '16px !important',
  fontWeight: '400 !important',
  lineHeight: '150%',
  flex: '1 0 0',
});

export const DeltaSelect = styled(Select)({
  backgroundColor: '#fff',
  borderRadius: '6px',
  fontSize: '16px',
  fontWeight: '400 !important',
  lineHeight: '150%',
  display: 'flex',
  padding: '8px 12px',
  justifyContent: 'flex-end',
  alignItems: 'center',
  gap: '8px',
  flex: '1 0 0',
  height: '40px',
  maxWidth: '311px',
  '& .MuiSelect-select': {
    paddingTop: '8px',
    paddingBottom: '8px',
    paddingLeft: 0,
  },
});

export const InfoButton = styled('img')({
  width: '18px',
  height: '18px',
  cursor: 'pointer',
});

export const DeltaCurveName = styled(Typography)({
  margin: '0 !important',
  flex: '1 0 0',
});

const deltaTooltipSx = {
  bgcolor: '#0E0F13',
  borderRadius: '4px',
  px: 2,
  py: 1,
  fontSize: '14px',
  color: '#FFFFFF',
};
const deltaTooltipArrowSx = { color: '#0E0F13' };

export const deltaCurveCardStyles = {
  tooltipSx: deltaTooltipSx,
  tooltipArrowSx: deltaTooltipArrowSx,
  ...commonStyles,
};

// ============== Demand curve card ==============

export const DemandCard = styled(Card)({
  display: 'flex',
  padding: '12px 12px 12px 20px',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  gap: '4px',
  flex: '1 0 0',
  boxSizing: 'border-box',
  minWidth: '456px',
  minHeight: '192px',
  borderRadius: '8px !important',
  maxWidth: '50%',
});

export const DemandLabel = styled(Typography)({
  fontSize: '16px !important',
  fontWeight: '100 !important',
  flex: '1 0 0',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const SegmentSelectBox = styled(Box)({
  backgroundColor: '#fff',
  borderRadius: '6px !important',
  fontSize: '1rem',
  display: 'flex',
  padding: '8px 16px 8px 12px',
  justifyContent: 'flex-end',
  alignItems: 'center',
  gap: '8px',
  height: '40px',
  width: '311px',
  minWidth: '270px',
  flex: '0 1 311px',
  maxWidth: '311px',
  border: 'none !important',
  outline: 'none !important',
  '@media (max-width: 1100px)': {
    width: '206px',
    flex: '0 1 206px',
    maxWidth: '206px',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none !important',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    border: 'none !important',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    border: 'none !important',
  },
});

export const FilterButton = styled(Box)({
  backgroundColor: '#fff',
  borderRadius: '6px !important',
  fontSize: '1rem',
  display: 'flex',
  padding: '8px 16px 8px 12px',
  justifyContent: 'flex-end',
  alignItems: 'center',
  gap: '8px',
  height: '40px',
  width: '311px',
  minWidth: '270px',
  flex: '0 1 311px',
  maxWidth: '311px',
  border: 'none',
  outline: 'none',
  cursor: 'pointer',
  '@media (max-width: 1100px)': {
    width: '206px',
    flex: '0 1 206px',
    maxWidth: '206px',
  },
  '&:hover': {
    backgroundColor: '#f5f5f5',
  },
});

export const DemandCurveName = styled(Typography)({
  margin: '0 !important',
  minWidth: '150px',
  width: 'fit-content',
});

const demandSelectWidthSx = {
  width: '206px !important',
  flex: '0 1 206px !important',
  maxWidth: '206px !important',
};
const segmentSelectSx = { cursor: 'pointer', justifyContent: 'flex-start' };
const segmentLabelSx = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  flex: '1 1 0%',
  minWidth: 0,
};
const invertedBadgeSx = {
  flexShrink: 0,
  backgroundColor: '#1D5ED8',
  color: 'white',
  fontWeight: 500,
  fontSize: '12px',
  px: 1,
  py: 0.25,
  borderRadius: '4px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
};
const removeSegmentSx = {
  width: '18px',
  height: '18px',
  flexShrink: 0,
  cursor: 'pointer',
  ml: 0.5,
  '&:hover': { opacity: 0.8 },
};
const chevronSx = { width: '20px', height: '20px', flexShrink: 0 };
const filterPaneTriggerSx = {
  position: 'fixed',
  top: 'calc(50% - 275px)',
  left: '50%',
  transform: 'translateX(-50%)',
  width: 0,
  height: 0,
  pointerEvents: 'none',
};
const timeIntervalLabelSx = { minWidth: 'fit-content' };
const timeIntervalWrapperSx = {
  padding: 0,
  overflow: 'hidden',
  '@media (max-width: 1100px)': {
    width: '206px',
    flex: '0 1 206px',
    maxWidth: '206px',
  },
};

export const demandCurveCardStyles = {
  selectWidthSx: demandSelectWidthSx,
  segmentSelectSx,
  segmentLabelSx,
  invertedBadgeSx,
  removeSegmentSx,
  chevronSx,
  filterPaneTriggerSx,
  timeIntervalLabelSx,
  timeIntervalWrapperSx,
  ...commonStyles,
};
