import { useState } from 'react';

export function useDeltaCurveCard({
  curveDetails,
  handlePropertyChange,
  showDelete,
  removeDeltaCurveCard,
  handleDeltaCurveDelete,
  handleDeltaCurveUpdate,
  isOwned,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [showEditButtons, setShowEditButtons] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [curveName, setCurveName] = useState(curveDetails?.name);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (payload) => {
    handlePropertyChange(
      {
        curveId: curveDetails.deltaCurveId,
        updatedVal: { ...curveDetails, isEdited: true, ...payload },
      },
      { name: 'deltaCurves', id: 'deltaCurveId' }
    );
  };

  const handleSelect = (e, curveType) => {
    const val = e.target.value === 'DEFAULT' ? '' : e.target.value;
    const payload = { [curveType]: val };
    if (curveType === 'demandCurveId1') payload.demandCurveId2 = '';
    handleChange(payload);
  };

  const saveChanges = () => {
    setShowEditButtons(false);
    if (!curveName?.trim()) return;
    if (curveName === curveDetails?.name) return;
    const dcc_id = curveDetails?.dccId;
    const deltaCurveId = curveDetails?.deltaCurveId;
    if (!dcc_id) return;
    handleDeltaCurveUpdate(dcc_id, deltaCurveId, { name: curveName });
  };

  const discardChanges = () => {
    setShowEditButtons(false);
    setCurveName(curveDetails?.name);
  };

  const handleDeleteModalRemove = async () => {
    try {
      setIsLoading(true);
      const dcc_id = curveDetails?.dccId ?? curveDetails?.dcc_id ?? '';
      const deltaCurveId = curveDetails?.deltaCurveId ?? curveDetails?.dcc_demand_curve_id ?? '';
      if (!dcc_id) {
        removeDeltaCurveCard(deltaCurveId);
        return;
      }
      await handleDeltaCurveDelete(dcc_id, deltaCurveId);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isHovered,
    setIsHovered,
    showEditButtons,
    setShowEditButtons,
    openDeleteModal,
    setOpenDeleteModal,
    curveName,
    setCurveName,
    isLoading,
    handleChange,
    handleSelect,
    saveChanges,
    discardChanges,
    handleDeleteModalRemove,
    isSaveDisabled: !curveName || curveName.trim() === '',
  };
}
