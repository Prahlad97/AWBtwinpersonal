import { CURVE_DATA_KEYS } from '../demand-curve-constants.js';
import { comparisonFromResponse, comparisonToPayload } from '@dcc/services/comparison-mappers';
import { buildInitialLabDomains, domainToListItem } from './labDccSeed.js';

const STORAGE_KEY = 'analytics-lab-dcc-domains-v2';

function loadDomains() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function saveDomains(domains) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(domains));
  } catch {
    /* ignore */
  }
}

function getStore() {
  let domains = loadDomains();
  if (!domains?.length) {
    domains = buildInitialLabDomains();
    saveDomains(domains);
  }
  return domains;
}

function setStore(domains) {
  saveDomains(domains);
}

function findDomain(dccId) {
  return getStore().find((d) => d.comparison?.dccID === dccId);
}

function domainToApiRaw(domain) {
  const payload = comparisonToPayload(domain);
  const comp = domain.comparison;
  return {
    comparison: {
      ...payload.comparison,
      dcc_id: comp.dccID,
      user_id: comp.userId,
      created_at: comp.createdAt,
    },
    demand_curves: (domain.demandCurves || []).map((curve, index) => {
      const dto = payload.demand_curves[index] || {};
      return {
        ...dto,
        dcc_id: comp.dccID,
        dcc_demand_curve_id: curve.demandCurveId,
        created_at: curve.createdAt,
      };
    }),
    delta_curves: (domain.deltaCurves || []).map((curve, index) => {
      const dto = payload.delta_curves[index] || {};
      return {
        ...dto,
        dcc_id: comp.dccID,
        dcc_delta_curve_id: curve.deltaCurveId,
        created_at: curve.createdAt,
      };
    }),
  };
}

export const labDccStore = {
  listComparisons() {
    return { comparisons: getStore().map(domainToListItem) };
  },

  getComparisonRaw(dccId) {
    const domain = findDomain(dccId);
    if (!domain) throw new Error('Comparison not found');
    return domainToApiRaw(domain);
  },

  getComparisonDomain(dccId) {
    return comparisonFromResponse(labDccStore.getComparisonRaw(dccId));
  },

  createComparison(payload) {
    const id = `dcc-${Date.now()}`;
    const raw = {
      comparison: {
        dcc_id: id,
        name: payload.name,
        description: payload.description || '',
        user_id: 'lab-user-1',
        user_name: payload.user_name || 'Lab User',
        user_email: payload.user_email || 'lab@bidgely.com',
        pilot_name: payload.pilot_name || 'demo',
        is_shared: Boolean(payload.is_shared),
        curve_type: payload.curve_type || 'HOURLY',
        consumption_type: payload.consumption_type || 'TOTAL',
        created_at: Date.now(),
      },
      demand_curves: (payload.demand_curves || []).map((curve, index) => ({
        dcc_id: id,
        dcc_demand_curve_id: `dc-${Date.now()}-${index}`,
        name: curve.name,
        saved_filter_name: curve.saved_filter_name || 'DEFAULT',
        timeframe: curve.timeframe || '2024/01/01 to 2024/12/31',
        program_segment: curve.program_segment || {},
        segment_data: curve.segment_data ?? null,
        created_at: Date.now(),
      })),
      delta_curves: payload.delta_curves || [],
    };
    const domain = comparisonFromResponse(raw);
    const next = [domain, ...getStore()];
    setStore(next);
    return domain;
  },

  updateComparisonDomain(dccId, domain) {
    const store = getStore();
    const idx = store.findIndex((d) => d.comparison?.dccID === dccId);
    if (idx < 0) throw new Error('Comparison not found');
    store[idx] = domain;
    setStore(store);
    return domain;
  },

  deleteComparison(dccId) {
    setStore(getStore().filter((d) => d.comparison?.dccID !== dccId));
  },

  reset() {
    sessionStorage.removeItem(STORAGE_KEY);
  },
};
