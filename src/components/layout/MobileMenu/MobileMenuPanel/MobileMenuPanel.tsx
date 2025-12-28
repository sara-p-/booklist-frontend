import { FilterArrayType, MobileVisibleFilterType } from '@/types/filterType'
import MobileMenuHeader from '../MobileMenuHeader/MobileMenuHeader'
import styles from './MobileMenuPanel.module.css'
import Multiselect from '@/components/ui/Form/DropdownFilters/Multiselect/Multiselect'
import useMobileFilterStateContext from '@/hooks/useMobileFilterStateContext'
import { ORDER_OPTIONS, SORT_OPTIONS } from '@/lib/globals'
import MobileMenuOptionsList from '@/components/features/Mobile/MobileMenuOptionsList/MobileMenuOptionsList'
import Radio from '@/components/ui/Form/DropdownFilters/Radio/Radio'
import Range from '@/components/ui/Form/DropdownFilters/Range/Range'
import MobileMenuButton from '@/components/ui/MobileMenuButton/MobileMenuButton'

type MobileMenuPanelProps = {
  filterType: MobileVisibleFilterType
  filterArray?: FilterArrayType
}

export default function MobileMenuPanel({
  filterType,
  filterArray,
}: MobileMenuPanelProps) {
  const { mobileFilterState, setMobileFilterState } =
    useMobileFilterStateContext()

  return (
    <div
      className={styles.panel}
      data-open={mobileFilterState[filterType]}
      data-type={filterType}
    >
      <MobileMenuHeader title={filterType} />
      {filterType === 'filters' && <MobileMenuOptionsList />}
      {filterArray && <Multiselect filter={filterArray} mobile={true} />}
      {filterType === 'sort' && (
        <Radio items={SORT_OPTIONS} groupName='sort' mobile={true} />
      )}
      {filterType === 'order' && (
        <Radio items={ORDER_OPTIONS} groupName='order' mobile={true} />
      )}
      {filterType === 'rating' && (
        <Range max={5} buttonText='rating' mobile={true} />
      )}
      {filterType === 'spice' && (
        <Range max={5} buttonText='spice' mobile={true} />
      )}
      {filterType === 'filters' ? (
        <div className={styles.bottomButtons}>
          <MobileMenuButton type='closeFilters' alt={true} />
          <MobileMenuButton type='clearFilters' alt={true} />
        </div>
      ) : (
        <MobileMenuButton type='closeFilters' />
      )}
    </div>
  )
}
