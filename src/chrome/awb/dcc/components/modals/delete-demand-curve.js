import React from 'react'
import { DELETE_COMPARISON } from '@/constants/dialog'
import ConfirmDialog from '@/segments/modals/confirm-dialog'

export default function DeleteDemandCurveModal({
  open,
  setOpen,
  value,
  onDelete,
  title,
  isLoading,
}) {
  return (
    <ConfirmDialog
      open={open}
      title={title || DELETE_COMPARISON.TITLE}
      content={DELETE_COMPARISON.CONTENT}
      confirm={DELETE_COMPARISON.CONFIRM}
      showCancel={true}
      onConfirm={onDelete}
      setOpen={setOpen}
      segmentName={value}
      isShareDialog={false}
      isLoading={isLoading}
    />
  )
}
