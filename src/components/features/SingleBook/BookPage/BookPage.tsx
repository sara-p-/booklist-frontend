'use client'

import styles from './BookPage.module.css'
import BookInfo from '../BookInfo/BookInfo'
import BookText from '../BookText/BookText'
import ExternalLink from '../ExternalLink/ExternalLink'
import SidebarSection from '../SidebarSection/SidebarSection'
import LinkList from '../LinkList/LinkList'
import TimelineItem from '../TimelineItem/Timeline'
import RelatedBooks from '../RelatedBooks/RelatedBooks'
import Pagination from '../Pagination/Pagination'
import SearchResults from '@/components/layout/SearchResults/SearchResults'
import FiltersSection from '@/components/layout/FiltersSection/FiltersSection'
import { useFilterValuesContext } from '@/hooks/useFilterValuesContext'
import { BookType } from '@/types/bookType'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { DEFAULT_FILTER_VALUES } from '@/lib/globals'
import { useSearchClickValueContext } from '@/hooks/useSearchClickValueContext'

export default function BookPage({
  parsedBook,
  slug,
}: {
  parsedBook: BookType
  slug: string
}) {
  const [searchIsActive, setSearchIsActive] = useState(false)
  const { filterValues, setFilterValues } = useFilterValuesContext()
  const searchRef = useRef(filterValues.search)
  const { searchClickValue, setSearchClickValue } = useSearchClickValueContext()
  // On load, clear the search
  useEffect(() => {
    setFilterValues({ ...DEFAULT_FILTER_VALUES })
  }, [])

  // If the search becomes active after the initial load, show the search results
  useEffect(() => {
    if (
      searchRef.current !== filterValues.search &&
      filterValues.search !== ''
    ) {
      setSearchIsActive(true)
      searchRef.current = filterValues.search
    } else if (filterValues.search === '') {
      setSearchIsActive(false)
      searchRef.current = filterValues.search
    }
  }, [filterValues.search])

  // If the search is open on a single book page, and the user clicks on the search result for the same book, close the search
  useEffect(() => {
    if (searchClickValue === slug) {
      setSearchIsActive(false)
      setFilterValues({ ...DEFAULT_FILTER_VALUES })
      setSearchClickValue('')
    }
  }, [searchClickValue])

  if (searchIsActive) {
    return (
      <div className={styles.searchResultsContainer}>
        <FiltersSection />
        <div className={styles.bookListContainer}>
          <SearchResults />
        </div>
      </div>
    )
  }

  return (
    <div className={styles.pageContainer}>
      <Link href='/' className={styles.backToHomeLink}>
        <FontAwesomeIcon icon={faArrowLeft} /> back to home
      </Link>
      <div className={styles.container}>
        <div className={styles.mainContainer}>
          <BookInfo book={parsedBook} />
          {/* I want element order to change on mobile so I'm throwing the a copy of the sidebar here, that will only show on mobile */}
          <div className={styles.mobileSidebarContainer}>
            <SidebarSection title='stats'>
              <LinkList items={parsedBook.genres} itemLabel='genres' />
              <LinkList items={parsedBook.tropes} itemLabel='tropes' />
              <LinkList items={parsedBook.creatures} itemLabel='creatures' />
              <LinkList items={parsedBook.booktags} itemLabel='booktags' />
            </SidebarSection>
            <SidebarSection title='timeline'>
              <TimelineItem title='started' date={parsedBook.startDate} />
              <TimelineItem title='finished' date={parsedBook.finishDate} />
            </SidebarSection>
            <RelatedBooks slug={slug} />
          </div>
          <div className={styles.bookSection}>
            <BookText title='description'>{parsedBook.description}</BookText>
            {parsedBook.notes.length > 0 &&
              parsedBook.notes !== 'null' &&
              parsedBook.notes !== '' && (
                <BookText title='notes'>{parsedBook.notes}</BookText>
              )}
            {parsedBook.smell.length > 0 &&
              parsedBook.smell !== 'null' &&
              parsedBook.smell !== '' && (
                <BookText title='smell'>{parsedBook.smell}</BookText>
              )}
            <BookText title='links' cname='linksContainer'>
              <ExternalLink href={parsedBook.goodreadsLink} title='Goodreads' />
              <ExternalLink href={parsedBook.amazonLink} title='Amazon' />
            </BookText>
          </div>
        </div>
        <div className={styles.sidebarContainer}>
          <SidebarSection title='stats'>
            <LinkList items={parsedBook.genres} itemLabel='genres' />
            <LinkList items={parsedBook.tropes} itemLabel='tropes' />
            <LinkList items={parsedBook.creatures} itemLabel='creatures' />
            <LinkList items={parsedBook.booktags} itemLabel='booktags' />
          </SidebarSection>
          <SidebarSection title='timeline'>
            <TimelineItem title='started' date={parsedBook.startDate} />
            <TimelineItem title='finished' date={parsedBook.finishDate} />
          </SidebarSection>
          <RelatedBooks slug={slug} />
        </div>
      </div>
      <Pagination slug={slug} />
    </div>
  )
}
