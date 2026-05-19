import React, { useState, useMemo } from 'react';
import useComparisonPage from './use-comparison-page';
import { getIsCompareButtonDisabled } from '../helpers/comparisons';
import { CURVE_DATA_KEYS, DCC_MAX_CURVES } from '@/constants/demand-curve-constants';

export function useDccDetails() {
  const comparisonPage = useComparisonPage();
  const [showErrorOverlay, setShowErrorOverlay] = useState(true);
  const [isSkipAndSaveLoading, setIsSkipAndSaveLoading] = useState(false);

  const isCompareButtonDisabled = useMemo(
    () => getIsCompareButtonDisabled(comparisonPage.comparisonData, comparisonPage.isComparing),
    [comparisonPage.comparisonData, comparisonPage.isComparing]
  );

  const totalCurvesCount =
    (comparisonPage.comparisonData?.demandCurves?.length || 0) +
    (comparisonPage.comparisonData?.deltaCurves?.length || 0);

  const dataNotPresentDetails =
    comparisonPage.comparisonData?.comparison?.[CURVE_DATA_KEYS.DATA_NOT_PRESENT_DETAILS];
  const hasDataNotPresent =
    Array.isArray(dataNotPresentDetails) && dataNotPresentDetails.length > 0;

  const handleSkipAndSave = async () => {
    setIsSkipAndSaveLoading(true);
    const onSaveAndContinue = comparisonPage.unsavedFiltersDialog.onSaveAndContinue;
    try {
      const saved = await comparisonPage.handleSaveComparison({
        skipUnsavedFilterCheck: true,
      });
      comparisonPage.setUnsavedFiltersDialog({
        ...comparisonPage.unsavedFiltersDialog,
        open: false,
      });
      if (saved && onSaveAndContinue) onSaveAndContinue();
    } finally {
      setIsSkipAndSaveLoading(false);
    }
  };

  return {
    ...comparisonPage,
    showErrorOverlay,
    setShowErrorOverlay,
    isSkipAndSaveLoading,
    isCompareButtonDisabled,
    totalCurvesCount,
    hasDataNotPresent,
    dataNotPresentDetails,
    handleSkipAndSave,
    DCC_MAX_CURVES,
  };
}
