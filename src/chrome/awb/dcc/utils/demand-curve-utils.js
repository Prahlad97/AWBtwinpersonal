import { CCF_PER_THERMS, FUEL_TYPE } from '@/constants';
import numeral from 'numeral';
import {
  DEMAND_CURVE_TYPES,
  DEMAND_CURVE_COLORS,
  DEMAND_CURVE_DETAILS_COLORS,
  PROPERTIES,
} from '@/constants/demand-curve-constants';

// Constants for button type extraction
const BUTTON_TYPES = ['avg', 'min', 'max'];

// Utility function to extract button type from demandCurveType
export const extractButtonType = (demandCurveType) => {
  if (!demandCurveType) return '';

  for (const type of BUTTON_TYPES) {
    if (demandCurveType.endsWith(`_${type.toUpperCase()}`)) {
      return type;
    }
  }
  return '';
};

// Utility function to get base demand curve type without button type suffix
export const getBaseDemandCurveType = (demandCurveType) => {
  if (!demandCurveType) return '';

  for (const type of BUTTON_TYPES) {
    if (demandCurveType.endsWith(`_${type.toUpperCase()}`)) {
      return demandCurveType.replace(`_${type.toUpperCase()}`, '');
    }
  }
  return demandCurveType;
};

// Utility function to capitalize first letter
export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

// Export constants for use in other files
export { BUTTON_TYPES };

/**
 * Computes the next curve color and background color for adding a new demand/delta curve.
 * @param {{ demandCurves?: Array<{ colorIndex?: number }>, deltaCurves?: Array<{ colorIndex?: number }> }} comparisonData
 * @returns {{ curveColor: string, bgColor: string }}
 */
export function getNextCurveColors(comparisonData) {
  const demandCurves = comparisonData?.demandCurves || [];
  const deltaCurves = comparisonData?.deltaCurves || [];

  const colorIndexes = [
    ...demandCurves.map((c) => c.colorIndex),
    ...deltaCurves.map((c) => c.colorIndex),
  ].filter((i) => typeof i === 'number' && i >= 0);

  const currentID =
    colorIndexes.length > 0
      ? Math.max(...colorIndexes) + 1
      : demandCurves.length + deltaCurves.length;

  const curveColor = DEMAND_CURVE_COLORS[currentID % DEMAND_CURVE_COLORS.length];
  const bgColor =
    DEMAND_CURVE_DETAILS_COLORS[currentID % DEMAND_CURVE_DETAILS_COLORS.length];

  return { curveColor, bgColor };
}

const DEFAULT_SEGMENT_LABEL = 'Select';

/**
 * Returns the display name for the segment/program selection on a demand curve card.
 * @param {Object} curveProperties - Curve properties containing SEGMENT_SELECTION and PROGRAM_SEGMENT
 * @returns {string}
 */
export function getSegmentDisplayName(curveProperties) {
  if (!curveProperties) return DEFAULT_SEGMENT_LABEL;
  const segment = curveProperties[PROPERTIES.SEGMENT_SELECTION];
  const programSegment = curveProperties[PROPERTIES.PROGRAM_SEGMENT];
  return (
    segment?.segment_name ||
    segment?.name ||
    segment?.segmentSnapshotName ||
    programSegment?.program_name ||
    programSegment?.name ||
    DEFAULT_SEGMENT_LABEL
  );
}

/** Suffix to display button type (uppercase). */
const CURVE_TYPE_SUFFIXES = ['_AVG', '_MIN', '_MAX'];

/**
 * Returns display button type from curveType string: 'AVG' | 'MIN' | 'MAX' | ''.
 * @param {string} [curveType]
 * @returns {string}
 */
export function getButtonTypeFromCurveType(curveType) {
  if (!curveType) return '';
  const suffix = CURVE_TYPE_SUFFIXES.find((s) => curveType.endsWith(s));
  return suffix ? suffix.slice(1) : '';
}

/**
 * Returns the next color index to use when adding a curve (max existing index + 1, or curves count).
 * @param {Array} demandCurves - Curves with optional colorIndex
 * @param {Array} deltaCurves - Curves with optional colorIndex
 * @returns {number}
 */
export function getNextCurveColorIndex(demandCurves = [], deltaCurves = []) {
  const colorIndexes = [
    ...(demandCurves || []).map((c) => c.colorIndex),
    ...(deltaCurves || []).map((c) => c.colorIndex),
  ].filter((i) => typeof i === 'number' && i >= 0);

  if (colorIndexes.length > 0) {
    return Math.max(...colorIndexes) + 1;
  }
  return (demandCurves?.length || 0) + (deltaCurves?.length || 0);
}

// Helper function to determine if curve type is consumption (kWh) or demand (kW)
const isConsumptionCurve = (curveType) => {
  return (
    curveType === DEMAND_CURVE_TYPES.USAGE_TIME ||
    curveType === DEMAND_CURVE_TYPES.MONTHLY ||
    curveType === DEMAND_CURVE_TYPES.DAILY ||
    curveType === DEMAND_CURVE_TYPES.HOURLY ||
    curveType === 'MONTHLY' ||
    curveType === 'DAILY' ||
    curveType === 'HOURLY'
  );
};

export const convertToFuelUnitForDemandCurve = (value, valueFomatConfig, fuelType, curveType) => {
  let unit = isConsumptionCurve(curveType) ? ' kWh' : ' kW';
  //if gas data pilot we need to update unit
  if (fuelType == FUEL_TYPE.GAS) {
    unit = 'Wh/T';
  }
  if (valueFomatConfig && valueFomatConfig[fuelType]) {
    if (fuelType === FUEL_TYPE.GAS) {
      value = value / CCF_PER_THERMS;
    }
    numeral.locale(valueFomatConfig[fuelType]);
    return value >= 1000 ? numeral(value).format('0.00 a') : numeral(value).format('0.00') + unit;
  }
  return null;
};

export const getFuelUnitForDemandCurve = (value, valueFomatConfig, fuelType, curveType) => {
  let unit = isConsumptionCurve(curveType) ? 'kWh' : 'kW';
  //if gas data pilot we need to update unit
  if (fuelType == FUEL_TYPE.GAS) {
    unit = 'Wh/T';
  }
  if (valueFomatConfig && valueFomatConfig[fuelType]) {
    if (fuelType === FUEL_TYPE.GAS) {
      value = value / CCF_PER_THERMS;
    }
    numeral.locale(valueFomatConfig[fuelType]);

    return value >= 1000
      ? numeral(value)
          .format('a')
          .replace(/^[0-9.]+[A-Za-z]*/, '')
          .replace(/[()[\]{}]/g, '')
      : unit;
  }
  return unit;
};
