import Filter from '@/components/ui/Form/DropdownFilters/Filter/Filter'
import styles from './FiltersSection.module.css'
import Multiselect from '@/components/ui/Form/DropdownFilters/Multiselect/Multiselect'
import { SORT_OPTIONS } from '@/lib/globals'
import Radio from '@/components/ui/Form/DropdownFilters/Radio/Radio'
import BookCountSection from '../BookCountSection/BookCountSection'
import Range from '@/components/ui/Form/DropdownFilters/Range/Range'

export default function FiltersSection() {
  // TODO: Add the 'completed' filter.

  return (
    <div className={styles.container}>
      <div className={styles.filtersWrapper}>
        <Filter buttonText='sort'>
          <Radio items={SORT_OPTIONS} groupName='sort' />
        </Filter>
        <Filter buttonText='authors'>
          <Multiselect filter='authors' />
        </Filter>
        <Filter buttonText='series'>
          <Multiselect filter='series' />
        </Filter>
        <Filter buttonText='genres'>
          <Multiselect filter='genres' />
        </Filter>
        <Filter buttonText='tropes'>
          <Multiselect filter='tropes' />
        </Filter>
        <Filter buttonText='creatures'>
          <Multiselect filter='creatures' />
        </Filter>
        <Filter buttonText='booktags'>
          <Multiselect filter='booktags' />
        </Filter>
        <Filter buttonText='rating'>
          <Range max={10} buttonText='rating' />
        </Filter>
        <Filter buttonText='spice'>
          <Range max={5} buttonText='spice' />
        </Filter>
        {/* <Filter buttonText='finished'>
          <Radio
            items={FINISHED_OPTIONS}
            groupName='completed'
            onChange={handleRadioChange}
          />
        </Filter> */}
      </div>
      <BookCountSection />
    </div>
  )
}
