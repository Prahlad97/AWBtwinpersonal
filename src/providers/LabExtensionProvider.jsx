import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { LAB_DEFAULT_LOOKER_FILTERS } from '../chrome/awb/constants';
import { getFilterLabel } from '../chrome/awb/filter-helper';

export const LabExtensionContext = createContext(null);

/**
 * Minimal ExtensionContext mock for vendored AWB chrome (CustomFilter, RefreshCache).
 * Shape: `{ state, actions }` like production `extension-context.js`.
 */
export function LabExtensionProvider({ children }) {
  const [lookerFilters, setLookerFilters] = useState({ ...LAB_DEFAULT_LOOKER_FILTERS });
  const [isDashboardLoading, setIsDashboardLoading] = useState(false);
  const [fromlookercache, setFromlookercache] = useState(true);

  const updateLookerFilter = useCallback((payload) => {
    setLookerFilters(payload);
  }, []);

  const setDashboardLoading = useCallback((isLoading) => {
    setIsDashboardLoading(isLoading);
  }, []);

  const clearCacheQueryResults = useCallback(() => {
    // Lab stub — no query cache
  }, []);

  const updateFromLookerCache = useCallback((value) => {
    setFromlookercache(value);
  }, []);

  const getFilterLabelForFilters = useCallback(
    (filters = lookerFilters) => getFilterLabel(filters),
    [lookerFilters]
  );

  const state = useMemo(
    () => ({
      lookerFilters,
      isDashboardLoading,
      fromlookercache,
      pilotId: 1,
      currentExplore: 'awb_common',
      isAwbNUJ: true,
      /** Production KPI uses solar-aware tooltip copy in consumption popover */
      isSolarAvailable: true,
    }),
    [lookerFilters, isDashboardLoading, fromlookercache]
  );

  const actions = useMemo(
    () => ({
      updateLookerFilter,
      setDashboardLoading,
      clearCacheQueryResults,
      updateFromLookerCache,
      getFilterLabel: getFilterLabelForFilters,
    }),
    [updateLookerFilter, setDashboardLoading, clearCacheQueryResults, updateFromLookerCache, getFilterLabelForFilters]
  );

  const value = useMemo(() => ({ state, actions }), [state, actions]);

  return <LabExtensionContext.Provider value={value}>{children}</LabExtensionContext.Provider>;
}

export function useLabExtension() {
  const ctx = useContext(LabExtensionContext);
  if (!ctx) {
    throw new Error('useLabExtension must be used within LabExtensionProvider');
  }
  return ctx;
}
