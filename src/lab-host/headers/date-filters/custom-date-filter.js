import { Box } from '@mui/material';
import ChevronDownIcon from '@/assets/images/ChevronDown.svg';

/** Lab shim: shows timeframe string with production chevron affordance. */
export default function CustomDateRangeSelector({ timeInterval, updateTimeRange }) {
  const label = timeInterval || 'Select';
  return (
    <Box
      onClick={() => updateTimeRange?.(timeInterval || '2024/01/01 to 2024/12/31')}
      sx={{
        width: '100%',
        height: '100%',
        minWidth: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer',
        fontSize: 14,
        color: '#3A4245',
        fontFamily: 'Roboto, sans-serif',
        px: 0.5,
      }}
    >
      <Box component="span" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {label}
      </Box>
      <Box component="img" src={ChevronDownIcon} alt="" sx={{ width: 12, height: 12, ml: 0.5, flexShrink: 0 }} />
    </Box>
  );
}
