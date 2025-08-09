'use client'

import BookGrid from '@/components/layout/BookGrid/BookGrid'
import styles from './page.module.css'
import { useBookDataContext } from '@/hooks/useBookDataContext'
import FiltersSection from '@/components/layout/FiltersSection/FiltersSection'
import DropdownFilters from '@/components/ui/Form/DropdownFilters/DropdownFilters'

export default function Home() {
  const { data } = useBookDataContext()

  return (
    <div className={styles.container}>
      <FiltersSection>
        <DropdownFilters buttonText='sort'></DropdownFilters>
        <DropdownFilters buttonText='authors'></DropdownFilters>
        <DropdownFilters buttonText='series'></DropdownFilters>
        <DropdownFilters buttonText='genres'></DropdownFilters>
        <DropdownFilters buttonText='tropes'></DropdownFilters>
        <DropdownFilters buttonText='creatures'></DropdownFilters>
        <DropdownFilters buttonText='tags'></DropdownFilters>
        <DropdownFilters buttonText='rating'></DropdownFilters>
        <DropdownFilters buttonText='spice'></DropdownFilters>
        <DropdownFilters buttonText='completed'></DropdownFilters>
      </FiltersSection>
      <BookGrid books={data} />
    </div>
  )
}
