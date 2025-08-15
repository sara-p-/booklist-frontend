import Filter from '@/components/ui/Form/DropdownFilters/Filter/Filter'
import styles from './FiltersSection.module.css'
import Multiselect from '@/components/ui/Form/DropdownFilters/Multiselect/Multiselect'
import { useBookListContext } from '@/hooks/useBookListContext'
import { getFilterItems } from '@/lib/filtering-utils'
import { useFilterValuesContext } from '@/hooks/useFilterValuesContext'
import React, { useEffect, useState } from 'react'
import { SORT_OPTIONS } from '@/lib/globals'
import Radio from '@/components/ui/Form/DropdownFilters/Radio/Radio'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowDownAZ,
  faArrowUpAZ,
  faList,
} from '@fortawesome/free-solid-svg-icons'
import BookCountSection from '../BookCountSection/BookCountSection'

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
    // TODO: Add the handling of the 'rating', 'spice', and 'completed' filters.
    const newFilterValues = { ...filterValues }
    // If the filter is of type string[]:
    if (
      filter === 'authors' ||
      filter === 'series' ||
      filter === 'genres' ||
      filter === 'tropes' ||
      filter === 'creatures' ||
      filter === 'booktags' ||
      filter === 'rating' ||
      filter === 'spice'
    ) {
      // If the new value is already in the array, remove it. Otherwise, add it.
      if (newFilterValues[filter].includes(value)) {
        setFilterValues({
          ...newFilterValues,
          [filter]: newFilterValues[filter].filter((item) => item !== value),
        })
      } else {
        setFilterValues({
          ...newFilterValues,
          [filter]: [...newFilterValues[filter], value],
        })
      }
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
      <BookCountSection />
    </div>
  )
}
