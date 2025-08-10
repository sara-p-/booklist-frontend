'use client'

import BookGrid from '@/components/layout/BookGrid/BookGrid'
import styles from './page.module.css'
import FiltersSection from '@/components/layout/FiltersSection/FiltersSection'
import DropdownFilters from '@/components/ui/Form/DropdownFilters/Filters/Filters'
import Multiselect from '@/components/ui/Form/DropdownFilters/Multiselect/Multiselect'
import { useBookListContext } from '@/hooks/useBookListContext'
import { getFilterItems } from '@/lib/filtering'

export default function Home() {
  const { bookList } = useBookListContext()
  const books = [...bookList].reverse()

  const authors = getFilterItems(books, 'author')

  console.log(authors)

  return (
    <div className={styles.container}>
      <FiltersSection>
        <DropdownFilters buttonText='sort'></DropdownFilters>
        <DropdownFilters buttonText='authors'>
          <Multiselect items={authors} />
        </DropdownFilters>
        <DropdownFilters buttonText='series'></DropdownFilters>
        <DropdownFilters buttonText='genres'></DropdownFilters>
        <DropdownFilters buttonText='tropes'></DropdownFilters>
        <DropdownFilters buttonText='creatures'></DropdownFilters>
        <DropdownFilters buttonText='tags'></DropdownFilters>
        <DropdownFilters buttonText='rating'></DropdownFilters>
        <DropdownFilters buttonText='spice'></DropdownFilters>
        <DropdownFilters buttonText='completed'></DropdownFilters>
      </FiltersSection>
      {books.length > 0 && <BookGrid books={books} />}
    </div>
  )
}
