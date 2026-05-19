import { useState } from 'react';
import { getNextCurveColors } from '../utils/demand-curve-utils';

export function useAddAnotherCard({ comparisonData, handleAddDemandCurve, handleAddDeltaCurve }) {
  const { curveColor, bgColor } = getNextCurveColors(comparisonData);

  const [isDemandCurveLoading, setIsDemandCurveLoading] = useState(false);
  const [isDeltaCurveLoading, setIsDeltaCurveLoading] = useState(false);

  const onAddDemandCurve = async () => {
    setIsDemandCurveLoading(true);
    await handleAddDemandCurve();
    setIsDemandCurveLoading(false);
  };

  const onAddDeltaCurve = async () => {
    setIsDeltaCurveLoading(true);
    await handleAddDeltaCurve();
    setIsDeltaCurveLoading(false);
  };

  return {
    curveColor,
    bgColor,
    isDemandCurveLoading,
    isDeltaCurveLoading,
    onAddDemandCurve,
    onAddDeltaCurve,
  };
}
