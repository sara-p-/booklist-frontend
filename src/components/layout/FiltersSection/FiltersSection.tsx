import Filter from '@/components/ui/Form/DropdownFilters/Filter/Filter'
import styles from './FiltersSection.module.css'
import Multiselect from '@/components/ui/Form/DropdownFilters/Multiselect/Multiselect'
import { useFilterValuesContext } from '@/hooks/useFilterValuesContext'
import { FINISHED_OPTIONS, SORT_OPTIONS } from '@/lib/globals'
import Radio from '@/components/ui/Form/DropdownFilters/Radio/Radio'
import BookCountSection from '../BookCountSection/BookCountSection'
import Range from '@/components/ui/Form/DropdownFilters/Range/Range'
import { FilterArrayType } from '@/types/filterType'

export default function FiltersSection() {
  const { filterValues, setFilterValues } = useFilterValuesContext()

  // TODO: Add the handling of the 'completed' filter.

  function handleMultiselectChange(filter: FilterArrayType, value: string) {
    const newFilterValues = { ...filterValues }
    const filterValue = newFilterValues[filter]

    if (filterValue.includes(value)) {
      setFilterValues({
        ...newFilterValues,
        [filter]: filterValue.filter((item) => item !== value),
      })
    } else {
      setFilterValues({
        ...newFilterValues,
        [filter]: [...filterValue, value],
      })
    }
  }

  function handleRadioChange(filter: string, value: string) {
    const newFilterValues = { ...filterValues }
    setFilterValues({
      ...newFilterValues,
      [filter]: value,
    })
  }

  function handleRangeChange(filter: 'rating' | 'spice', value: string[]) {
    const newFilterValues = { ...filterValues }
    setFilterValues({
      ...newFilterValues,
      [filter]: value,
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles.filtersWrapper}>
        <Filter buttonText='sort'>
          <Radio
            items={SORT_OPTIONS}
            groupName='sort'
            onChange={handleRadioChange}
          />
        </Filter>
        <Filter buttonText='authors'>
          <Multiselect onChange={handleMultiselectChange} filter='authors' />
        </Filter>
        <Filter buttonText='series'>
          <Multiselect onChange={handleMultiselectChange} filter='series' />
        </Filter>
        <Filter buttonText='genres'>
          <Multiselect onChange={handleMultiselectChange} filter='genres' />
        </Filter>
        <Filter buttonText='tropes'>
          <Multiselect onChange={handleMultiselectChange} filter='tropes' />
        </Filter>
        <Filter buttonText='creatures'>
          <Multiselect onChange={handleMultiselectChange} filter='creatures' />
        </Filter>
        <Filter buttonText='booktags'>
          <Multiselect onChange={handleMultiselectChange} filter='booktags' />
        </Filter>
        <Filter buttonText='rating'>
          <Range max={10} buttonText='rating' onChange={handleRangeChange} />
        </Filter>
        <Filter buttonText='spice'>
          <Range max={5} buttonText='spice' onChange={handleRangeChange} />
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
