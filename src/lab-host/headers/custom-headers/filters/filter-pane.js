import { Box, Popover } from '@mui/material';
import LabFilterPane from '../../../../chrome/awb/filters/LabFilterPane.jsx';

/** Lab shim: production FilterPane layout with vendored Lab filter UI. */
export default function FilterPane({ anchorEl, open, setOpen, onClose, onApplyFilters }) {
  const handleClose = () => {
    setOpen?.(false);
    onClose?.();
  };

  return (
    <Popover
      open={Boolean(open)}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorReference="anchorPosition"
      anchorPosition={{
        top: window.innerHeight / 2 - 275,
        left: window.innerWidth / 2 - 415,
      }}
      transformOrigin={{ vertical: 'center', horizontal: 'center' }}
      slotProps={{
        paper: {
          sx: {
            width: 830,
            height: 550,
            overflow: 'hidden',
            borderRadius: 0,
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          },
        },
      }}
    >
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <LabFilterPane />
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end', gap: 1, borderTop: '1px solid #EAEDF6' }}>
          <Box
            component="button"
            type="button"
            onClick={handleClose}
            sx={{ border: 'none', bgcolor: 'transparent', cursor: 'pointer', fontSize: 14 }}
          >
            Cancel
          </Box>
          <Box
            component="button"
            type="button"
            onClick={() => {
              onApplyFilters?.({});
              handleClose();
            }}
            sx={{
              border: 'none',
              bgcolor: '#186CDD',
              color: '#fff',
              borderRadius: '4px',
              px: 2,
              py: 1,
              cursor: 'pointer',
              fontSize: 14,
            }}
          >
            Apply
          </Box>
        </Box>
      </Box>
    </Popover>
  );
}
