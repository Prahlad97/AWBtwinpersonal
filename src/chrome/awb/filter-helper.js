import { CUSTOM_FILTERS } from './constants';

const getPremiseDisplayText = (premiseValues) => {
  if (!premiseValues || premiseValues.length === 0) return '';
  return premiseValues
    .map((value) => {
      if (value === 'Residential') return 'Resi';
      if (value === 'Business') return 'Busi';
      return value;
    })
    .join(', ');
};

const getFuelDisplayText = (fuelValue) => {
  if (!fuelValue) return '';
  if (fuelValue === 'Electricity') return 'Electric';
  if (fuelValue === 'Gas') return 'Gas';
  return fuelValue;
};

const getMeterDisplayText = (meterValue) => meterValue || '';

/** Vendored from production `filter-helper.js` — label only, no Looker deps. */
export const getFilterLabel = (lookerFilters) => {
  const appliedPremise = lookerFilters[CUSTOM_FILTERS.PREMISE]
    ? lookerFilters[CUSTOM_FILTERS.PREMISE].split(',')
    : [];
  const appliedMeter = lookerFilters[CUSTOM_FILTERS.METER] || '';
  const appliedFuel = lookerFilters[CUSTOM_FILTERS.FUEL] || '';

  if (appliedPremise.length === 0 && !appliedMeter && !appliedFuel) {
    return 'Resi - AMI - Electric';
  }

  const labelParts = [];
  const premiseText = getPremiseDisplayText(appliedPremise);
  if (premiseText) labelParts.push(premiseText);
  const meterText = getMeterDisplayText(appliedMeter);
  if (meterText) labelParts.push(meterText);
  const fuelText = getFuelDisplayText(appliedFuel);
  if (fuelText) labelParts.push(fuelText);

  return labelParts.join(' - ');
};
