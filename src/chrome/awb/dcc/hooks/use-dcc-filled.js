import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DemandCurveContext } from '@/contexts/demand-curve-context';
import { cloneDeep } from 'lodash';
import { useCreateComparison } from './use-create-comparison';
import { sortItems, filterItems } from '../utils/comparison-list-utils';

export function useDccFilled() {
  const navigate = useNavigate();
  const { state: { allComparisons } } = useContext(DemandCurveContext);
  const createComparisonState = useCreateComparison();

  const [selectedId, setSelectedId] = useState('');
  const [searchText, setSearchText] = useState('');
  const [sortApplied, setSortApplied] = useState({});
  const [filtersApplied, setFiltersApplied] = useState({});
  const [comparisonItemsData, setComparisonItemsData] = useState(allComparisons);
  const [creators, setCreators] = useState([]);

  useEffect(() => {
    setComparisonItemsData(allComparisons);
    setCreators([...new Set(allComparisons.map((item) => item.user_name))]);
  }, [allComparisons]);

  useEffect(() => {
    let filteredItems = cloneDeep(allComparisons);
    filteredItems = filteredItems.filter((item) =>
      item?.name?.toLowerCase().includes(searchText?.trim()?.toLowerCase())
    );
    filteredItems = filterItems(filteredItems, filtersApplied);
    filteredItems = sortItems(filteredItems, sortApplied);
    setComparisonItemsData(filteredItems);
  }, [searchText, sortApplied, filtersApplied, allComparisons]);

  const handleSortApply = (option) => setSortApplied(option);
  const handleFilterApply = (appliedFilters) => setFiltersApplied(appliedFilters);

  const handleSelectComparison = (dccId) => {
    navigate(`/comparisons/${dccId}`);
  };

  const handleBackClick = () => {
    navigate('/dashboards/account');
  };

  const handleSearchChange = (value) => setSearchText(value.trimStart());

  return {
    allComparisons,
    comparisonItemsData,
    creators,
    searchText,
    selectedId,
    handleSortApply,
    handleFilterApply,
    handleSelectComparison,
    handleBackClick,
    handleSearchChange,
    ...createComparisonState,
    isCreateLoading: createComparisonState.isLoading,
  };
}
