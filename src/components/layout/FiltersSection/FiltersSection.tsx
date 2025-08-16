import Filter from '@/components/ui/Form/DropdownFilters/Filter/Filter'
import styles from './FiltersSection.module.css'
import Multiselect from '@/components/ui/Form/DropdownFilters/Multiselect/Multiselect'
import { useFilterValuesContext } from '@/hooks/useFilterValuesContext'
import { SORT_OPTIONS } from '@/lib/globals'
import Radio from '@/components/ui/Form/DropdownFilters/Radio/Radio'
import BookCountSection from '../BookCountSection/BookCountSection'

export default function FiltersSection() {
  const { filterValues, setFilterValues } = useFilterValuesContext()

  // TODO: Add the handling of the 'rating', 'spice', and 'completed' filters.

  function handleMultiselectChange(
    filter:
      | 'authors'
      | 'series'
      | 'genres'
      | 'tropes'
      | 'creatures'
      | 'booktags',
    value: string
  ) {
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
        <Filter buttonText='rating'></Filter>
        <Filter buttonText='spice'></Filter>
        <Filter buttonText='completed'></Filter>
      </div>
      <BookCountSection />
    </div>
  )
}
