import { makeStyles } from '@material-ui/core/styles';

export const useDccEmptyStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  buttons: {
    display: 'flex',
    gap: '12px',
    marginTop: '24px',
  },
  backButton: {
    display: 'flex',
    alignItems: 'center',
    color: 'rgb(24, 108 ,221)',
    backgroundColor: '#E8F0FC',
    fontSize: '14px',
    textTransform: 'none',
    padding: '8px 16px',
    '&:hover': {
      backgroundColor: '#E8F0FC',
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
