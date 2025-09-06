'use client'

import { MobileFilterStateType } from '@/types/filterType'
import { createContext } from 'react'

type MobileFilterStateContextType = {
  mobileFilterState: MobileFilterStateType
  setMobileFilterState: (state: MobileFilterStateType) => void
}

export const MobileFilterStateContext =
  createContext<MobileFilterStateContextType>({
    mobileFilterState: {
      menu: false,
      sort: false,
      order: false,
      authors: false,
      series: false,
      genres: false,
      tropes: false,
      creatures: false,
      booktags: false,
      rating: false,
      spice: false,
    },
    setMobileFilterState: (state: MobileFilterStateType) => {},
  })
