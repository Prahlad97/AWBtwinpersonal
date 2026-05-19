import { useContext, useState, useRef, useEffect } from 'react';
import { CURVE_DATA_KEYS, PROPERTIES } from '@/constants/demand-curve-constants';
import { SegmentContext } from '@/contexts/segment-context';
import { ExtensionContext } from '@/extension-context';
import { modifyDemandCurveFilters } from '../helpers/comparisons';
import { getSegmentDisplayName } from '../utils/demand-curve-utils';
import { useRunInlineQuerySavedFilters } from '@/hooks';
import { updateDataForSavedFilters } from '@/utils/action-helpers';
import { WIDGETS } from '@/widgets';
import { FILTERS_OF_ALL_SAVED_FILTERS_LIST_QUERY } from '@/constants/features-constants';

export function useDemandCurveCard({
  curveDetails,
  handlePropertyChange,
  showDelete,
  removeDemandCurveCard,
  handleDemandCurveDelete,
  handleDemandCurveUpdate,
  isCardToTrim,
  isOwned,
}) {
  const {
    state: { currentDrProgramData, selectedDrEventIdsForDcc },
    actions: { setSavedFilters, setSelectedDrEventIdsForDcc },
  } = useContext(SegmentContext);
  const {
    state: { userInfo },
  } = useContext(ExtensionContext);

  const curveProperties = curveDetails?.[CURVE_DATA_KEYS.PROPERTIES_DATA];
  const selectedSegment = curveProperties?.[PROPERTIES.SEGMENT_SELECTION] || null;
  const selectedProgramSegment = curveProperties?.[PROPERTIES.PROGRAM_SEGMENT] || null;
  const selectedFilter = curveProperties?.[PROPERTIES.SAVED_FILTER_SELECTION] || null;
  const selectedTimeInterval = curveProperties?.[PROPERTIES.TIME_INTERVAL] || null;

  const [isHovered, setIsHovered] = useState(false);
  const [showEditButtons, setShowEditButtons] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [curveName, setCurveName] = useState(curveDetails?.name);
  const [openSegmentSelectModal, setOpenSegmentSelectModal] = useState(false);
  const [isFilterPaneOpen, setIsFilterPaneOpen] = useState(false);
  const [segmentAnchorEl, setSegmentAnchorEl] = useState(null);
  const [openSegmentList, setOpenSegmentList] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaveFilterModalOpen, setIsSaveFilterModalOpen] = useState(false);
  const [filtersToSave, setFiltersToSave] = useState(null);
  const [updateSavedFilterList, setUpdateSavedFilterList] = useState(false);

  const { data: savedFiltersData, isLoading: savedFiltersLoading } = useRunInlineQuerySavedFilters(
    WIDGETS.SAVED_FILTERS,
    FILTERS_OF_ALL_SAVED_FILTERS_LIST_QUERY,
    false,
    [updateSavedFilterList]
  );

  useEffect(() => {
    if (savedFiltersData && userInfo?.id) {
      const allSavedFilters = updateDataForSavedFilters(savedFiltersData, userInfo.id);
      setSavedFilters(allSavedFilters);
    }
  }, [savedFiltersData, userInfo?.id]);

  const filterButtonRef = useRef(null);
  const centeredTriggerRef = useRef(null);

  const segmentName = getSegmentDisplayName(curveProperties);

  const handleChange = (newVal) => {
    handlePropertyChange(
      {
        curveId: curveDetails.demandCurveId,
        updatedVal: {
          ...curveDetails,
          isEdited: true,
          [CURVE_DATA_KEYS.PROPERTIES_DATA]: newVal,
        },
      },
      { name: 'demandCurves', id: 'demandCurveId' }
    );
  };

  const handleSegmentSelect = (segments) => {
    if (!Array.isArray(segments)) return;
    const validSegments = segments.filter((seg) => !seg.program_id);
    const validProgramSegments = segments.filter((seg) => seg.program_id);
    const seg = validSegments.length > 0 ? validSegments[0] : null;
    const programSeg = validProgramSegments.length > 0 ? validProgramSegments[0] : null;
    handleChange({
      ...curveProperties,
      [PROPERTIES.SEGMENT_SELECTION]: seg || null,
      [PROPERTIES.PROGRAM_SEGMENT]: programSeg || null,
    });
  };

  const handleRemoveSegment = (e) => {
    e.stopPropagation();
    handleSegmentSelect([]);
    setOpenSegmentSelectModal(false);
    setOpenSegmentList(false);
  };

  const updateTimeInterval = (index, val) => {
    handleChange({
      ...curveProperties,
      [PROPERTIES.TIME_INTERVAL]: val,
    });
  };

  const saveChanges = () => {
    setShowEditButtons(false);
    if (!curveName?.trim()) return;
    if (curveName === curveDetails?.name) return;
    const dcc_id = curveDetails?.dccId ?? '';
    const demandCurveId = curveDetails?.demandCurveId;
    if (!dcc_id) return;
    handleDemandCurveUpdate(dcc_id, demandCurveId, {
      name: curveName,
      [CURVE_DATA_KEYS.PROPERTIES_DATA]: curveProperties,
    });
  };

  const discardChanges = () => {
    setShowEditButtons(false);
    setCurveName(curveDetails?.name);
  };

  const handleDeleteModalRemove = async () => {
    try {
      setIsLoading(true);
      const dcc_id = curveDetails?.dccId ?? curveDetails?.dcc_id ?? '';
      const demandCurveId = curveDetails?.demandCurveId ?? curveDetails?.dcc_demand_curve_id ?? '';
      if (!dcc_id) {
        removeDemandCurveCard(demandCurveId);
        return;
      }
      await handleDemandCurveDelete(dcc_id, demandCurveId);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handleFilterPaneClose = () => setIsFilterPaneOpen(false);

  const handleFilterSaved = (savedFilterName, savedFilterId) => {
    handleApplyFilters({
      selectedSavedFilter: {
        name: savedFilterName,
        saved_filter_id: savedFilterId,
        filters: filtersToSave,
      },
    });
  };

  const handleApplyFilters = ({ filters = null, selectedSavedFilter = null }) => {
    let filterData;
    if (selectedSavedFilter) {
      const rawFilters = selectedSavedFilter.filters;
      const filtersForCurve = Array.isArray(rawFilters)
        ? modifyDemandCurveFilters(rawFilters)
        : rawFilters && typeof rawFilters === 'object' && !Array.isArray(rawFilters)
        ? rawFilters
        : {};
      filterData = {
        id: selectedSavedFilter.saved_filter_id,
        name: selectedSavedFilter.name,
        filters: filtersForCurve,
      };
    } else {
      const isFiltersObject = filters && typeof filters === 'object' && !Array.isArray(filters);
      const filterCount = isFiltersObject
        ? Object.values(filters).filter((val) => val && val !== '' && val !== '""').length
        : 0;
      filterData = {
        id: null,
        name:
          filterCount > 0
            ? `${filterCount} ${filterCount === 1 ? 'Filter' : 'Filters'} Applied`
            : '',
        filters: filters || {},
      };
    }
    handleChange({
      ...curveProperties,
      [PROPERTIES.SAVED_FILTER_SELECTION]: filterData,
    });
  };

  const openSegmentSelect = (e) => {
    setSegmentAnchorEl(e.currentTarget);
    setOpenSegmentSelectModal(true);
  };

  const openSaveFilterModal = (filters) => {
    setFiltersToSave(filters);
    setIsSaveFilterModalOpen(true);
  };

  return {
    curveProperties,
    selectedSegment,
    selectedProgramSegment,
    selectedFilter,
    selectedTimeInterval,
    segmentName,
    isHovered,
    setIsHovered,
    showEditButtons,
    setShowEditButtons,
    openDeleteModal,
    setOpenDeleteModal,
    curveName,
    setCurveName,
    openSegmentSelectModal,
    setOpenSegmentSelectModal,
    openSegmentList,
    setOpenSegmentList,
    segmentAnchorEl,
    isFilterPaneOpen,
    setIsFilterPaneOpen,
    isSaveFilterModalOpen,
    setIsSaveFilterModalOpen,
    filtersToSave,
    updateSavedFilterList,
    setUpdateSavedFilterList,
    isLoading,
    savedFiltersLoading,
    filterButtonRef,
    centeredTriggerRef,
    currentDrProgramData,
    handleChange,
    handleSegmentSelect,
    handleRemoveSegment,
    updateTimeInterval,
    saveChanges,
    discardChanges,
    handleDeleteModalRemove,
    handleFilterPaneClose,
    handleFilterSaved,
    handleApplyFilters,
    openSegmentSelect,
    openSaveFilterModal,
    isSaveDisabled: !curveName || curveName.trim() === '',
    narrowWidth: isCardToTrim || showDelete,
  };
}
