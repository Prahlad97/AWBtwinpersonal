import { labDccStore } from '@/adapters/labDccStore';
import { comparisonFromResponse, comparisonToPayload } from './comparison-mappers';

const delay = (ms = 80) => new Promise((r) => setTimeout(r, ms));

export const getAllComparisons = async () => {
  await delay();
  return labDccStore.listComparisons();
};

export const getComparisons = async (dccId) => {
  await delay();
  return labDccStore.getComparisonRaw(dccId);
};

export const createComparisons = async (comparisonData) => {
  await delay(120);
  const domain = labDccStore.createComparison(comparisonData);
  return labDccStore.getComparisonRaw(domain.comparison.dccID);
};

export const updateComparisons = async (dccId, comparisonData) => {
  await delay(120);
  const domain = comparisonFromResponse({
    ...comparisonData,
    comparison: { ...comparisonData.comparison, dcc_id: dccId },
  });
  labDccStore.updateComparisonDomain(dccId, domain);
  return labDccStore.getComparisonRaw(dccId);
};

export const deleteComparison = async (dccId) => {
  await delay();
  labDccStore.deleteComparison(dccId);
  return {};
};

export const deleteDemandCurveApi = async (dccId, demandCurveId) => {
  await delay();
  const domain = labDccStore.getComparisonDomain(dccId);
  const next = {
    ...domain,
    demandCurves: domain.demandCurves.filter((c) => c.demandCurveId !== demandCurveId),
    deltaCurves: domain.deltaCurves.filter(
      (c) => c.demandCurveId1 !== demandCurveId && c.demandCurveId2 !== demandCurveId
    ),
  };
  labDccStore.updateComparisonDomain(dccId, next);
  return labDccStore.getComparisonRaw(dccId);
};

export const updateDemandCurve = async (dccId, demandCurveId, updatedCurve) => {
  await delay();
  const domain = labDccStore.getComparisonDomain(dccId);
  const next = {
    ...domain,
    demandCurves: domain.demandCurves.map((c) =>
      c.demandCurveId === demandCurveId ? { ...c, ...updatedCurve, demandCurveId } : c
    ),
  };
  labDccStore.updateComparisonDomain(dccId, next);
  return labDccStore.getComparisonRaw(dccId);
};

export const deleteDeltaCurveApi = async (dccId, deltaCurveId) => {
  await delay();
  const domain = labDccStore.getComparisonDomain(dccId);
  const next = {
    ...domain,
    deltaCurves: domain.deltaCurves.filter((c) => c.deltaCurveId !== deltaCurveId),
  };
  labDccStore.updateComparisonDomain(dccId, next);
  return labDccStore.getComparisonRaw(dccId);
};

export const updateDeltaCurve = async (dccId, deltaCurveId, updatedCurve) => {
  await delay();
  const domain = labDccStore.getComparisonDomain(dccId);
  const next = {
    ...domain,
    deltaCurves: domain.deltaCurves.map((c) =>
      c.deltaCurveId === deltaCurveId ? { ...c, ...updatedCurve, deltaCurveId } : c
    ),
  };
  labDccStore.updateComparisonDomain(dccId, next);
  return labDccStore.getComparisonRaw(dccId);
};

export const addDemandCurve = async (dccId, curveData) => {
  await delay();
  const domain = labDccStore.getComparisonDomain(dccId);
  const newId = `dc-${Date.now()}`;
  const index = domain.demandCurves.length;
  const payload = comparisonToPayload(domain);
  const raw = {
    ...payload,
    demand_curves: [
      ...payload.demand_curves,
      {
        name: curveData.name || `Curve ${index + 1}`,
        saved_filter_name: 'DEFAULT',
        timeframe: '2024/01/01 to 2024/12/31',
        program_segment: {},
        segment_data: null,
      },
    ],
  };
  const merged = comparisonFromResponse({
    ...labDccStore.getComparisonRaw(dccId),
    demand_curves: [
      ...labDccStore.getComparisonRaw(dccId).demand_curves,
      {
        dcc_id: dccId,
        dcc_demand_curve_id: newId,
        name: curveData.name || `Curve ${index + 1}`,
        saved_filter_name: 'DEFAULT',
        timeframe: '2024/01/01 to 2024/12/31',
        program_segment: {},
        segment_data: null,
        created_at: Date.now(),
      },
    ],
  });
  labDccStore.updateComparisonDomain(dccId, merged);
  return labDccStore.getComparisonRaw(dccId);
};

export const addDeltaCurve = async (dccId, curveData) => {
  await delay();
  const domain = labDccStore.getComparisonDomain(dccId);
  const newId = `delta-${Date.now()}`;
  const raw = labDccStore.getComparisonRaw(dccId);
  const merged = comparisonFromResponse({
    ...raw,
    delta_curves: [
      ...raw.delta_curves,
      {
        dcc_id: dccId,
        dcc_delta_curve_id: newId,
        name: curveData.name || 'Delta curve',
        dcc_demand_curve_id_1: curveData.dcc_demand_curve_id_1,
        dcc_demand_curve_id_2: curveData.dcc_demand_curve_id_2,
        created_at: Date.now(),
      },
    ],
  });
  labDccStore.updateComparisonDomain(dccId, merged);
  return labDccStore.getComparisonRaw(dccId);
};
