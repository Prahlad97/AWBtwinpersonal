import { useCallback, useEffect, useRef, useState } from 'react';
import { useLabExtension } from '../providers/LabExtensionProvider';

const CHART_COUNT_BY_SUBTAB = {
  HOME: 2,
  GRID_PEAK: 2,
  ASSETS: 0,
  NWA: 0,
};

const MIN_LOAD_MS = 450;

/**
 * Shows a loader on first paint, mounts heavy charts on the next frame, then hides the loader
 * after charts report load (with a short minimum dwell). Toggles dashboard loading chrome.
 */
export function useGridAssetsLoadGate(subId) {
  const { actions } = useLabExtension();
  const [mountCharts, setMountCharts] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const chartsExpected = CHART_COUNT_BY_SUBTAB[subId] ?? 0;
  const chartsLoadedRef = useRef(0);
  const startedAtRef = useRef(0);
  const finishTimerRef = useRef(null);

  const tryFinish = useCallback(() => {
    if (chartsLoadedRef.current < chartsExpected) return;
    const elapsed = Date.now() - startedAtRef.current;
    const wait = Math.max(0, MIN_LOAD_MS - elapsed);
    if (finishTimerRef.current) clearTimeout(finishTimerRef.current);
    finishTimerRef.current = setTimeout(() => {
      setShowLoader(false);
      actions.setDashboardLoading(false);
    }, wait);
  }, [chartsExpected, actions]);

  const onChartLoad = useCallback(() => {
    chartsLoadedRef.current += 1;
    tryFinish();
  }, [tryFinish]);

  useEffect(() => {
    chartsLoadedRef.current = 0;
    startedAtRef.current = Date.now();
    setMountCharts(false);
    setShowLoader(true);
    actions.setDashboardLoading(true);

    const frame = requestAnimationFrame(() => {
      setMountCharts(true);
      if (chartsExpected === 0) {
        tryFinish();
      }
    });

    return () => {
      cancelAnimationFrame(frame);
      if (finishTimerRef.current) clearTimeout(finishTimerRef.current);
      actions.setDashboardLoading(false);
    };
  }, [subId, chartsExpected, actions, tryFinish]);

  return { mountCharts, showLoader, onChartLoad };
}
