import { useNavigate } from 'react-router-dom';
import { useCreateComparison } from './use-create-comparison';

export function useDccEmpty() {
  const navigate = useNavigate();
  const createComparisonState = useCreateComparison();

  const handleBackClick = () => {
    navigate('/dashboards/account');
  };

  return {
    handleBackClick,
    ...createComparisonState,
  };
}
