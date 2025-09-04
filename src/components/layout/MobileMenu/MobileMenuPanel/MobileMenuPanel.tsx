import {
  FilterArrayType,
  FilterRangeType,
  FilterRadioType,
} from '@/types/filterType'
import MobileMenuHeader from '../MobileMenuHeader/MobileMenuHeader'
import styles from './MobileMenuPanel.module.css'
import Multiselect from '@/components/ui/Form/DropdownFilters/Multiselect/Multiselect'

type MobileMenuPanelProps = {
  headerTitle: string
  filterArray?: FilterArrayType
  filterRadio?: FilterRadioType
  filterRange?: FilterRangeType
}

export default function MobileMenuPanel({
  headerTitle,
  filterArray,
  filterRadio,
  filterRange,
}: MobileMenuPanelProps) {
  return (
    <div className={styles.panel}>
      <MobileMenuHeader title={headerTitle} />
      {filterArray && <Multiselect filter={filterArray} mobile={true} />}
    </div>
  )
}
