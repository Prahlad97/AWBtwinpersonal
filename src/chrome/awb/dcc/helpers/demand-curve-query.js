import { DEMAND_CURVE_WIDGETS } from '@/constants/demand-curve-constants';
import { AF_DEFAULT_FILTERS } from '@/constants/features-constants';
import {
  fieldNameToLookMLForDcc,
  fieldNameToLookMLReactCharts,
} from '@/utils/FilterConfig/filter-lookml-mapping-react-charts';
import { getModelSuffix, updateArrayItems } from '@/utils/query-generator';
import moment from 'moment';

//model suffix is hardcoded for now
export const getDemandCurveComparisonQuery = (
  chartType,
  savedFilter,
  propState,
  timeInterval,
  additionalFilters = {},
  pilotId,
  isAwbNUJ
) => {
  let explore = getViewForPilot();
  let widgetName = getWidgetName(chartType, propState);

  return {
    dimensions: [
      ...updateArrayItems(DEMAND_CURVE_WIDGETS[widgetName].exploreFields, explore),
      ...DEMAND_CURVE_WIDGETS[widgetName].otherFields,
    ],
    measures: [],
    pivots: [...updateArrayItems(DEMAND_CURVE_WIDGETS[widgetName].explorePivots, explore)],
    sorts: [
      ...updateArrayItems(DEMAND_CURVE_WIDGETS[widgetName].exploreSorts, explore),
      ...getOthers('Sorts', widgetName),
    ],
    filters: {
      ...DEMAND_CURVE_WIDGETS[widgetName].filters,
      ...setFilters(savedFilter, explore, timeInterval, propState.SHOW_AVERAGE, pilotId, isAwbNUJ),
      ...additionalFilters,
    },
    limit: DEMAND_CURVE_WIDGETS[widgetName].limit,
    column_limit: DEMAND_CURVE_WIDGETS[widgetName].column_limit,
    view: getViewForPilot(),
    model: getModelForPilot(pilotId),
  };
};

export const getModelForPilot = (pilotId) => {
  let modelName = '';
  if (pilotId == 1 || pilotId == 2) {
    modelName = 'awb_nuj';
  } else {
    modelName = 'awb_nuj_pilot';
  }
  return modelName;
};

export const getViewForPilot = () => {
  const modelName = 'demand_curve_sdt';
  return modelName;
};

const getOthers = (type, widget) => {
  return DEMAND_CURVE_WIDGETS[widget][`other${type}`] || [];
};

export const setFilters = (savedFilter, explore, dateRange, showAverage, pilotId, isAwbNUJ) => {
  let newFilter = {};
  //missed Filters is for debugging the filters that dont have lookMLMapping for now.
  let missedFilters = [];
  let filters = {};
  if (savedFilter && savedFilter.filters) {
    filters = savedFilter.filters;
    Object.entries(filters).forEach(([key, value]) => {
      // Skip EV Confidence % filter
      if (key === 'EV Confidence %') {
        return;
      }
      const lookerName = fieldNameToLookMLForDcc(key, explore, pilotId, isAwbNUJ);
      if (Array.isArray(value)) {
        value = value?.join(',');
      }

      if (lookerName) {
        newFilter[lookerName] = value;
      } else {
        missedFilters.push(key);
      }
    });
  }

  const dates = dateRange?.split(' to ');
  const startDate = dates[0];
  const endDate = dates[1];
  newFilter[explore + '.datehour'] = `${startDate} to ${endDate}`;
  newFilter[explore + '.max_demand'] = 'net';
  if (showAverage) newFilter[explore + '.consumption_select'] = 'avg';
  else newFilter[explore + '.consumption_select'] = 'total';
  //printing missed filters on console will remove based on review
  if (missedFilters.length > 0) {
    console.error(
      'While Using analysis framwrok following filters where not included as there mapping was not added',
      missedFilters
    );
  }
  return newFilter;
};

export const getWidgetName = (chartType, propState) => {
  let prefix = chartType;
  let suffix = propState['SHOW_AVERAGE'] ? '_AVERAGE' : '';

  // For new naming scheme (MONTHLY, DAILY, HOURLY, KW_MONTHLY, KW_DAILY, KW_HOURLY, etc.)
  // the chartType already contains the full curve type, so we don't append PLOT_DURATION
  // For legacy naming (USAGE_TIME, DEMAND_CURVE, etc.), we need to append PLOT_DURATION
  const isNewNamingScheme =
    chartType === 'MONTHLY' ||
    chartType === 'DAILY' ||
    chartType === 'HOURLY' ||
    chartType === '576' ||
    chartType === '8760' ||
    chartType?.startsWith('KW_MONTHLY') ||
    chartType?.startsWith('KW_DAILY') ||
    chartType?.startsWith('KW_HOURLY');

  if (isNewNamingScheme) {
    // New naming scheme: widget name is just chartType + suffix
    return prefix + suffix;
  } else {
    // Legacy naming scheme: widget name includes VALUE and PLOT_DURATION
    return (
      prefix +
      (propState.VALUE ? `_${propState.VALUE}` : '') +
      (propState.PLOT_DURATION ? `_${propState.PLOT_DURATION}` : '') +
      suffix
    );
  }
};
