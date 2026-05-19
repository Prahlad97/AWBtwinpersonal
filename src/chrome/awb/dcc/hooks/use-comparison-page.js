import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DemandCurveContext } from '@/contexts/demand-curve-context';
import { ExtensionContext } from '@/extension-context';
import { SegmentContext } from '@/contexts/segment-context';
import { SnackbarContext } from '@/contexts/snackbar-context';
import { ExtensionContext as LookerSDKContext } from '@/providers/LookerExtensionMock.jsx';
import { cloneDeep, isEqual } from 'lodash';
import {
  applyDataNotPresentToComparison,
  getButtonTypeFromCurveType,
  getDeltaCurve,
  getDeltaCurveName,
  getDemandCurveName,
  getDemandCurveOptionsButtonText,
  hasMeaningfulUnsavedFilters,
  setUpCurvePropertiesData,
  updateComparisonData,
} from '../helpers/comparisons';
import { buildSeriesAndMetaFromResponse } from '../helpers/chart-series';
import { getSegmentFilterQueryForDemandCurve } from '../helpers/segment-filter-query';
import { trackEvent } from '@/utils/analytics/analytics-helper';
import { EVENT_NAMES } from '@/utils/analytics/constants';
import {
  CURVE_DATA_KEYS,
  DEFAULT_CURVE_LABELS,
  DEMAND_CURVE_TYPES,
  PROPERTIES,
} from '@/constants/demand-curve-constants';
import { SNACKBAR_MESSAGES } from '@/constants/features-constants';
import { runDemandCurveComparisonQueryTask } from '@/services/looker-service';
import { isEmptyData } from '../helpers/data-transformer';
import { getFuelTypeforDemandCurve, getCurveOptions } from '../helpers/demand-curve-charts';
import {
  fetchComparison,
  updateComparison,
  createComparison,
  addDemandCurveToComparison,
  addDeltaCurveToComparison,
  updateDemandCurveInComparison,
  updateDeltaCurveInComparison,
  deleteDemandCurveFromComparisonById,
  deleteDeltaCurveFromComparisonById,
} from '../services';
import { getDemandCurveComparisonQuery } from '../helpers/demand-curve-query';
import { isClientpilot } from '@/constants/index';

const useComparisonPage = () => {
  const chartRef = useRef(null);
  const cardContainerRef = useRef(null);
  const isMountedRef = useRef(true);
  const prevSeriesDataRef = useRef(undefined);
  const navigate = useNavigate();
  const history = useMemo(
    () => ({
      push: (path) => navigate(path),
      replace: (path) => navigate(path, { replace: true }),
    }),
    [navigate]
  );
  const { dccId } = useParams();

  const [options, setOptions] = useState({});
  const [isFetching, setIsFetching] = useState(true);
  const [isComparing, setIsComparing] = useState(false);
  const [showAddAnotherCurve, setShowAddAnotherCurve] = useState(false);
  const [demandCurveOptionBtnText, setDemandCurveOptionBtnText] = useState('');
  const [selectedBtnType, setSelectedBtnType] = useState('');
  const [unsavedFiltersDialog, setUnsavedFiltersDialog] = useState({
    open: false,
    message: '',
    curveName: '',
  });

  const lookerSDK = useContext(LookerSDKContext).core40SDK;
  const extensionSDK = useContext(LookerSDKContext).extensionSDK;

  const {
    state: { currentComparison, usageValueFormatDemandCurve, usageValueFormatUsageCurve },
    actions: { setCurrentComparison },
  } = useContext(DemandCurveContext);

  const {
    state: {
      isAwbV2,
      pilotId,
      isAwbNUJ,
      userInfo,
      userAttributeIds,
      allowedPilotName,
      allowedPilotIds,
    },
  } = useContext(ExtensionContext);

  const {
    state: { segmentSnapshots, savedFilters },
  } = useContext(SegmentContext);

  const {
    actions: { openSnackBar },
  } = useContext(SnackbarContext);

  const [comparisonData, setComparisonData] = useState(currentComparison);

  const isOwned = useMemo(
    () => comparisonData?.comparison?.userId === userInfo?.id,
    [comparisonData]
  );

  const sortedCurves = useMemo(
    () =>
      [...(comparisonData?.demandCurves || []), ...(comparisonData?.deltaCurves || [])].sort(
        (a, b) => (a.createdAt || 0) - (b.createdAt || 0)
      ),
    [comparisonData?.demandCurves, comparisonData?.deltaCurves]
  );

  useEffect(() => {
    if (dccId) {
      getComparisonData();
    } else {
      setIsFetching(false);
    }
    return () => {
      isMountedRef.current = false;
      setCurrentComparison();
      setIsFetching(false);
      setIsComparing(false); // Clean up loading state on unmount
    };
  }, []);

  useEffect(() => {
    const newCurves = currentComparison?.demandCurves?.map((curve) =>
      setUpCurvePropertiesData(curve, segmentSnapshots, savedFilters)
    );
    setComparisonData({ ...currentComparison, demandCurves: newCurves });
    const newSeriesData = cloneDeep(currentComparison?.comparison?.[CURVE_DATA_KEYS.SERIES_DATA]);
    if (newSeriesData && !isEqual(prevSeriesDataRef.current, newSeriesData)) {
      setHighchartOptions(newSeriesData, true);
      prevSeriesDataRef.current = newSeriesData;
    }
  }, [currentComparison]);

  useEffect(() => {
    const plotDuration = comparisonData?.comparison?.[PROPERTIES.PLOT_DURATION];
    const curveType = comparisonData?.comparison?.curveType;
    const buttonType = getButtonTypeFromCurveType(curveType) || selectedBtnType;
    if (buttonType && buttonType !== selectedBtnType) setSelectedBtnType(buttonType);
    setDemandCurveOptionBtnText(getDemandCurveOptionsButtonText(plotDuration, buttonType));
  }, [
    comparisonData?.comparison?.[PROPERTIES.PLOT_DURATION],
    comparisonData?.comparison?.curveType,
  ]);

  useEffect(() => {
    if (cardContainerRef.current) {
      cardContainerRef.current.scrollLeft = cardContainerRef.current.scrollWidth;
    }
  }, [comparisonData?.demandCurves?.length, showAddAnotherCurve]);

  const getComparisonData = async () => {
    setIsFetching(true);
    try {
      const token = await extensionSDK.localStorageGetItem('access_token');
      const domain = await fetchComparison(dccId, token);
      setCurrentComparison(domain);
    } catch (error) {
      console.error('An error occurred while fetching comparison data:', error);
    } finally {
      setIsFetching(false);
    }
  };

  const handleChange = (args) => {
    const newComparison = updateComparisonData(args, comparisonData);
    setComparisonData(newComparison);
  };

  const handleConsumptionOptionChange = (newVal) => {
    const updatedVal = newVal === 'AVERAGE';
    const args = { updatedVal, propertyToUpdate: PROPERTIES.SHOW_AVERAGE };
    handleChange(args);
  };

  const handleDemandCurveOptionChange = (newVal) => {
    handleChange([
      { updatedVal: newVal?.duration, propertyToUpdate: PROPERTIES.PLOT_DURATION },
      { updatedVal: newVal?.demandCurveType, propertyToUpdate: 'curveType' },
    ]);
    const btnType = newVal?.buttonType?.toUpperCase();
    setSelectedBtnType(btnType);
    setDemandCurveOptionBtnText(getDemandCurveOptionsButtonText(newVal?.duration, btnType));
  };

  const handleDemandCurveDelete = async (dccid, demandCurveId) => {
    const curveToDelete = comparisonData?.demandCurves?.find(
      (curve) => curve.demandCurveId === demandCurveId
    );
    const curveName = curveToDelete?.name || DEFAULT_CURVE_LABELS.DEMAND;
    try {
      const token = await extensionSDK.localStorageGetItem('access_token');
      const merged = await deleteDemandCurveFromComparisonById(
        dccId,
        demandCurveId,
        comparisonData,
        token
      );
      setCurrentComparison(merged);
      openSnackBar({
        id: `demand-curve-delete-${demandCurveId}`,
        message: `${curveName} ${SNACKBAR_MESSAGES.DELETED}`,
        actionAllowed: true,
      });
    } catch (error) {
      console.error('An error occurred while deleting demand curve data:', error);
      openSnackBar({
        id: `demand-curve-delete-error-${demandCurveId}`,
        message: SNACKBAR_MESSAGES.DEMAND_CURVE_DELETE_FAILED,
        actionAllowed: true,
      });
    }
  };

  const handleDemandCurveUpdate = async (dccid, demandCurveId, updatedCurve) => {
    try {
      // Find the current curve to compare changes
      const currentCurve = comparisonData?.demandCurves?.find(
        (curve) => curve.demandCurveId === demandCurveId
      );

      // Check if there are actual changes
      const hasChanges =
        currentCurve &&
        (currentCurve.name !== updatedCurve.name ||
          currentCurve.segment_name !== updatedCurve.segment_name ||
          currentCurve.saved_filter_name !== updatedCurve.saved_filter_name ||
          currentCurve.timeframe !== updatedCurve.timeframe);

      if (!hasChanges) {
        return;
      }

      const token = await extensionSDK.localStorageGetItem('access_token');
      const merged = await updateDemandCurveInComparison(
        dccId,
        demandCurveId,
        updatedCurve,
        comparisonData,
        token
      );
      setCurrentComparison(merged);

      const curveName = updatedCurve?.name || DEFAULT_CURVE_LABELS.DEMAND;
      openSnackBar({
        id: `demand-curve-update-${demandCurveId}`,
        message: `${curveName} ${SNACKBAR_MESSAGES.UPDATED}`,
        actionAllowed: true,
      });
    } catch (error) {
      console.error('An error occurred while updating demand curve data:', error);
      openSnackBar({
        id: `demand-curve-update-error-${demandCurveId}`,
        message: SNACKBAR_MESSAGES.DEMAND_CURVE_UPDATE_FAILED,
        actionAllowed: true,
      });
    }
  };

  const handleDeltaCurveDelete = async (dccid, deltaCurveId) => {
    const curveToDelete = comparisonData?.deltaCurves?.find(
      (curve) => curve.deltaCurveId === deltaCurveId
    );
    const curveName = curveToDelete?.name || DEFAULT_CURVE_LABELS.DELTA;
    try {
      const token = await extensionSDK.localStorageGetItem('access_token');
      const merged = await deleteDeltaCurveFromComparisonById(
        dccId,
        deltaCurveId,
        comparisonData,
        token
      );
      setCurrentComparison(merged);
      openSnackBar({
        id: `delta-curve-delete-${deltaCurveId}`,
        message: `${curveName} ${SNACKBAR_MESSAGES.DELETED}`,
        actionAllowed: true,
      });
    } catch (error) {
      console.error('An error occurred while deleting delta curve data:', error);
      openSnackBar({
        id: `delta-curve-delete-error-${deltaCurveId}`,
        message: SNACKBAR_MESSAGES.DELTA_CURVE_DELETE_FAILED,
        actionAllowed: true,
      });
    }
  };

  const handleDeltaCurveUpdate = async (dccId, deltaCurveId, updatedCurve) => {
    try {
      const currentCurve = comparisonData?.deltaCurves?.find(
        (curve) => curve.deltaCurveId === deltaCurveId
      );
      const hasChanges = currentCurve && currentCurve.name !== updatedCurve.name;
      if (!hasChanges) return;

      const token = await extensionSDK.localStorageGetItem('access_token');
      const merged = await updateDeltaCurveInComparison(
        dccId,
        deltaCurveId,
        updatedCurve,
        comparisonData,
        token
      );
      setCurrentComparison(merged);
      const curveName = updatedCurve?.name || DEFAULT_CURVE_LABELS.DELTA;
      openSnackBar({
        id: `delta-curve-update-${deltaCurveId}`,
        message: `${curveName} ${SNACKBAR_MESSAGES.UPDATED}`,
        actionAllowed: true,
      });
    } catch (error) {
      console.error('An error occurred while updating delta curve data:', error);
      openSnackBar({
        id: `delta-curve-update-error-${deltaCurveId}`,
        message: SNACKBAR_MESSAGES.DELTA_CURVE_UPDATE_FAILED,
        actionAllowed: true,
      });
    }
  };

  const removeDemandCurveCard = (curveId) => {
    setComparisonData((prev) => ({
      ...prev,
      demandCurves: prev.demandCurves.filter((c) => c.demandCurveId !== curveId),
    }));
  };

  const removeDeltaCurveCard = (curveId) => {
    setComparisonData((prev) => ({
      ...prev,
      deltaCurves: prev.deltaCurves.filter((c) => c.deltaCurveId !== curveId),
    }));
  };

  const updateData = (data) => {
    const { curve, response, plotName, type, errorMsg, propState, savedFilter } = data;
    if (errorMsg && isEmptyData(response)) {
      const args = applyDataNotPresentToComparison(comparisonData, { curve, plotName, errorMsg });
      handleChange(args);
    } else {
      const { newSeriesData, metaInfo, dataNotPresentDetails } = buildSeriesAndMetaFromResponse(
        comparisonData,
        { curve, response, savedFilter, propState, plotName, type }
      );
      handleChange([
        { updatedVal: metaInfo, propertyToUpdate: CURVE_DATA_KEYS.CURVE_META_INFO },
        { updatedVal: newSeriesData, propertyToUpdate: CURVE_DATA_KEYS.SERIES_DATA },
        {
          updatedVal: dataNotPresentDetails,
          propertyToUpdate: CURVE_DATA_KEYS.DATA_NOT_PRESENT_DETAILS,
        },
      ]);
      createDeltaCurves(newSeriesData);
    }
  };

  const getCSVDataQuery = async (curve, segmentFilterQuery, successCallback, errorCallback) => {
    const key = curve.demandCurveId || curve.deltaCurveId;
    const existing = comparisonData?.comparison?.[CURVE_DATA_KEYS.SERIES_DATA]?.[key];
    if (existing?.data?.length) {
      const csv = existing.data
        .map((p, i) => {
          const hour = String(i).padStart(2, '0');
          return `${hour}:00,${p.y ?? p}`;
        })
        .join('\n');
      successCallback(csv);
      return {};
    }

    const savedFilter = curve?.[CURVE_DATA_KEYS.PROPERTIES_DATA][PROPERTIES.SAVED_FILTER_SELECTION];
    let segmentQuery = getDemandCurveComparisonQuery(
      comparisonData.comparison?.curveType,
      savedFilter,
      comparisonData.comparison,
      curve?.[CURVE_DATA_KEYS.PROPERTIES_DATA]?.[PROPERTIES.TIME_INTERVAL],
      { 'demand_curve_sdt.segment_query': segmentFilterQuery },
      pilotId,
      isAwbNUJ
    );

    segmentQuery.lookerSDK = lookerSDK;
    segmentQuery.setQueryResponse = (val) => successCallback(val);
    segmentQuery.setError = (err) => errorCallback(err);
    await runDemandCurveComparisonQueryTask(segmentQuery, isClientpilot(pilotId));

    return segmentQuery;
  };

  const createCurveData = async (curve) => {
    const segmentSnapshot =
      curve?.[CURVE_DATA_KEYS.PROPERTIES_DATA]?.[PROPERTIES.SEGMENT_SELECTION];
    const programSegment = curve?.[CURVE_DATA_KEYS.PROPERTIES_DATA]?.[PROPERTIES.PROGRAM_SEGMENT];
    const savedFilter =
      curve?.[CURVE_DATA_KEYS.PROPERTIES_DATA]?.[PROPERTIES.SAVED_FILTER_SELECTION];
    const plotName = curve?.name;
    const { filterQuery } = getSegmentFilterQueryForDemandCurve({
      segmentSnapshot,
      programSegment,
      allowedPilotName,
      allowedPilotIds,
    });

    const segmentQuery = await getCSVDataQuery(
      curve,
      filterQuery,
      (val) => {
        updateData({
          curve,
          response: val,
          savedFilter,
          error: false,
          propState: comparisonData.comparison,
          plotName,
        });
      },
      (err) => {
        updateData({
          curve,
          savedFilter,
          error: true,
          errorMsg: err,
          plotName,
        });
      }
    );

    trackEvent(EVENT_NAMES.ANALYSIS_DONE, {
      analysisType: DEMAND_CURVE_TYPES.USAGE_TIME,
      segmentApplied: segmentSnapshot?.segment_name || segmentSnapshot?.name,
      savedFiltersApplied: savedFilter?.name,
      plotDuration: comparisonData?.comparison[PROPERTIES.PLOT_DURATION],
      timeInterval: curve?.[CURVE_DATA_KEYS.PROPERTIES_DATA]?.[PROPERTIES.TIME_INTERVAL],
      ConsumptionType: comparisonData?.comparison[PROPERTIES.SHOW_AVERAGE] ? 'AVERAGE' : 'TOTAL',
    });
  };

  const createDeltaCurves = (newSeriesData) => {
    try {
      comparisonData?.deltaCurves?.forEach((curve) => {
        const detlaCurveData = getDeltaCurve(
          newSeriesData,
          curve,
          comparisonData?.comparison[PROPERTIES.PLOT_DURATION]
        );

        if (detlaCurveData) {
          if (newSeriesData?.[curve.deltaCurveId]) {
            newSeriesData[curve.deltaCurveId].data = detlaCurveData.data;
          } else {
            newSeriesData[curve.deltaCurveId] = detlaCurveData;
          }
        }
      });

      const args = {
        updatedVal: newSeriesData,
        propertyToUpdate: CURVE_DATA_KEYS.SERIES_DATA,
      };

      handleChange(args);
      setHighchartOptions(newSeriesData);
    } catch (error) {
      console.error('An error occurred while creating delta curves:', error);
    }
  };

  const handleCompareClick = async (isEdited = false) => {
    // Prevent multiple simultaneous comparisons
    if (isComparing) {
      return;
    }

    setIsComparing(true);

    handleChange([{ updatedVal: {}, propertyToUpdate: CURVE_DATA_KEYS.SERIES_DATA }]);

    try {
      // Get curves that need to be processed
      const curvesToProcess =
        comparisonData?.demandCurves?.filter(
          (curve) =>
            curve?.[PROPERTIES.IS_EDITED] || isEdited || comparisonData?.comparison?.isEdited
        ) || [];

      if (curvesToProcess.length === 0) {
        if (isMountedRef.current) {
          setIsComparing(false);
        }
        return;
      }

      // Process all curves in parallel and wait for all to complete
      const curvePromises = curvesToProcess.map((curve) => createCurveData(curve));
      await Promise.allSettled(curvePromises);
    } catch (error) {
      console.error('An error occurred while comparing curves:', error);
    } finally {
      // Only set loading to false here if component is still mounted
      if (isMountedRef.current) {
        setIsComparing(false);
      }
    }
  };

  const handleSaveComparison = async (options) => {
    const skipUnsavedFilterCheck = options?.skipUnsavedFilterCheck === true;
    const onSaveAndContinue = options?.onSaveAndContinue;

    // Check if there are actual changes to save
    if (!comparisonData?.comparison?.isEdited) {
      return false;
    }

    // Validate required fields before saving
    if (!comparisonData?.comparison?.name?.trim()) {
      return false;
    }

    // Check for unsaved filters in demand curves (only block when filters are applied but not saved)
    if (!skipUnsavedFilterCheck) {
      const demandCurves = comparisonData?.demandCurves || [];
      const curvesWithUnsavedFilters = demandCurves.filter((demandCurve) => {
        const curveProperties = demandCurve?.[CURVE_DATA_KEYS.PROPERTIES_DATA];
        const savedFilterSelection = curveProperties?.[PROPERTIES.SAVED_FILTER_SELECTION];
        return hasMeaningfulUnsavedFilters(savedFilterSelection);
      });
      if (curvesWithUnsavedFilters.length > 0) {
        const defaultName = DEFAULT_CURVE_LABELS.DEMAND;
        const curveNames = curvesWithUnsavedFilters.map((c) => `<b>${c?.name || defaultName}</b>`);
        const namesText =
          curveNames.length === 1
            ? curveNames[0]
            : curveNames.length === 2
            ? `${curveNames[0]} and ${curveNames[1]}`
            : `${curveNames.slice(0, -1).join(', ')} and ${curveNames[curveNames.length - 1]}`;
        const message = `Please save the filters for ${namesText} or else you will lose your data.`;
        setUnsavedFiltersDialog({
          open: true,
          message,
          curveName: curvesWithUnsavedFilters.map((c) => c?.name || defaultName).join(', '),
          onSaveAndContinue,
        });
        return false;
      }
    }

    const token = await extensionSDK.localStorageGetItem('access_token');
    try {
      const domain = dccId
        ? await updateComparison(dccId, comparisonData, token, {
            emptyCountStyleFilterNames: skipUnsavedFilterCheck,
          })
        : await createComparison(comparisonData, token);
      setCurrentComparison(domain);
      return true;
    } catch (error) {
      console.error('Error saving comparison:', error);
      return false;
    }
  };

  const handleCloseAddAnother = () => {
    setShowAddAnotherCurve(false);
  };

  const handleAddDemandCurve = async () => {
    const demandCurveName = getDemandCurveName(comparisonData);
    try {
      const token = await extensionSDK.localStorageGetItem('access_token');
      const merged = await addDemandCurveToComparison(
        dccId,
        { name: demandCurveName },
        comparisonData,
        token
      );
      setCurrentComparison(merged);
    } catch (error) {
      console.error('An error occurred while adding demand curve data:', error);
    }
    setShowAddAnotherCurve(false);
  };

  const handleAddDeltaCurve = async () => {
    const deltaCurveName = getDeltaCurveName(comparisonData);
    try {
      const token = await extensionSDK.localStorageGetItem('access_token');
      const merged = await addDeltaCurveToComparison(
        dccId,
        { name: deltaCurveName },
        comparisonData,
        token
      );
      setCurrentComparison(merged);
    } catch (error) {
      console.error('An error occurred while adding delta curve data:', error);
    }
    setShowAddAnotherCurve(false);
  };

  const setHighchartOptions = (seriesData, initialLoad = false) => {
    const chartSeries = Object.values(seriesData || {});
    const fueltype = getFuelTypeforDemandCurve(chartSeries);
    const chartMetaData = comparisonData?.comparison?.[CURVE_DATA_KEYS.CURVE_META_INFO];

    // Determine chart type based on duration
    // For new naming scheme, curveType should already be set correctly
    // For legacy support, we still check for 576/8760 in PLOT_DURATION
    const duration = comparisonData.comparison?.[PROPERTIES.PLOT_DURATION];
    const curveType = comparisonData.comparison?.curveType;

    // Use curveType directly if it's already set to 576 or 8760
    // Otherwise, check PLOT_DURATION for backward compatibility
    const chartType =
      curveType === '576' || curveType === '8760'
        ? curveType
        : duration === '8760'
        ? DEMAND_CURVE_TYPES.CHART_8760
        : duration === '576'
        ? DEMAND_CURVE_TYPES.CHART_576
        : curveType;

    setOptions(
      getCurveOptions(
        chartType,
        chartSeries,
        chartMetaData,
        fueltype,
        usageValueFormatDemandCurve,
        usageValueFormatUsageCurve,
        comparisonData?.comparison?.[PROPERTIES.SHOW_AVERAGE]
      )
    );
    prevSeriesDataRef.current = seriesData;

    const allCurves = {
      demandCurves: comparisonData?.demandCurves,
      deltaCurves: comparisonData?.deltaCurves,
    };
    Object.values(allCurves).forEach((curves) => {
      curves?.forEach((curve) => (curve[PROPERTIES.IS_EDITED] = false));
    });

    if (!initialLoad) {
      setComparisonData((prev) => ({
        ...prev,
        demandCurves: allCurves?.demandCurves,
        deltaCurves: allCurves?.deltaCurves,
      }));
    }
  };

  const handleCurveDataChange = (args, curveType) => {
    const { curveId, updatedVal } = args;
    const _curves = cloneDeep(comparisonData[curveType.name]);

    const newCurves = _curves?.map((curve) => {
      if (curve[curveType.id] === curveId) {
        return updatedVal;
      } else {
        return curve;
      }
    });

    setComparisonData((prev) => ({
      ...prev,
      comparison: { ...prev.comparison, isEdited: true },
      [curveType.name]: newCurves,
    }));
  };

  return {
    chartRef,
    cardContainerRef,
    history,
    comparisonData,
    setComparisonData,
    sortedCurves,
    showAddAnotherCurve,
    setShowAddAnotherCurve,
    handleCloseAddAnother,
    handleAddDemandCurve,
    handleAddDeltaCurve,
    handleCurveDataChange,
    demandCurveOptionBtnText,
    handleDemandCurveOptionChange,
    handleConsumptionOptionChange,
    handleSaveComparison,
    isFetching,
    isComparing,
    options,
    handleCompareClick,
    setHighchartOptions,
    handleDemandCurveDelete,
    handleDeltaCurveDelete,
    removeDemandCurveCard,
    removeDeltaCurveCard,
    handleDemandCurveUpdate,
    handleDeltaCurveUpdate,
    isOwned,
    unsavedFiltersDialog,
    setUnsavedFiltersDialog,
  };
};

export default useComparisonPage;
