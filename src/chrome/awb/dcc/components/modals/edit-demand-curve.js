import React from 'react';
import FormDialog from '@/segments/modals/form-dialog';
import { EDIT_COMPARISON } from '@/constants/dialog';
import { validateComparisonName } from '../../helpers/comparisons';

export default function EditDemandCurveModal({
  value,
  descriptionValue,
  isShared,
  open,
  setOpen,
  onSave,
  allComparisons,
  isLoading,
}) {
  return (
    <FormDialog
      value={value}
      descriptionValue={descriptionValue}
      isShared={isShared}
      title={EDIT_COMPARISON.TITLE}
      label={EDIT_COMPARISON.LABEL}
      open={open}
      setOpen={setOpen}
      confirm={EDIT_COMPARISON.CONFIRM}
      onConfirm={onSave}
      paperProps={{
        style: { width: '560px', maxWidth: '560px', borderRadius: '12px' },
      }}
      isLoading={isLoading}
      validate={(text) => validateComparisonName(allComparisons, text, value)}
      disableOnEmpty={true}
      trimLeadingSpaces={true}
    />
  );
}
