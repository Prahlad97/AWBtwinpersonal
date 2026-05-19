import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateComparison, deleteComparisonById } from '../services';
import { DemandCurveContext } from '@/contexts/demand-curve-context';
import { ExtensionContext as LookerSDKContext } from '@/providers/LookerExtensionMock.jsx';

const useComparisonHeader = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const extensionSDK = useContext(LookerSDKContext).extensionSDK;

  const {
    actions: { setCurrentComparison },
    state: { allComparisons },
  } = useContext(DemandCurveContext);

  const updateComparisonData = async (dccId, domainComparison, callback = () => {}) => {
    const token = await extensionSDK.localStorageGetItem('access_token');
    setIsLoading(true);
    try {
      const domain = await updateComparison(dccId, domainComparison, token);
      setCurrentComparison(domain);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      callback();
    }
  };

  const deleteComparisonData = async (dccId, callback = () => {}) => {
    setIsLoading(true);
    const token = await extensionSDK.localStorageGetItem('access_token');
    try {
      await deleteComparisonById(dccId, token);
      navigate('/comparisons');
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      callback();
    }
  };

  return {
    isLoading,
    updateComparisonData,
    deleteComparisonData,
    allComparisons,
  };
};

export default useComparisonHeader;
