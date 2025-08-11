import Filter from '@/components/ui/Form/DropdownFilters/Filter/Filter'
import styles from './FiltersSection.module.css'
import Multiselect from '@/components/ui/Form/DropdownFilters/Multiselect/Multiselect'
import { useBookListContext } from '@/hooks/useBookListContext'
import { getFilterItems } from '@/lib/filtering'
import { useFilterValuesContext } from '@/hooks/useFilterValuesContext'
import { FilterType } from '@/types/filterType'

export default function FiltersSection() {
  const { bookList } = useBookListContext()
  const { filterValues, setFilterValues } = useFilterValuesContext()

  const authors = getFilterItems(bookList, 'author')
  const series = getFilterItems(bookList, 'series')
  const genres = getFilterItems(bookList, 'genres')
  const tropes = getFilterItems(bookList, 'tropes')
  const creatures = getFilterItems(bookList, 'creatures')
  const booktags = getFilterItems(bookList, 'booktags')

  function handleMultiselectChange(filter: string, value: string) {
    const newFilterValues = { ...filterValues }
    // if (
    //   filter !== 'sort' &&
    //   filter !== 'order' &&
    //   filter !== 'completed' &&
    //   filter !== 'search'
    // ) {
    //   setFilterValues({
    //     ...newFilterValues,
    //     [filter]: Array.isArray(newFilterValues[filter as keyof FilterType])
    //       ? [
    //           ...(newFilterValues[filter as keyof FilterType] as string[]),
    //           value,
    //         ]
    //       : [value],
    //   })
    // } else {
    //   setFilterValues({ ...newFilterValues, [filter]: value })
    // }

    // if (Array.isArray(newFilterValues[filter as keyof FilterType])) {
    //   newFilterValues[filter as keyof FilterType] = [
    //     ...(newFilterValues[filter as keyof FilterType] as string[]),
    //     value,
    //   ]
    // } else {
    //   newFilterValues[filter as keyof FilterType] = [value]

    setFilterValues({
      ...newFilterValues,
      [filter]: Array.isArray(newFilterValues[filter as keyof FilterType])
        ? [...(newFilterValues[filter as keyof FilterType] as string[]), value]
        : [value],
    })

    console.log(newFilterValues)
  }

  return (
    <div className={styles.container}>
      <div className={styles.filtersWrapper}>
        <Filter buttonText='sort'></Filter>
        <Filter buttonText='authors'>
          <Multiselect
            onChange={handleMultiselectChange}
            items={authors}
            filter='authors'
          />
        </Filter>
        <Filter buttonText='series'>
          <Multiselect
            onChange={handleMultiselectChange}
            items={series}
            filter='series'
          />
        </Filter>
        <Filter buttonText='genres'>
          <Multiselect
            onChange={handleMultiselectChange}
            items={genres}
            filter='genres'
          />
        </Filter>
        <Filter buttonText='tropes'>
          <Multiselect
            onChange={handleMultiselectChange}
            items={tropes}
            filter='tropes'
          />
        </Filter>
        <Filter buttonText='creatures'>
          <Multiselect
            onChange={handleMultiselectChange}
            items={creatures}
            filter='creatures'
          />
        </Filter>
        <Filter buttonText='booktags'>
          <Multiselect
            onChange={handleMultiselectChange}
            items={booktags}
            filter='booktags'
          />
        </Filter>
        <Filter buttonText='rating'></Filter>
        <Filter buttonText='spice'></Filter>
        <Filter buttonText='completed'></Filter>
      </div>
    </div>
  )
}
