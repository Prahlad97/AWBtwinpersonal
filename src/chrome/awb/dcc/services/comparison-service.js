import * as api from './demand-curve-api';
import {
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

/**
 * Fetches all comparisons for a pilot (list). Returns raw API response.
 * @param {string} pilotName
 * @param {string} token
 * @returns {Promise<{ comparisons?: Array }>}
 */
export async function fetchAllComparisons(pilotName, token) {
  try {
    const response = await api.getAllComparisons(pilotName, token);
    return response;
  } catch (error) {
    console.error(error);
    return { comparisons: [] };
  }
}

/**
 * Fetches a single comparison by id and returns domain shape.
 * @param {string} dccId
 * @param {string} token
 * @returns {Promise<Object>} Domain comparison { comparison, demandCurves, deltaCurves }
 */
export async function fetchComparison(dccId, token) {
  const raw = await api.getComparisons(dccId, token);
  return comparisonFromResponse(raw);
}

/**
 * Creates a comparison and returns domain shape.
 * @param {Object} domainPayload - Domain comparison shape (comparison, demandCurves, deltaCurves)
 * @param {string} token
 * @returns {Promise<Object>} Domain comparison
 */
export async function createComparison(domainPayload, token) {
  const payload = comparisonToPayload(domainPayload);
  const raw = await api.createComparisons(payload, token);
  return comparisonFromResponse(raw);
}

/**
 * Updates a comparison and returns domain shape.
 * @param {string} dccId
 * @param {Object} domainComparison - Domain comparison
 * @param {string} token
 * @param {{ emptyCountStyleFilterNames?: boolean }} [options]
 * @returns {Promise<Object>} Domain comparison
 */
export async function updateComparison(dccId, domainComparison, token, options = {}) {
  const payload = comparisonToPayload(domainComparison, options);
  const raw = await api.updateComparisons(dccId, payload, token);
  return comparisonFromResponse(raw);
}

/**
 * Deletes a comparison.
 * @param {string} dccId
 * @param {string} token
 * @returns {Promise<void>}
 */
export async function deleteComparisonById(dccId, token) {
  await api.deleteComparison(dccId, token);
}

/**
 * Adds a demand curve and returns updated domain comparison.
 * @param {string} dccId
 * @param {{ name: string }} curveData - At least { name }
 * @param {Object} currentComparisonData - Current domain comparison (for merge)
 * @param {string} token
 * @returns {Promise<Object>} Updated domain comparison
 */
export async function addDemandCurveToComparison(dccId, curveData, currentComparisonData, token) {
  const raw = await api.addDemandCurve(dccId, curveData, token);
  return mergeNewDemandCurveIntoComparison({ response: raw, comparisonData: currentComparisonData });
}

/**
 * Adds a delta curve and returns updated domain comparison.
 * @param {string} dccId
 * @param {{ name: string }} curveData - At least { name }
 * @param {Object} currentComparisonData - Current domain comparison (for merge)
 * @param {string} token
 * @returns {Promise<Object>} Updated domain comparison
 */
export async function addDeltaCurveToComparison(dccId, curveData, currentComparisonData, token) {
  const raw = await api.addDeltaCurve(dccId, curveData, token);
  return mergeNewDeltaCurveIntoComparison({ response: raw, comparisonData: currentComparisonData });
}

/**
 * Updates a demand curve and returns updated domain comparison.
 * @param {string} dccId
 * @param {string} demandCurveId
 * @param {Object} domainCurveOrPayload - Domain curve (with curveProperties) or flat payload
 * @param {Object} currentComparisonData - Current domain comparison (for merge)
 * @param {string} token
 * @returns {Promise<Object>} Updated domain comparison
 */
export async function updateDemandCurveInComparison(
  dccId,
  demandCurveId,
  domainCurveOrPayload,
  currentComparisonData,
  token
) {
  const hasDomainShape =
    domainCurveOrPayload && domainCurveOrPayload.curveProperties !== undefined;
  const payload = hasDomainShape
    ? demandCurveToUpdatePayload(domainCurveOrPayload)
    : { ...domainCurveOrPayload };
  const raw = await api.updateDemandCurve(dccId, demandCurveId, payload, token);
  return mergeDemandCurveUpdateIntoComparison({
    response: raw,
    comparisonData: currentComparisonData,
  });
}

/**
 * Updates a delta curve and returns updated domain comparison.
 * @param {string} dccId
 * @param {string} deltaCurveId
 * @param {{ name: string }} payload - Update payload (e.g. { name })
 * @param {Object} currentComparisonData - Current domain comparison (for merge)
 * @param {string} token
 * @returns {Promise<Object>} Updated domain comparison
 */
export async function updateDeltaCurveInComparison(
  dccId,
  deltaCurveId,
  payload,
  currentComparisonData,
  token
) {
  const raw = await api.updateDeltaCurve(dccId, deltaCurveId, payload, token);
  return mergeDeltaCurveUpdateIntoComparison({
    response: raw,
    comparisonData: currentComparisonData,
  });
}

/**
 * Deletes a demand curve and returns updated domain comparison (local state).
 * @param {string} dccId - Unused; API is called by caller if needed
 * @param {string} demandCurveId
 * @param {Object} currentComparisonData
 * @param {string} token - If provided, API is called first
 * @returns {Promise<Object>} Updated domain comparison
 */
export async function deleteDemandCurveFromComparisonById(
  dccId,
  demandCurveId,
  currentComparisonData,
  token
) {
  if (token) {
    await api.deleteDemandCurveApi(dccId, demandCurveId, token);
  }
  return deleteDemandCurveFromComparison({
    demandCurveId,
    comparisonData: currentComparisonData,
  });
}

/**
 * Deletes a delta curve and returns updated domain comparison (local state).
 * @param {string} dccId
 * @param {string} deltaCurveId
 * @param {Object} currentComparisonData
 * @param {string} [token] - If provided, API is called first
 * @returns {Promise<Object>} Updated domain comparison
 */
export async function deleteDeltaCurveFromComparisonById(
  dccId,
  deltaCurveId,
  currentComparisonData,
  token
) {
  if (token) {
    await api.deleteDeltaCurveApi(dccId, deltaCurveId, token);
  }
  return deleteDeltaCurveFromComparison({
    deltaCurveId,
    comparisonData: currentComparisonData,
  });
}
