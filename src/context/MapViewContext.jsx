import { createContext, useContext, useMemo, useReducer } from 'react';
import { MAP_VIEW } from '../config/mapView';

const initialState = {
  view: MAP_VIEW.ANALYSIS,
};

const types = {
  SET_VIEW: 'mapView/SET_VIEW',
};

function reducer(state, action) {
  switch (action.type) {
    case types.SET_VIEW:
      return { ...state, view: action.payload };
    default:
      return state;
  }
}

const MapViewContext = createContext(null);

export function MapViewProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const actions = useMemo(
    () => ({
      setView: (view) => dispatch({ type: types.SET_VIEW, payload: view }),
    }),
    []
  );
  const value = useMemo(() => ({ state, actions }), [state, actions]);
  return <MapViewContext.Provider value={value}>{children}</MapViewContext.Provider>;
}

export function useMapView() {
  const ctx = useContext(MapViewContext);
  if (!ctx) {
    throw new Error('useMapView must be used within MapViewProvider');
  }
  return ctx;
}
