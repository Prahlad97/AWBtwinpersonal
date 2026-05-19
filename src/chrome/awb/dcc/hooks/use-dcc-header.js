import { useState, useRef, useContext, useMemo } from 'react';
import { PROPERTIES } from '@/constants/demand-curve-constants';
import { formatComparisonForCSV } from '../helpers/comparisons';
import { SnackbarContext } from '@/contexts/snackbar-context';
import { SNACKBAR_MESSAGES } from '@/constants/features-constants';
import { extractButtonType, getBaseDemandCurveType } from '../utils/demand-curve-utils';
import useComparisonHeader from './use-comparison-header';
import { ExtensionContext } from '@/extension-context';

export function useDccHeader({
  history,
  comparisonData,
  handleSaveComparison,
  handleDemandCurveOptionChange,
  handleConsumptionOptionChange,
  handleApply,
}) {
  const [consumptionAnchorEl, setConsumptionAnchorEl] = useState(null);
  const [demandCurveAnchorEl, setDemandCurveAnchorEl] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openPublishModal, setOpenPublishModal] = useState(false);
  const [openSaveModal, setOpenSaveModal] = useState(false);
  const [isSaveModalLoading, setIsSaveModalLoading] = useState(false);
  const [isBackBtnClicked, setIsBackBtnClicked] = useState(false);
  const [isPublishModalLoading, setIsPublishModalLoading] = useState(false);
  const [isDeleteModalLoading, setIsDeleteModalLoading] = useState(false);
  const [csvData, setCsvData] = useState([]);
  const csvLinkRef = useRef();

  const { state: { userInfo } } = useContext(ExtensionContext);
  const { actions: { openSnackBar } } = useContext(SnackbarContext);
  const { isLoading, updateComparisonData, deleteComparisonData, allComparisons } = useComparisonHeader();

  const demandCurveData = useMemo(() => {
    const originalDemandCurveType = comparisonData?.comparison?.[PROPERTIES.DEMAND_CURVE_TYPE];
    const extractedButtonType = extractButtonType(originalDemandCurveType);
    const baseDemandCurveType = getBaseDemandCurveType(originalDemandCurveType);
    return {
      duration: comparisonData?.comparison?.[PROPERTIES.PLOT_DURATION],
      demandCurveType: baseDemandCurveType,
      buttonType: extractedButtonType,
    };
  }, [
    comparisonData?.comparison?.[PROPERTIES.DEMAND_CURVE_TYPE],
    comparisonData?.comparison?.[PROPERTIES.PLOT_DURATION],
  ]);

  const handleConsumptionMenuOpen = (event) => setConsumptionAnchorEl(event.currentTarget);
  const handleConsumptionMenuClose = () => {
    handleApply();
    setConsumptionAnchorEl(null);
  };
  const handleDemandCurveMenuOpen = (event) => setDemandCurveAnchorEl(event.currentTarget);
  const handleDemandCurveMenuClose = () => {
    handleApply();
    setDemandCurveAnchorEl(null);
  };
  const handleOpen = (e) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
    setOpen(true);
  };
  const handleClose = (e) => {
    if (e) e.stopPropagation();
    setOpen(false);
  };

  const handleEditModalOpen = () => {
    setOpenEditModal(true);
    setOpen(false);
  };
  const handleDeleteModalOpen = () => {
    setOpenDeleteModal(true);
    setOpen(false);
  };
  const handlePublishModalOpen = () => {
    setOpenPublishModal(true);
    setOpen(false);
  };
  const handleEditModalClose = () => {
    setOpenEditModal(false);
    setOpen(false);
  };
  const handleDeleteModalClose = () => {
    setOpenDeleteModal(false);
    setOpen(false);
  };
  const handlePublishModalClose = () => {
    setOpenPublishModal(false);
    setOpen(false);
  };

  const handleItemClick = (id) => {
    switch (id) {
      case 'rename':
        handleEditModalOpen();
        break;
      case 'delete':
        handleDeleteModalOpen();
        break;
      case 'publish':
        handlePublishModalOpen();
        break;
      case 'downloadCSV':
        handleDownloadCSV();
        break;
      default:
        handleClose();
        break;
    }
  };

  const handleEditModalSave = async (comparisonName, publish, description) => {
    const domainPayload = {
      ...comparisonData,
      comparison: {
        ...comparisonData?.comparison,
        name: comparisonName?.trimEnd(),
        description,
        isShared: publish,
      },
    };
    try {
      await updateComparisonData(comparisonData?.comparison?.dccID, domainPayload, handleEditModalClose);
      openSnackBar({
        id: `comparison-update-${comparisonData?.comparison?.dccID}`,
        message: `${comparisonName?.trimEnd()} ${SNACKBAR_MESSAGES.UPDATED}`,
        actionAllowed: true,
      });
    } catch (error) {
      console.error(error);
      openSnackBar({
        id: `comparison-update-error-${comparisonData?.comparison?.dccID}`,
        message: 'Failed to update comparison',
        actionAllowed: true,
      });
    }
  };

  const handleDeleteModalRemove = async () => {
    const comparisonName = comparisonData?.comparison?.name || 'Comparison';
    try {
      setIsDeleteModalLoading(true);
      const isDeleted = await deleteComparisonData(
        comparisonData?.comparison?.dccID,
        handleDeleteModalClose
      );
      setIsDeleteModalLoading(false);
      if (isDeleted) {
        openSnackBar({
          id: `comparison-delete-${comparisonData?.comparison?.dccID}`,
          message: `${comparisonName} ${SNACKBAR_MESSAGES.DELETED}`,
          actionAllowed: true,
        });
        history.push('/comparisons');
      }
    } catch (error) {
      console.error(error);
      setIsDeleteModalLoading(false);
      openSnackBar({
        id: `comparison-delete-error-${comparisonData?.comparison?.dccID}`,
        message: 'Failed to delete comparison',
        actionAllowed: true,
      });
    }
  };

  const handlePublishModalShare = async () => {
    setIsPublishModalLoading(true);
    const comparisonName = comparisonData?.comparison?.name || 'Comparison';
    const domainPayload = {
      ...comparisonData,
      comparison: { ...comparisonData?.comparison, isShared: true },
    };
    try {
      await updateComparisonData(comparisonData?.comparison?.dccID, domainPayload, handlePublishModalClose);
      openSnackBar({
        id: `comparison-publish-${comparisonData?.comparison?.dccID}`,
        message: `${comparisonName} ${SNACKBAR_MESSAGES.SHARED}`,
        actionAllowed: true,
      });
    } catch (error) {
      console.error(error);
      openSnackBar({
        id: `comparison-publish-error-${comparisonData?.comparison?.dccID}`,
        message: 'Failed to publish comparison',
        actionAllowed: true,
      });
    } finally {
      setIsPublishModalLoading(false);
    }
  };

  const handleDownloadCSV = () => {
    setCsvData(formatComparisonForCSV(comparisonData));
    setTimeout(() => csvLinkRef.current?.link?.click(), 0);
  };

  const handleDemandCurveSave = async () => {
    setIsSaveModalLoading(true);
    const onSaveAndContinue = () => {
      setOpenSaveModal(false);
      if (isBackBtnClicked) {
        history.push('/comparisons');
        setIsBackBtnClicked(false);
      }
    };
    const saved = await handleSaveComparison({ onSaveAndContinue });
    setIsSaveModalLoading(false);
    setOpenSaveModal(false);
    if (saved && isBackBtnClicked) {
      history.push('/comparisons');
      setIsBackBtnClicked(false);
    }
  };

  const handleSaveModalClose = () => {
    if (isBackBtnClicked) {
      history.push('/comparisons');
      setIsBackBtnClicked(false);
    }
  };

  const handleBackClick = () => {
    if (
      comparisonData?.comparison?.isEdited &&
      comparisonData?.comparison?.userId === userInfo?.id
    ) {
      setOpenSaveModal(true);
      setIsBackBtnClicked(true);
    } else {
      history.push('/comparisons');
    }
  };

  const isOwned = comparisonData?.comparison?.userId === userInfo?.id;
  const consumptionLabel = comparisonData?.comparison?.[PROPERTIES.SHOW_AVERAGE]
    ? 'Average Consumption'
    : 'Total Consumption';

  return {
    // Anchors & menu state
    consumptionAnchorEl,
    setConsumptionAnchorEl,
    demandCurveAnchorEl,
    setDemandCurveAnchorEl,
    anchorEl,
    open,
    demandCurveData,
    consumptionLabel,
    isOwned,
    // Modal state
    openEditModal,
    setOpenEditModal,
    openDeleteModal,
    setOpenDeleteModal,
    openPublishModal,
    setOpenPublishModal,
    openSaveModal,
    setOpenSaveModal,
    isSaveModalLoading,
    isPublishModalLoading,
    isDeleteModalLoading,
    isLoading,
    allComparisons,
    csvData,
    csvLinkRef,
    // Handlers
    handleConsumptionMenuOpen,
    handleConsumptionMenuClose,
    handleDemandCurveMenuOpen,
    handleDemandCurveMenuClose,
    handleOpen,
    handleClose,
    handleItemClick,
    handleEditModalSave,
    handleDeleteModalRemove,
    handlePublishModalShare,
    handleDemandCurveSave,
    handleSaveModalClose,
    handleBackClick,
  };
}
