import React from 'react';
import { SegmentList } from '@/segments';
import { Box, Popover, Typography, Switch } from '@mui/material';
import UpDownIcon from '@/segments/assets/up-down-icon.svg';
import ProgramSegment from '@/segments/program-segment';
import {
  getSegmentDisplayName,
  getSegmentIdentifier,
  isDefaultSegmentSelection,
  isSavedBidgelySegment,
} from '../../helpers/dcc-segment-helpers';
import styles from './styles';
import { cloneDeep } from 'lodash';

export default function DemandCurveSegment({
  openSegmentSelectModal,
  handleSegmentModalClose,
  selectedSegments,
  handleSegmentsSelect,
  anchorEl,
  openSegmentList,
  setOpenSegmentList,
  currentDrProgramData,
}) {
  const isDefault = isDefaultSegmentSelection(selectedSegments);
  const validProgramSegments = selectedSegments?.filter((seg) => seg.program_id) || [];
  const programSeg = validProgramSegments.length > 0 ? validProgramSegments[0] : null;
  const selectedDrEventIds = programSeg
    ? { [programSeg.program_id]: programSeg?.selectedEvents }
    : {};

  const handleInvertToggle = (id) => (event) => {
    const updated = cloneDeep(selectedSegments).map((seg) =>
      seg.segmentSnapshotId === id ? { ...seg, invert: event.target.checked } : seg
    );
    handleSegmentsSelect(updated);
  };

  const onSegmentsSelect = (segments) => {
    const currentId =
      selectedSegments[0]?.segment_id ||
      selectedSegments[0]?.segmentSnapshotId ||
      selectedSegments[0]?.id;
    if (
      segments?.length === 2 &&
      (segments[0]?.segment_id || segments[0]?.segmentSnapshotId || segments[0]?.id) === currentId
    ) {
      segments = [segments[1]];
    }
    handleSegmentsSelect(segments);
  };

  const handleOnSegmentUpdate = (segmentToUpdate, index) => {
    const updated = [...selectedSegments];
    updated[index] = { ...segmentToUpdate };
    handleSegmentsSelect(updated);
  };

  const onRemoveSegment = (segmentIdentifier) => {
    const newSegments = selectedSegments.filter(
      (seg) => getSegmentIdentifier(seg) != segmentIdentifier
    );
    handleSegmentsSelect(newSegments);
    if (newSegments.length === 0) handleSegmentModalClose();
  };
  return (
    <>
      {(isDefault || openSegmentList) && (
        <Popover
          open={openSegmentSelectModal}
          onClose={handleSegmentModalClose}
          anchorEl={anchorEl}
          anchorReference='anchorPosition'
          anchorPosition={{ top: window.innerHeight / 2, left: window.innerWidth / 2 }}
          transformOrigin={{ vertical: 'center', horizontal: 'center' }}
          slotProps={{ sx: styles.segmentListPopoverSlotSx }}
        >
          <SegmentList
            selectedSegments={selectedSegments}
            onSegmentsSelect={onSegmentsSelect}
            onClose={() => {
              setOpenSegmentList(false);
              handleSegmentModalClose();
            }}
          />
        </Popover>
      )}
      {!isDefault && (
        <Popover
          open={openSegmentSelectModal}
          onClose={handleSegmentModalClose}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          {selectedSegments?.length > 0 &&
            selectedSegments.map((segment, index) =>
              isSavedBidgelySegment(segment) ? (
                <Box key={index} sx={styles.savedBidgelyContainerSx}>
                  <Box
                    sx={styles.savedBidgelyMainComponentSx}
                    onClick={() => setOpenSegmentList(true)}
                  >
                    <Typography sx={styles.savedBidgelyNameSx}>
                      {getSegmentDisplayName(segment, index)}
                    </Typography>
                    <img
                      src={UpDownIcon}
                      alt='Expand/Collapse'
                      style={{ width: '20px', height: '20px' }}
                    />
                  </Box>
                  <Box sx={styles.invertComponentSx}>
                    <Typography sx={styles.invertTextSx}>Invert</Typography>
                    <Switch
                      checked={segment.invert || false}
                      onChange={handleInvertToggle(segment?.segmentSnapshotId)}
                      sx={styles.toggleSx}
                      size='small'
                    />
                  </Box>
                </Box>
              ) : (
                <Box key={index} sx={styles.programSegmentContainerSx}>
                  <ProgramSegment
                    segment={segment}
                    index={index}
                    selectedSegments={selectedSegments}
                    onSegmentsSelect={onSegmentsSelect}
                    onRemoveSegment={() => onRemoveSegment(getSegmentIdentifier(segment))}
                    andOrValue={segment.invert ? 'And' : 'Or'}
                    onAndOrToggle={() => handleInvertToggle(segment?.segmentSnapshotId)}
                    onSegmentUpdate={(updatedSegment) =>
                      handleOnSegmentUpdate(updatedSegment, index)
                    }
                    isDccSegment={true}
                    currentDrProgramData={currentDrProgramData}
                    selectedDrEventIds={selectedDrEventIds}
                  />
                </Box>
              )
            )}
        </Popover>
      )}
    </>
  );
}
