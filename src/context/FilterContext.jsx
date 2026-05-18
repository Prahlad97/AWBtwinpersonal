import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { SEGMENT_TYPES } from '../chrome/awb/segments/labSegmentConstants';

const FilterContext = createContext(null);

const DEFAULT_DATE_LABEL = '01 Jan 2023 - 31 Dec 2023';

function normalizeSegmentInput({ name, accountCount = 0 }) {
  const trimmed = typeof name === 'string' ? name.trim() : '';
  if (!trimmed) return null;
  const n = Math.max(0, Math.round(Number(accountCount)) || 0);
  return {
    id: `seg-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    segment_name: trimmed,
    type: SEGMENT_TYPES.SAVED_BIDGELY_ID,
    accountCount: n,
  };
}

export function FilterProvider({ children }) {
  const [dateRangeLabel, setDateRangeLabel] = useState(DEFAULT_DATE_LABEL);
  const [segments, setSegments] = useState([]);
  const [segmentOperator, setSegmentOperator] = useState('And');

  const segmentCount = segments.length;

  const addSegment = useCallback((input) => {
    const row = normalizeSegmentInput(input);
    if (!row) return;
    setSegments((prev) => [...prev, row]);
  }, []);

  const removeSegment = useCallback((id) => {
    setSegments((prev) => prev.filter((s) => s.id !== id));
  }, []);

  const setSegmentsBulk = useCallback((next) => {
    setSegments(Array.isArray(next) ? next.map((s) => ({ ...s })) : []);
  }, []);

  const value = useMemo(
    () => ({
      dateRangeLabel,
      setDateRangeLabel,
      segments,
      segmentOperator,
      setSegmentOperator,
      addSegment,
      removeSegment,
      setSegmentsBulk,
      segmentCount,
    }),
    [
      dateRangeLabel,
      segments,
      segmentOperator,
      addSegment,
      removeSegment,
      setSegmentsBulk,
      segmentCount,
    ]
  );

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>;
}

export function useFilters() {
  const ctx = useContext(FilterContext);
  if (!ctx) throw new Error('useFilters must be used within FilterProvider');
  return ctx;
}
