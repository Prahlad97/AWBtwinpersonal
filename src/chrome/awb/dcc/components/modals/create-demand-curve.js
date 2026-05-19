import React from 'react';
import FormDialog from '@/segments/modals/form-dialog';
import { CREATE_COMPARISON } from '@/constants/dialog';
import { validateComparisonName } from '../../helpers/comparisons';

export default function CreateDemandCurveModal({
  open,
  setOpen,
  onCreate,
  allComparisons,
  isLoading,
}) {
  return (
    <FormDialog
      title={CREATE_COMPARISON.TITLE}
      label={CREATE_COMPARISON.LABEL}
      open={open}
      setOpen={setOpen}
      confirm={CREATE_COMPARISON.CONFIRM}
      onConfirm={(comparisonName, publish, description) => {
        onCreate({ comparisonName, publish, description });
      }}
      validate={(text) => validateComparisonName(allComparisons, text)}
      paperProps={{
        style: { width: '560px', maxWidth: '560px', borderRadius: '12px' },
      }}
      isLoading={isLoading}
      disableOnEmpty={true}
      parent='dcc'
      trimLeadingSpaces={true}
    />
  );
}
