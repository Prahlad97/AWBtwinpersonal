import React, { useContext, useState } from 'react'
import { deleteComparison, updateComparisons } from '../services'
import { DemandCurveContext } from '@/contexts/demand-curve-context'

import { ExtensionContext as LookerSDKContext } from '@/providers/LookerExtensionMock.jsx'
import { cloneDeep } from 'lodash'

const useComparisonCard = () => {
  const [isLoading, setIsLoading] = useState(false)

  const extensionSDK = useContext(LookerSDKContext).extensionSDK

  const {
    actions: { setupComparisons },
    state: { allComparisons },
  } = useContext(DemandCurveContext)

  const updateComparisonData = async (dccId, payload, callback = () => {}) => {
    const token = await extensionSDK.localStorageGetItem('access_token')
    setIsLoading(true)
    try {
      const response = await updateComparisons(dccId, payload, token)
      const newCompList = cloneDeep(allComparisons).map((comp) => {
        if (comp.dcc_id === dccId) {
          return response?.comparison;
        } else {
          return comp;
        }
      })
      setupComparisons(newCompList)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
      callback()
    }
  }

  const deleteComparisonData = async (dccId, callback = () => {}) => {
    setIsLoading(true)
    const token = await extensionSDK.localStorageGetItem('access_token')
    try {
      const response = await deleteComparison(dccId, token)
      const newCompList = cloneDeep(allComparisons).filter(
        (comp) => comp.dcc_id !== dccId,
      )
      setupComparisons(newCompList)
      return response;
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
      callback()
    }
  }

  return {
    isLoading,
    updateComparisonData,
    deleteComparisonData,
    allComparisons
  }
}

export default useComparisonCard
