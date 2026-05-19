import {
  getSqlQueryForDRProgram,
  getSqlQueryForEEProgram,
  getSqlQueryForRate,
  getSqlQueryForSavedBidgelyId,
} from '@/segments/utils';

/**
 * Builds segmentFilterQuery and filterQuery for a demand curve from segment/program selection.
 * @returns {{ segmentFilterQuery: string, filterQuery: string }}
 */
export const getSegmentFilterQueryForDemandCurve = ({
  segmentSnapshot,
  programSegment,
  allowedPilotName,
  allowedPilotIds,
}) => {
  let segmentFilterQuery = '';
  let filterQuery = '';

  const segmentName =
    segmentSnapshot?.segment_name ||
    segmentSnapshot?.segmentSnapshotName ||
    segmentSnapshot?.name;
  const segmentSnapshotId =
    segmentSnapshot?.segment_id || segmentSnapshot?.segmentSnapshotId || segmentSnapshot?.id;

  if (segmentSnapshot && segmentName && segmentName !== 'DEFAULT' && segmentSnapshotId) {
    const segment = {
      segmentSnapshotId,
      segment_name: segmentName,
      invert: segmentSnapshot.invert,
    };
    segmentFilterQuery = getSqlQueryForSavedBidgelyId(segment, allowedPilotName);
  }

  if (programSegment && programSegment.program_id) {
    const programType = programSegment.program_type;
    if (programType === 'EE') {
      filterQuery = getSqlQueryForEEProgram(programSegment, allowedPilotIds);
    } else if (programType === 'DR') {
      filterQuery = getSqlQueryForDRProgram(programSegment, allowedPilotIds);
    } else if (programType === 'Rates') {
      filterQuery = getSqlQueryForRate(programSegment, allowedPilotIds);
    }
  } else {
    filterQuery = segmentFilterQuery;
  }

  return { segmentFilterQuery, filterQuery };
};
