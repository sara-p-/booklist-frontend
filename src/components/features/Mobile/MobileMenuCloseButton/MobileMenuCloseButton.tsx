'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './MobileMenuCloseButton.module.css'
import { useFilteredBooks } from '@/hooks/useFilteredBooks'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { DEFAULT_MOBILE_FILTER_STATE_VALUES } from '@/lib/globals'
import useMobileFilterStateContext from '@/hooks/useMobileFilterStateContext'

export default function MobileMenuCloseButton() {
  const filteredBooks = useFilteredBooks()
  const { mobileFilterState, setMobileFilterState } =
    useMobileFilterStateContext()

  if (!filteredBooks) return null

  function handleCloseMobileMenu() {
    setMobileFilterState({
      ...mobileFilterState,
      ...DEFAULT_MOBILE_FILTER_STATE_VALUES,
    })
  }

  return (
    <button className={styles.button} onClick={handleCloseMobileMenu}>
      <FontAwesomeIcon icon={faArrowLeft} /> View {filteredBooks.length} books
    </button>
  )
}
