import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { createComparisons as createComparisonApiService } from '../services';
import { ExtensionContext } from '@/extension-context';
import { DemandCurveContext } from '@/contexts/demand-curve-context';
import { DEFAULT_DEMAND_CURVES_DOMAIN } from '@/constants/demand-curve-constants';
import { comparisonFromResponse } from '../services/comparison-mappers';

export function useCreateComparison() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const {
    actions: { setCurrentComparison },
    state: { allComparisons },
  } = useContext(DemandCurveContext);
  const {
    state: { allowedPilotName, userInfo },
  } = useContext(ExtensionContext);

  const openCreateModal = () => setOpenModal(true);
  const closeCreateModal = () => setOpenModal(false);

  const createComparison = async ({ comparisonName, publish, description }) => {
    const domainPayload = {
      name: comparisonName?.trimEnd(),
      description,
      is_shared: publish,
      pilot_name: allowedPilotName,
      user_name: `${userInfo.first_name} ${userInfo.last_name}`,
      curve_type: 'HOURLY',
      consumption_type: 'TOTAL',
      user_email: userInfo.email,
      demand_curves: DEFAULT_DEMAND_CURVES_DOMAIN,
      delta_curves: [],
    };

    try {
      setIsLoading(true);
      const response = await createComparisonApiService(domainPayload, 'lab-token');
      const domain = comparisonFromResponse(response);
      setCurrentComparison(domain);
      navigate(`/comparisons/${domain?.comparison?.dccID}`);
      setOpenModal(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    openModal,
    setOpenModal,
    openCreateModal,
    closeCreateModal,
    isLoading,
    allComparisons,
    createComparison,
  };
}
