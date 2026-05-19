import { Box, List, ListItemButton, ListItemText, Typography } from '@mui/material';

/** Minimal SegmentList for DCC segment picker (Lab fixture). */
export function SegmentList({ selectedSegments = [], onSegmentsSelect }) {
  const fixtures = [
    { segmentSnapshotId: 'snap-1', segmentSnapshotName: 'Winter peak cohort' },
    { segmentSnapshotId: 'snap-2', segmentSnapshotName: 'EV homes — Feeder A' },
    { segmentSnapshotId: 'snap-3', segmentSnapshotName: 'Solar homes — West' },
  ];

  return (
    <Box sx={{ width: 360, maxHeight: 400, overflow: 'auto', p: 1 }}>
      <Typography sx={{ fontSize: 14, fontWeight: 600, px: 1, py: 1 }}>Segments</Typography>
      <List dense>
        {fixtures.map((seg) => (
          <ListItemButton
            key={seg.segmentSnapshotId}
            selected={selectedSegments?.[0]?.segmentSnapshotId === seg.segmentSnapshotId}
            onClick={() => onSegmentsSelect?.([seg])}
          >
            <ListItemText primary={seg.segmentSnapshotName} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}
