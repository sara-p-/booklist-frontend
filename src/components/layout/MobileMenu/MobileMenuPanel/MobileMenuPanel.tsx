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
import {
  DEFAULT_MOBILE_FILTER_STATE_VALUES,
  MOBILE_FILTERS,
} from '@/lib/globals'
import MobileMenuListButton from '@/components/ui/MobileMenuListButton/MobileMenuListButton'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import MobileMenuButton from '@/components/ui/MobileMenuButton/MobileMenuButton'
import MobileMenuOptionsList from '@/components/features/Mobile/MobileMenuOptionsList/MobileMenuOptionsList'

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

  // function handleCloseMobileMenu() {
  //   setMobileFilterState({
  //     ...mobileFilterState,
  //     ...DEFAULT_MOBILE_FILTER_STATE_VALUES,
  //   })
  // }

  return (
    <div className={styles.panel} data-open={mobileFilterState[filterType]}>
      <MobileMenuHeader title={filterType} />
      {/* {filterType === 'filters' && <MobileMenuButton type='clearFilters' />} */}
      {filterType === 'filters' ? (
        <MobileMenuOptionsList />
      ) : (
        filterArray && <Multiselect filter={filterArray} mobile={true} />
      )}
      <MobileMenuButton type='closeFilters' />
    </div>
  )
}
