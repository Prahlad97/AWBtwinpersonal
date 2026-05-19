import React, { createContext, useReducer } from 'react';
import {
  comparisonFromResponse,
  mergeNewDemandCurveIntoComparison,
  mergeNewDeltaCurveIntoComparison,
  mergeDemandCurveUpdateIntoComparison,
  mergeDeltaCurveUpdateIntoComparison,
  deleteDemandCurveFromComparison,
  deleteDeltaCurveFromComparison,
} from '@dcc/services';
import { updateComparisonData } from '@dcc/helpers/comparisons';
import { registerLocaleSettings } from './utils/set-numeral-locales.js';

const DEFAULT_USAGE_VALUE_FORMAT = {
  Usage: {
    Electric: '[>=1000000000]0,, T(Wh/T);[>=1000000]0,, G(Wh/T);[>=1000]0, M(Wh/T);[>=1]0 k(Wh/T)',
    Gas: '[>=1000000000]0,, B(Wh/T);[>=1000000]0,, M(Wh/T);[>=1000]0, K(Wh/T);0 (Wh/T)',
  },
  Demand: {
    Electric: '[>=1000000000]0,, T(W);[>=1000000]0,, G(W);[>=1000]0, M(W);[>=1]0 k(W)',
    Gas: '[>=1000000000]0,, B(W);[>=1000000]0,, M(W);[>=1000]0, K(W);0 (W)',
  },
};

const getUsageValueFormat = (valueFormat) => {
  for (let key of Object.keys(valueFormat)) {
    registerLocaleSettings(valueFormat[key], key);
  }
  return valueFormat;
};

const initialState = {
  allComparisons: [],
  currentComparison: {},
  usageValueFormatDemandCurve: getUsageValueFormat(DEFAULT_USAGE_VALUE_FORMAT.Demand),
  usageValueFormatUsageCurve: getUsageValueFormat(DEFAULT_USAGE_VALUE_FORMAT.Usage),
};

const types = {
  ADD_ALL_COMPARISONS: 'demand-curve/ADD_COMPARISONS',
  SET_CURRENT_COMPARISON: 'demand-curve/SET_CURRENT_COMPARISON',
  ADD_NEW_DEMAND_CURVE: 'demand-curve/ADD_NEW_DEMAND_CURVE',
  ADD_NEW_DELTA_CURVE: 'demand-curve/ADD_NEW_DELTA_CURVE',
  UPDATE_DEMAND_CURVE_DATA: 'demand-curve/UPDATE_DEMAND_CURVE_DATA',
  UPDATE_DELTA_CURVE_DATA: 'demand-curve/UPDATE_DELTA_CURVE_DATA',
  UPDATE_COMPARISON_DATA: 'demand-curve/UPDATE_COMPARISON_DATA',
  DELETE_DEMAND_CURVE: 'demand-curve/DELETE_DEMAND_CURVE',
  DELETE_DELTA_CURVE: 'demand-curve/DELETE_DELTA_CURVE',
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.ADD_ALL_COMPARISONS: {
      return {
        ...state,
        allComparisons: payload,
      };
    }
    case types.SET_CURRENT_COMPARISON: {
      const newComparison =
        payload?.demand_curves != null ? comparisonFromResponse(payload) : payload;
      return {
        ...state,
        currentComparison: newComparison,
      };
    }
    case types.ADD_NEW_DEMAND_CURVE: {
      return {
        ...state,
        currentComparison: mergeNewDemandCurveIntoComparison(payload),
      };
    }
    case types.ADD_NEW_DELTA_CURVE: {
      return {
        ...state,
        currentComparison: mergeNewDeltaCurveIntoComparison(payload),
      };
    }
    case types.UPDATE_DEMAND_CURVE_DATA: {
      return {
        ...state,
        currentComparison: mergeDemandCurveUpdateIntoComparison(payload),
      };
    }
    case types.UPDATE_DELTA_CURVE_DATA: {
      return {
        ...state,
        currentComparison: mergeDeltaCurveUpdateIntoComparison(payload),
      };
    }
    case types.UPDATE_COMPARISON_DATA: {
      return {
        ...state,
        currentComparison: updateComparisonData(payload, state.currentComparison),
      };
    }
    case types.DELETE_DEMAND_CURVE: {
      return {
        ...state,
        currentComparison: deleteDemandCurveFromComparison(payload),
      };
    }
    case types.DELETE_DELTA_CURVE: {
      return {
        ...state,
        currentComparison: deleteDeltaCurveFromComparison(payload),
      };
    }
    default:
      return state;
  }
};

const useActions = (state, dispatch) => ({
  setupComparisons: (comparisons) => {
    dispatch({ type: types.ADD_ALL_COMPARISONS, payload: comparisons });
  },
  setCurrentComparison: (comparisonDetails) => {
    dispatch({ type: types.SET_CURRENT_COMPARISON, payload: comparisonDetails });
  },
  addNewDemandCurve: (response, comparisonData) => {
    dispatch({ type: types.ADD_NEW_DEMAND_CURVE, payload: { response, comparisonData } });
  },
  addNewDeltaCurve: (response, comparisonData) => {
    dispatch({ type: types.ADD_NEW_DELTA_CURVE, payload: { response, comparisonData } });
  },
  updateCurrentComparisonCurves: (response, comparisonData) => {
    dispatch({ type: types.UPDATE_DEMAND_CURVE_DATA, payload: { response, comparisonData } });
  },
  updateCurrentComparisonDeltaCurves: (response, comparisonData) => {
    dispatch({ type: types.UPDATE_DELTA_CURVE_DATA, payload: { response, comparisonData } });
  },
  updateCurrentComparison: (args) => {
    dispatch({ type: types.UPDATE_COMPARISON_DATA, payload: args });
  },
  deleteDemandCurve: (demandCurveId, comparisonData) => {
    dispatch({ type: types.DELETE_DEMAND_CURVE, payload: { demandCurveId, comparisonData } });
  },
  deleteDeltaCurve: (deltaCurveId, comparisonData) => {
    dispatch({ type: types.DELETE_DELTA_CURVE, payload: { deltaCurveId, comparisonData } });
  },
});

const DemandCurveContext = createContext();

// eslint-disable-next-line react/prop-types
const DemandCurveProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const actions = useActions(state, dispatch);

  return (
    <DemandCurveContext.Provider value={{ state, actions }}>{children}</DemandCurveContext.Provider>
  );
};

export { DemandCurveContext, DemandCurveProvider };
