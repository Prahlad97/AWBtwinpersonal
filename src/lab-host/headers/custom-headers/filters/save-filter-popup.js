import { Box, Dialog, DialogTitle, Typography } from '@mui/material';

export default function SaveFilterPopup({ modalOpen, setModalOpen, onFilterSaved }) {
  return (
    <Dialog open={Boolean(modalOpen)} onClose={() => setModalOpen?.(false)} maxWidth="xs" fullWidth>
      <DialogTitle>
        <Typography sx={{ fontSize: 20, fontWeight: 600 }}>Save filter</Typography>
      </DialogTitle>
      <Box sx={{ px: 3, pb: 3 }}>
        <Typography sx={{ fontSize: 14, color: '#565E6E', mb: 2 }}>
          Analytics Lab — filter save is UI-only.
        </Typography>
        <Box
          component="button"
          type="button"
          onClick={() => {
            onFilterSaved?.();
            setModalOpen?.(false);
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
          Done
        </Box>
      </Box>
    </Dialog>
  );
}
