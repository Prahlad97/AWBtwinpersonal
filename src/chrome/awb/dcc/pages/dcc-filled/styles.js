import { makeStyles } from '@material-ui/core/styles';

export const useDccFilledStyles = makeStyles({
  comparisonCard: {
    height: 'calc(100vh - 100px)',
    overflowY: 'auto',
    width: '58rem',
    paddingRight: 8,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '58rem',
    paddingTop: '16px',
    margin: '0 auto',
  },
  titleSection: {
    display: 'flex',
    alignItems: 'center',
  },
  iconBackground: {
    backgroundColor: '#F4F6FA',
    marginRight: '16px',
    borderRadius: '4px',
  },
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: 6,
    paddingLeft: 6,
    paddingRight: 6,
    height: 40,
    marginRight: 16,
    width: 220,
    border: '1px solid #ccc',
    transition: 'border-color 0.2s ease',
    position: 'relative',
    '& input': {
      border: 'none',
      outline: 'none',
      width: '100%',
      fontSize: 14,
      backgroundColor: 'transparent',
      fontFamily: 'inherit',
      marginLeft: 4,
    },
    '&:focus-within': {
      border: '2px solid rgb(24, 108, 221)',
    },
  },
  createButton: {
    backgroundColor: 'rgb(24, 108 ,221)',
    fontSize: '14px',
    padding: '8px 24px',
    textTransform: 'none',
    borderRadius: '6px',
    alignItems: 'center',
    '&:hover': {
      backgroundColor: 'rgb(24, 108 ,221)',
    },
  },
});

export const dccFilledStyles = {
  backIconSx: { width: 16, height: 16, marginRight: 2, cursor: 'pointer' },
  titleSx: { color: '#1E232E', fontWeight: 600 },
  searchIconSx: { width: 18, height: 18, mr: 0.5, ml: 0.5 },
};
