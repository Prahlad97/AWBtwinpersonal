/**
 * Mock KPI adapter — mirrors AWB LOCAL_DEV_KPI / inline query display values.
 * Wire charts to filter context later via applyFilters(data, filters).
 */
import { KPI } from '../fixtures';

export function getKpiDisplay() {
  return {
    bidgelyIds: KPI.bidgelyIds,
    customers: KPI.customers,
    premises: KPI.premises,
    meters: KPI.meters,
    consumptionTotal: KPI.consumptionTotal,
    consumptionAvg: KPI.consumptionAvg,
    netDemandTotal: KPI.netDemandTotal,
    netDemandAvg: KPI.netDemandAvg,
    avgConsumption: KPI.avgConsumption,
    solarGeneration: KPI.solarGeneration,
  };
}
