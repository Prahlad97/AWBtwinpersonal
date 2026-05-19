import { SEGMENT_TYPES } from '@/segments/constants';

/** Unique id for a segment (saved Bidgely ID or program). */
export const getSegmentIdentifier = (seg) =>
  seg?.segment_id ?? seg?.segmentSnapshotId ?? seg?.id ?? seg?.program_id;

/** True when no segments selected or only DEFAULT is selected. */
export const isDefaultSegmentSelection = (selectedSegments) =>
  !selectedSegments?.length ||
  selectedSegments.some((seg) => (seg.segment_name || seg.name) === 'DEFAULT');

/** True when segment is a Saved Bidgely ID type (not a program segment). */
export const isSavedBidgelySegment = (segment) =>
  !segment?.program_id &&
  (segment?.type === SEGMENT_TYPES.SAVED_BIDGELY_ID ||
    segment?.segment_id ||
    segment?.segmentSnapshotId ||
    segment?.segment_name ||
    segment?.segmentSnapshotName ||
    segment?.id ||
    segment?.name);

/** Display name for a segment. */
export const getSegmentDisplayName = (segment, index) =>
  segment?.segment_name ||
  segment?.segmentSnapshotName ||
  segment?.name ||
  segment?.program_name ||
  `Segment ${index + 1}`;
