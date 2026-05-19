import React, { useState } from 'react'
import { PUBLISH_COMPARISON } from '@/constants/dialog'
import ConfirmDialog from '@/segments/modals/confirm-dialog'

export default function PublishDemandCurveModal({
  open,
  setOpen,
  value,
  onShare,
  isLoading
}) {
  return (
    <ConfirmDialog
      open={open}
      title={PUBLISH_COMPARISON.TITLE}
      content={PUBLISH_COMPARISON.CONTENT}
      confirm={PUBLISH_COMPARISON.CONFIRM}
      showCancel={true}
      onConfirm={onShare}
      setOpen={setOpen}
      segmentName={value}
      isShareDialog={true}
      isLoading={isLoading}
    />
  )
}
