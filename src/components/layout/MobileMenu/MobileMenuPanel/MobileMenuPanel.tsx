import {
  FilterArrayType,
  FilterRangeType,
  FilterRadioType,
  MobileVisibleFilterType,
} from '@/types/filterType'
import MobileMenuHeader from '../MobileMenuHeader/MobileMenuHeader'
import styles from './MobileMenuPanel.module.css'
import Multiselect from '@/components/ui/Form/DropdownFilters/Multiselect/Multiselect'
import useMobileFilterStateContext from '@/hooks/useMobileFilterStateContext'
import { MOBILE_FILTERS } from '@/lib/globals'
import MobileMenuButton from '@/components/ui/MobileMenuButton/MobileMenuButton'
import { useEffect } from 'react'

type MobileMenuPanelProps = {
  filterType: MobileVisibleFilterType
  filterArray?: FilterArrayType
  filterRadio?: FilterRadioType
  filterRange?: FilterRangeType
}

export default function MobileMenuPanel({
  filterType,
  filterArray,
  filterRadio,
  filterRange,
}: MobileMenuPanelProps) {
  const { mobileFilterState, setMobileFilterState } =
    useMobileFilterStateContext()

  useEffect(() => {
    console.log('mobileFilterState', mobileFilterState)
  }, [mobileFilterState])

  if (filterType === 'filters') {
    return (
      <div className={styles.panel} data-open={mobileFilterState[filterType]}>
        <MobileMenuHeader title={filterType} />
        {MOBILE_FILTERS.map((filter) => (
          <MobileMenuButton filterName={filter} key={filter} />
        ))}
      </div>
    )
  }

  return (
    <div className={styles.panel} data-open={mobileFilterState[filterType]}>
      <MobileMenuHeader title={filterType} />
      {filterArray && <Multiselect filter={filterArray} mobile={true} />}
    </div>
  )
}
