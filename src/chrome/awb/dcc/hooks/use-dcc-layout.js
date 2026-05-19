import { useContext, useEffect, useState } from 'react';
import { DemandCurveContext } from '@/contexts/demand-curve-context';
import { fetchAllComparisons } from '../services';

/** Lab: load comparisons from fixture store (no Looker / API). */
export function useDccLayout() {
  const [isFetching, setIsFetching] = useState(true);
  const {
    actions: { setupComparisons },
  } = useContext(DemandCurveContext);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const response = await fetchAllComparisons('demo', 'lab-token');
        if (!cancelled) setupComparisons(response?.comparisons || []);
      } catch (error) {
        console.error('An error occurred while fetching comparison data:', error);
      } finally {
        if (!cancelled) setIsFetching(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [setupComparisons]);

  return { isFetching };
}
