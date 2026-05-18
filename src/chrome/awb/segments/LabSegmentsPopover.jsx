/**
 * Analytics Lab segments popover — layout from AWB `segments/segments.js`
 * + selected list pattern from `selected-segments-section.js`, without Looker/APIs.
 */
import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItemButton,
  ListItemText,
  Popover,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from '@mui/material';

import InfoIcon from '../../../assets/images/Infoicon_customFilter.svg';
import PlusIcon from '../../../assets/images/plus-icon.svg';
import { useFilters } from '../../../context/FilterContext';
import { SEGMENT_TYPES } from './labSegmentConstants';

const popoverContentSx = { width: '1000px' };

const headerSectionSx = {
  width: '100%',
  borderBottom: '1px solid #EAEDF6',
  padding: '12px 12px 12px 24px',
  display: 'flex',
  gap: '12px',
  alignItems: 'center',
};

const headerTextSx = {
  fontSize: '20px',
  fontWeight: 600,
  lineHeight: '24px',
  color: '#000000',
  margin: 0,
};

const selectedSegmentsSectionSx = {
  display: 'flex',
  gap: '16px',
  padding: '24px',
  borderBottom: '1px solid #EAEDF6',
  flexDirection: 'column',
};

const addSegmentContainerSx = {
  display: 'flex',
  gap: '16px',
  alignItems: 'center',
  cursor: 'pointer',
  '&:hover': { opacity: 0.85 },
};

const addSegmentTextSx = {
  fontSize: '16px',
  fontWeight: 400,
  color: '#1E232E',
  textDecoration: 'underline',
  margin: 0,
};

/** Static catalogue — mimics picking from production segment library (no backend). */
const SEGMENT_LIBRARY = [
  { id: 'cat-winter', segment_name: 'Winter peak cohort', accountCount: 1240 },
  { id: 'cat-solar', segment_name: 'High solar penetration', accountCount: 892 },
  { id: 'cat-ami', segment_name: 'AMI meter cohort', accountCount: 4533 },
];

const actionSectionSx = {
  display: 'flex',
  gap: '12px',
  padding: '24px',
  justifyContent: 'flex-end',
  alignItems: 'center',
};

const outlineBtnSx = {
  backgroundColor: '#EFF5FF',
  padding: '12px 24px',
  color: '#1D5ED8',
  fontWeight: 500,
  fontSize: '16px',
  borderRadius: '6px',
  textTransform: 'none',
  border: 'none',
  '&:hover': { backgroundColor: '#E0F0FF' },
};

const applyButtonSx = {
  padding: '12px 24px',
  fontWeight: 500,
  fontSize: '16px',
  borderRadius: '6px',
  textTransform: 'none',
  backgroundColor: '#1D5ED8',
  color: '#FFFFFF',
  '&:hover': { backgroundColor: '#1860c7' },
};

export default function LabSegmentsPopover({ anchorEl, open, onClose }) {
  const {
    segments,
    segmentOperator,
    setSegmentOperator,
    setSegmentsBulk,
  } = useFilters();

  const [draftSegments, setDraftSegments] = useState([]);
  const [draftOperator, setDraftOperator] = useState('And');
  const [catalogOpen, setCatalogOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    setDraftSegments(segments.map((s) => ({ ...s })));
    setDraftOperator(segmentOperator);
  }, [open, segments, segmentOperator]);

  const handleApply = () => {
    setSegmentsBulk(draftSegments);
    setSegmentOperator(draftOperator);
    onClose();
  };

  const handleClearAll = () => {
    setDraftSegments([]);
  };

  const handleRemove = (id) => {
    setDraftSegments((prev) => prev.filter((s) => s.id !== id));
  };

  const handlePickCatalog = (row) => {
    if (draftSegments.some((s) => s.segment_name === row.segment_name)) {
      setCatalogOpen(false);
      return;
    }
    setDraftSegments((prev) => [
      ...prev,
      {
        id: `${row.id}-${Date.now()}`,
        segment_name: row.segment_name,
        type: SEGMENT_TYPES.SAVED_BIDGELY_ID,
        accountCount: row.accountCount,
      },
    ]);
    setCatalogOpen(false);
  };

  return (
    <>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={onClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            sx: {
              maxWidth: '95vw',
              borderRadius: '8px',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
              overflow: 'hidden',
            },
          },
        }}
      >
        <Box sx={popoverContentSx}>
          <Box sx={headerSectionSx}>
            <Typography sx={headerTextSx}>Segments</Typography>
            <Tooltip
              arrow
              placement="right"
              title="Saved user groups as reusable audience for future analysis (production copy)."
            >
              <Box component="img" src={InfoIcon} alt="" sx={{ width: 16, height: 16 }} />
            </Tooltip>
          </Box>

          <Box sx={selectedSegmentsSectionSx}>
            {draftSegments.map((segment, index) => (
              <Box key={segment.id}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 2 }}>
                  <Box sx={{ flex: 1 }}>
                    {index > 0 ? (
                      <ToggleButtonGroup
                        size="small"
                        exclusive
                        value={draftOperator}
                        onChange={(_, v) => v && setDraftOperator(v)}
                        sx={{ mb: 1 }}
                      >
                        <ToggleButton value="And">And</ToggleButton>
                        <ToggleButton value="Or">Or</ToggleButton>
                      </ToggleButtonGroup>
                    ) : null}
                    <Typography sx={{ fontSize: '14px', color: '#1E232E', fontWeight: 500 }}>
                      {segment.segment_name}
                    </Typography>
                    <Typography sx={{ fontSize: '12px', color: '#6B7280', mt: 0.5 }}>
                      {segment.accountCount?.toLocaleString?.() ?? '—'} accounts · {segment.type}
                    </Typography>
                  </Box>
                  <Button size="small" onClick={() => handleRemove(segment.id)} sx={{ textTransform: 'none', color: '#DC2626' }}>
                    Remove
                  </Button>
                </Box>
                <Box sx={{ borderBottom: '1px solid #F0F0F0', mt: 2 }} />
              </Box>
            ))}

            <Box sx={addSegmentContainerSx} onClick={() => setCatalogOpen(true)}>
              <Box component="img" src={PlusIcon} alt="" sx={{ width: 16, height: 16 }} />
              <Typography sx={addSegmentTextSx}>Add Segment</Typography>
            </Box>
          </Box>

          <Box sx={actionSectionSx}>
            <Button sx={outlineBtnSx} onClick={handleClearAll}>
              Clear All
            </Button>
            <Button sx={applyButtonSx} variant="contained" disableElevation onClick={handleApply}>
              Apply
            </Button>
          </Box>
        </Box>
      </Popover>

      <Dialog open={catalogOpen} onClose={() => setCatalogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontFamily: 'Roboto, sans-serif' }}>Segment library (Lab)</DialogTitle>
        <DialogContent>
          <Typography sx={{ fontSize: 13, color: '#565e6e', mb: 2, fontFamily: 'Roboto, sans-serif' }}>
            Static list matching production “pick a segment” flows — no Looker upload.
          </Typography>
          <List dense>
            {SEGMENT_LIBRARY.map((row) => (
              <ListItemButton key={row.id} onClick={() => handlePickCatalog(row)}>
                <ListItemText primary={row.segment_name} secondary={`${row.accountCount.toLocaleString()} accounts`} />
              </ListItemButton>
            ))}
          </List>
        </DialogContent>
      </Dialog>
    </>
  );
}
