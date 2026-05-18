import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  palette: {
    primary: { main: '#186CDD' },
    text: { primary: '#1E232E', secondary: '#5c6b7a' },
  },
});

import { AWB } from './theme/awbTokens';

/** @deprecated use AWB from theme/awbTokens */
export const chrome = {
  headerBg: '#186CDD',
  tabActive: AWB.tabActiveAccent,
  border: AWB.border,
  panelBg: '#FFFFFF',
  pageBg: AWB.pageBg,
  filterBg: AWB.filterBg,
};
