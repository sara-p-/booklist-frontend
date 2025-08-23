import styles from './Searchbar.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useFilterValuesContext } from '@/hooks/useFilterValuesContext'
import { useEffect, useState } from 'react'

export default function Searchbar() {
  const { filterValues, setFilterValues } = useFilterValuesContext()
  const [searchValue, setSearchValue] = useState('')
  let typingTimer: NodeJS.Timeout

  useEffect(() => {
    setSearchValue(filterValues.search)
  }, [filterValues.search])

  // Handle typing in the searchbar by waiting for 750ms before updating the filterValues
  function handleTyping(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value)
    if (e.target.value !== '') {
      typingTimer = setTimeout(() => {
        setFilterValues({ ...filterValues, search: e.target.value })
      }, 750)
    }
  }

  return (
    <div className={styles.searchbar}>
      <label htmlFor='search' className={`visually-hidden`}>
        Search
      </label>
      <FontAwesomeIcon className={styles.icon} icon={faSearch} />
      <input
        type='text'
        id='search'
        placeholder='search'
        className={styles.input}
        onChange={handleTyping}
        value={searchValue}
        autoComplete='off'
      />
    </div>
  )
}
