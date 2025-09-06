'use client'

import { MobileFilterStateType } from '@/types/filterType'
import { MobileFilterStateContext } from './MobileFilterStateContext'
import { useMemo, useState } from 'react'
import { DEFAULT_MOBILE_FILTER_STATE_VALUES } from '@/lib/globals'

export default function MobileFilterStateContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [mobileFilterState, setMobileFilterState] =
    useState<MobileFilterStateType>(DEFAULT_MOBILE_FILTER_STATE_VALUES)

  const contextValue = useMemo(() => {
    return {
      mobileFilterState,
      setMobileFilterState,
    }
  }, [mobileFilterState])

  return (
    <MobileFilterStateContext.Provider value={contextValue}>
      {children}
    </MobileFilterStateContext.Provider>
  )
}
