import { useState } from 'react';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Typography,
} from '@mui/material';
import { KpiRow } from './KpiRow';
import { FilterBar } from './FilterBar';
import { useFilters } from '../../context/FilterContext';

/**
 * Production: `AnalyticsDashboard` `customHeader` — KPI cards + filters on one row.
 */
export function DashboardToolbar() {
  const [saveOpen, setSaveOpen] = useState(false);
  const [saveName, setSaveName] = useState('');
  const [saveAccounts, setSaveAccounts] = useState('');
  const { addSegment } = useFilters();

  const handleCloseSave = () => {
    setSaveOpen(false);
    setSaveName('');
    setSaveAccounts('');
  };

  const handleSaveSegment = () => {
    addSegment({
      name: saveName,
      accountCount: saveAccounts === '' ? 0 : saveAccounts,
    });
    handleCloseSave();
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mt: '16px',
          gap: 1,
          flexWrap: 'nowrap',
          minWidth: 0,
        }}
      >
        {/* KPI strip can scroll; keep filters from shrinking away (minWidth:0 + shrink caused “blank” toolbar). */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            flexShrink: 1,
            minWidth: 0,
            overflowX: 'auto',
            pb: 0.5,
            '&::-webkit-scrollbar': { height: 6 },
          }}
        >
          <KpiRow onSaveSegment={() => setSaveOpen(true)} />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexShrink: 0, justifyContent: 'flex-end' }}>
          <FilterBar />
        </Box>
      </Box>

      <Dialog open={saveOpen} onClose={handleCloseSave} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontFamily: 'Roboto, sans-serif', fontWeight: 600 }}>Save segment</DialogTitle>
        <DialogContent sx={{ fontFamily: 'Roboto, sans-serif', fontSize: 14, display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
          <Typography sx={{ color: '#565e6e', fontSize: 14 }}>
            Adds a segment to the list (Analytics Lab — stored in browser session state only).
          </Typography>
          <TextField
            label="Segment name"
            size="small"
            fullWidth
            value={saveName}
            onChange={(e) => setSaveName(e.target.value)}
            autoFocus
          />
          <TextField
            label="Account count (optional)"
            size="small"
            fullWidth
            type="number"
            value={saveAccounts}
            onChange={(e) => setSaveAccounts(e.target.value)}
            inputProps={{ min: 0 }}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleCloseSave}>Cancel</Button>
          <Button variant="contained" disabled={!saveName.trim()} onClick={handleSaveSegment} sx={{ bgcolor: '#0C6AE9' }}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
