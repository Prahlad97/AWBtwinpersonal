import React from 'react'
import { SAVE_COMPARISON } from '@/constants/dialog'
import ConfirmDialog from '@/segments/modals/confirm-dialog'

const saveBtnSx = {
  backgroundColor: '#1D5ED8 !important',
  color: '#FFFFFF !important',
  '&:hover': {
    backgroundColor: '#1D5ED8 !important'
  }
}

export default function SaveDemandCurveModal({
  open,
  setOpen,
  value,
  onSave,
  title,
  isLoading,
  onCancel,
  disableBackdropClick = false,
}) {
  return (
    <ConfirmDialog
      open={open}
      title={title || SAVE_COMPARISON.TITLE}
      content={SAVE_COMPARISON.CONTENT}
      cancel= {SAVE_COMPARISON.CANCEL}
      confirm={SAVE_COMPARISON.CONFIRM}
      showCancel={true}
      onConfirm={onSave}
      onCancel={onCancel}
      setOpen={setOpen}
      segmentName={value}
      isShareDialog={false}
      isLoading={isLoading}
      saveBtnSx={saveBtnSx}
      disableBackdropClick={disableBackdropClick}
    />
  )
}
