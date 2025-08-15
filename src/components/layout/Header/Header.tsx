'use client'

import React from 'react'
import styles from './Header.module.css'
import Searchbar from '@/components/ui/Form/Searchbar/Searchbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faMoon } from '@fortawesome/free-solid-svg-icons'
import MenuButton from '@/components/ui/MenuButton/MenuButton'
import Link from 'next/link'

export default function Header() {
  const [activeButton, setActiveButton] = React.useState('books')

  function handleButtonClick(label: string) {
    setActiveButton(label)
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={`${styles.column} ${styles.leftColumn}`}>
          <Link href='/' className={styles.titleLink}>
            <div className={styles.titleContainer}>
              <FontAwesomeIcon className={styles.icon} icon={faBook} />
              <h1 className={styles.title}>BookList</h1>
            </div>
          </Link>
          <div className={styles.menuContainer}>
            <MenuButton
              href='/'
              label='books'
              isActive={activeButton === 'books'}
              onClick={handleButtonClick}
            />
            <MenuButton
              href='/'
              label='timeline'
              isActive={activeButton === 'timeline'}
              onClick={handleButtonClick}
            />
          </div>
          <Searchbar />
        </div>
        <div className={styles.column}>
          <button className={styles.themeToggle}>
            <FontAwesomeIcon icon={faMoon} />
          </button>
        </div>
      </div>
    </header>
  )
}
