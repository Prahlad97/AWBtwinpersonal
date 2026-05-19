import { makeStyles } from '@material-ui/core/styles';

// ============== Common (shared by filter-popover + sort-popover) ==============

export const commonModalStyles = {
  iconBackground: {
    backgroundColor: '#F4F6FA',
    marginRight: '16px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  iconBackgroundActive: {
    backgroundColor: '#DCE3F0',
    marginRight: '16px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

// ============== Filter popover (filter-popover.js) ==============

export const useFilterPopoverStyles = makeStyles((theme) => ({
  popoverPaper: {
    minWidth: 600,
    padding: theme.spacing(2),
    marginTop: theme.spacing(1),
    height: '65%',
    maxHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
  },
  contentRow: {
    display: 'flex',
    flex: 1,
    overflow: 'hidden',
  },
  tabsContainer: {
    width: 175,
    borderRight: '1px solid #eee',
    overflowY: 'auto',
    paddingTop: theme.spacing(1),
  },
  contentBox: {
    flex: 1,
    paddingLeft: theme.spacing(2),
    paddingTop: theme.spacing(1),
    overflowY: 'auto',
  },
  chip: {
    marginLeft: theme.spacing(1),
    backgroundColor: 'rgb(24, 108 ,221)',
    borderRadius: 2,
    height: 18,
    fontSize: '10px',
    lineHeight: 1.1,
    color: '#FFFFFF',
    minWidth: 'unset',
  },
  tabRoot: {
    width: '100%',
    textTransform: 'none',
    paddingRight: theme.spacing(1),
    textAlign: 'left',
    justifyContent: 'flex-start',
  },
  tabSelected: {
    backgroundColor: '#E8F0FE',
    fontWeight: 'bold',
    color: '#000',
  },
  list: {
    flex: 1,
    height: '85%',
    overflowY: 'auto',
  },
  clearApplyContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: theme.spacing(2),
    marginTop: theme.spacing(1),
  },
  iconBackground: {
    ...commonModalStyles.iconBackground,
    padding: '10px 12px',
  },
  iconBackgroundActive: {
    ...commonModalStyles.iconBackgroundActive,
    padding: '10px 12px',
  },
  listItem: {
    paddingLeft: 0,
    paddingTop: 1,
    paddingBottom: 1,
  },
  cancelButton: {
    color: '#1D5ED8',
    backgroundColor: '#EFF5FF',
    borderColor: '#dfe1e5',
    textTransform: 'none',
    fontSize: '13px',
    fontWeight: 500,
    padding: '8px 24px',
    height: '40px',
    border: '0',
    '&:hover': {
      backgroundColor: '#EFF5FF',
      borderColor: '#dfe1e5',
    },
  },
  saveButton: {
    backgroundColor: '#1D5ED8',
    fontSize: '13px',
    textTransform: 'none',
    padding: '8px 24px',
    height: '40px',
    fontWeight: 600,
    color: '#FFFFFF',
    '&:hover': {
      backgroundColor: '#1D5ED8',
    },
  },
  selectedItem: {
    backgroundColor: '#E8F0FC',
    fontWeight: 600,
    '&:hover': {
      backgroundColor: '#E8F0FC',
    },
  },
  listItemIcon: {
    minWidth: 0,
  },
  svgIcon: {
    width: 18,
    height: 18,
  },
}));

// ============== Sort popover (sort-popover.js) ==============

export const useSortPopoverStyles = makeStyles({
  iconBackground: {
    ...commonModalStyles.iconBackground,
    padding: '8px 13px',
  },
  iconBackgroundActive: {
    ...commonModalStyles.iconBackgroundActive,
    padding: '8px 13px',
  },
  popperPaper: {
    padding: '7px',
    marginTop: '8px',
    width: '275px',
    boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
  },
  formControl: {
    marginBottom: '16px',
    width: '100%',
  },
  applyButton: {
    backgroundColor: '#1D5ED8',
    fontSize: '13px',
    textTransform: 'none',
    padding: '8px 24px',
    height: '40px',
    fontWeight: 600,
    color: '#FFFFFF',
    '&:hover': {
      backgroundColor: '#1D5ED8',
    },
  },
  applyContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '8px',
  },
  optionWrapper: {
    width: '100%',
    borderRadius: '6px',
    transition: 'background-color 0.2s ease-in-out',
    '&:hover': {
      backgroundColor: '#F0F4FA',
    },
  },
  selectedOption: {
    backgroundColor: '#F2F8FE',
  },
  radioLabel: {
    fontSize: '15px',
  },
  selectedLabel: {
    fontWeight: '500 !important',
    color: '#000000',
  },
  selectedButtom: {
    backgroundColor: '#1D5ED8',
    fontSize: '13px',
    textTransform: 'none',
    fontWeight: 500,
    color: '#FFFFFF',
    '&:hover': {
      backgroundColor: '#1D5ED8',
    },
  },
  unSelectedButton: {
    color: '#1D5ED8',
    backgroundColor: '#EFF5FF',
    borderColor: '#dfe1e5',
    textTransform: 'none',
    fontSize: '13px',
    fontWeight: 500,
    '&:hover': {
      backgroundColor: '#EFF5FF',
      borderColor: '#dfe1e5',
    },
  },
  labelButtons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '8px',
    marginBottom: '12px',
  },
  sortByLabel: {
    fontWeight: 500,
    fontSize: '13px',
    marginLeft: 15,
    marginBottom: 6,
    marginTop: 8,
  },
});

// ============== VPP program dropdown (vpp-program-dropdown.js) ==============

export const useVppProgramDropdownStyles = makeStyles({
  popperPaper: {
    maxWidth: '17rem',
    maxHeight: '10rem',
    borderRadius: '8px',
    backgroundColor: '#FFFFFF',
    boxShadow: '-1px 2px 4px 0px #60617029,0px -1px 1px 0px #28293D0A',
  },
});

export const vppProgramDropdownStyles = {
  dropdownTextSx: {
    fontSize: '1rem',
    padding: '12px 16px',
    cursor: 'pointer',
  },
};
