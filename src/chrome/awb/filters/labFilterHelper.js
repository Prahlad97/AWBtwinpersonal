/**
 * Vendored subset of AWB `headers/custom-headers/filters/filter-helper.js`
 * — no Looker API imports. Used by Lab filter pane parity UI.
 */
import { groupByTabConfig } from './labDashboardFilterConfig';

/** @see AWB filter-helper `getFilterDisplayValue` */
export const getFilterDisplayValue = (value) => {
  if (value === null || value === undefined) {
    return '';
  }

  if (typeof value === 'string') {
    if (value.includes('"') && value.includes(',')) {
      const result = [];
      let current = '';
      let inQuotes = false;

      for (let i = 0; i < value.length; i++) {
        const char = value[i];

        if (char === '\\' && i + 1 < value.length && value[i + 1] === '"') {
          current += '"';
          i++;
        } else if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          if (current.trim()) {
            result.push(current.trim());
          }
          current = '';
        } else {
          current += char;
        }
      }

      if (current.trim()) {
        result.push(current.trim());
      }

      if (result.length > 0) {
        return result;
      }
    }

    if (value.includes(',')) {
      const parts = value
        .split(',')
        .map((v) => v.trim())
        .filter((v) => v !== '');

      if (
        value.includes('$') ||
        /^\d{1,3}(,\d{3})*(-\d{1,3}(,\d{3})*)?$/.test(value)
      ) {
        return value;
      }

      if (parts.some((part) => part.includes('(') && part.includes(')'))) {
        return parts;
      }

      if (parts.length > 1 && parts.every((part) => part === parts[0])) {
        return [parts[0]];
      }

      if (parts.every((part) => /^[a-zA-Z0-9_\s.\-<>]+$/.test(part))) {
        return [...new Set(parts)];
      }

      return value;
    }
    return value;
  }

  if (Array.isArray(value)) {
    return [...new Set(value)];
  }

  if (typeof value === 'object') {
    if (value.value !== undefined) {
      return getFilterDisplayValue(value.value);
    }
    return JSON.stringify(value);
  }

  return String(value);
};

/** @see AWB filter-helper `shouldShowFilter` */
export const shouldShowFilter = (filterName, filterValue) => {
  if (filterName === 'User ID Type Filter' && filterValue === 'uuid') {
    return false;
  }

  if (filterName === 'User ID Filter Values') {
    if (!filterValue) return false;
    if (typeof filterValue === 'string' && filterValue.trim() === '') return false;
    if (Array.isArray(filterValue) && filterValue.length === 0) return false;
  }

  return true;
};

/** @see AWB filter-helper `removeFilterValue` */
export const removeFilterValue = (currentValue, valueToRemove) => {
  const normalizedValueToRemove = valueToRemove.replace(/^"(.*)"$/, '$1');

  let newValue = '';

  if (currentValue && currentValue.includes(',')) {
    const result = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < currentValue.length; i++) {
      const char = currentValue[i];

      if (char === '\\' && i + 1 < currentValue.length && currentValue[i + 1] === '"') {
        current += '"';
        i++;
      } else if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        if (current.trim()) {
          result.push(current.trim());
        }
        current = '';
      } else {
        current += char;
      }
    }

    if (current.trim()) {
      result.push(current.trim());
    }

    const filteredValues = result.filter((value) => {
      const normalizedValue = value.replace(/^"(.*)"$/, '$1');
      return normalizedValue !== normalizedValueToRemove;
    });

    newValue = filteredValues
      .map((val) => {
        if (val.includes(',')) {
          return `"${val}"`;
        }
        return val;
      })
      .join(',');
  } else if (currentValue) {
    const normalizedCurrentValue = currentValue.replace(/^"(.*)"$/, '$1');
    if (normalizedCurrentValue === normalizedValueToRemove) {
      newValue = '';
    } else {
      newValue = currentValue;
    }
  }

  return newValue;
};

/** @see AWB filter-helper `countAppliedFilters` */
export const countAppliedFilters = (filters, excludedKeys = []) => {
  return Object.entries(filters)
    .filter(([key]) => !excludedKeys.includes(key))
    .filter(([, value]) => {
      if (typeof value === 'string') {
        return value.trim() !== '';
      }
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      return Boolean(value);
    }).length;
};

/** @see AWB filter-helper `getGroupNameFromCurrentTab` */
export function getGroupNameFromCurrentTab(currentTabId) {
  if (currentTabId === 'LOCATION') return 'Location';
  if (currentTabId === 'ACCOUNT') return 'Account';
  if (currentTabId === 'PREMISE') return 'Premise';
  if (currentTabId === 'APPLIANCE_TARGETING') return 'Appliance Targeting';
  if (currentTabId === 'LOAD_RESEARCH') return 'Load Research';
  if (currentTabId === 'EV_ANALYTICS') return 'EV Analytics';
  if (currentTabId === 'GRID_ASSETS') return 'Grid Assets';
  if (currentTabId === 'CUSTOM') return 'Custom';
  return undefined;
}

/** AWB `getAppliedFilterGroup` without pilot/tab exclusions — Lab shows full `groupByTabConfig`. */
export function getAppliedFilterGroupLab(localFilterChanges) {
  const appliedFilterGroup = {};

  Object.keys(groupByTabConfig).forEach((group) => {
    const filtersInGroup = groupByTabConfig[group];
    const appliedFilters = {};

    filtersInGroup.forEach((filterName) => {
      const filterValue = localFilterChanges[filterName];

      if (!shouldShowFilter(filterName, filterValue)) {
        return;
      }

      const displayValue = getFilterDisplayValue(filterValue);

      if (
        displayValue &&
        displayValue !== '' &&
        displayValue !== 'null' &&
        displayValue !== 'undefined'
      ) {
        appliedFilters[filterName] = displayValue;
      }
    });

    if (Object.keys(appliedFilters).length > 0) {
      appliedFilterGroup[group] = appliedFilters;
    }
  });

  return appliedFilterGroup;
}

export function buildLabGroupedFilters() {
  const groupedFilters = {};
  Object.entries(groupByTabConfig).forEach(([group, filterNames]) => {
    groupedFilters[group] = filterNames.map((name) => ({ name }));
  });
  return groupedFilters;
}
