export {
  getAllComparisons,
  getComparisons,
  createComparisons,
  updateComparisons,
  deleteComparison,
  deleteDemandCurveApi,
  updateDemandCurve,
  deleteDeltaCurveApi,
  updateDeltaCurve,
  addDemandCurve,
  addDeltaCurve,
} from './demand-curve-api';

export {
  fetchAllComparisons,
  fetchComparison,
  createComparison,
  updateComparison,
  deleteComparisonById,
  addDemandCurveToComparison,
  addDeltaCurveToComparison,
  updateDemandCurveInComparison,
  updateDeltaCurveInComparison,
  deleteDemandCurveFromComparisonById,
  deleteDeltaCurveFromComparisonById,
} from './comparison-service';

export {
  comparisonFromResponse,
  comparisonToPayload,
  demandCurveToUpdatePayload,
  mergeNewDemandCurveIntoComparison,
  mergeNewDeltaCurveIntoComparison,
  mergeDemandCurveUpdateIntoComparison,
  mergeDeltaCurveUpdateIntoComparison,
  deleteDemandCurveFromComparison,
  deleteDeltaCurveFromComparison,
} from './comparison-mappers';
