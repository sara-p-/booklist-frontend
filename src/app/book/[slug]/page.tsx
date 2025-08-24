import styles from './page.module.css'
import Image from 'next/image'
import { convertStringToDate } from '@/lib/utils'
import parse from 'html-react-parser'
import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import LinkList from '@/components/features/SingleBook/LinkList/LinkList'
import SidebarSection from '@/components/features/SingleBook/SidebarSection/SidebarSection'
import TimelineItem from '@/components/features/SingleBook/TimelineItem/Timeline'

export default async function BookPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const data = await fetch(
    `https://readthatbooklist.com/wp-json/booklist/v1/book?slug=${slug}`
  )
  const book = await data.json()

  return (
    <div className={styles.container}>
      <div className={styles.mainContainer}>
        <div className={styles.bookImageandTitle}>
          <div className={styles.bookImageContainer}>
            <Image
              src={book.image}
              alt={book.title}
              fill={true}
              sizes='311px, 467px'
            />
          </div>

          <div className={styles.bookInfo}>
            <div className={styles.bookTitleContainer}>
              <h1 className={styles.bookTitle}>{book.title}</h1>
              <h2 className={styles.bookAuthor}>{book.authors[0].name}</h2>
            </div>
            <ul className={styles.bookInfoList}>
              <li className={styles.bookInfoItem}>
                <p>
                  <span className={`${styles.bookInfoLabel} h4`}>series:</span>{' '}
                  {book.series[0].name}
                </p>
              </li>
              <li className={styles.bookInfoItem}>
                <p>
                  <span className={`${styles.bookInfoLabel} h4`}>
                    book number:
                  </span>{' '}
                  {book.bookNumber}
                </p>
              </li>
              <li className={styles.bookInfoItem}>
                <p>
                  <span className={`${styles.bookInfoLabel} h4`}>
                    published:
                  </span>{' '}
                  {convertStringToDate(book.publishDate)}
                </p>
              </li>
              <li className={styles.bookInfoItem}>
                <p>
                  <span className={`${styles.bookInfoLabel} h4`}>length:</span>{' '}
                  {book.length} pages
                </p>
              </li>
              <li className={styles.bookInfoItem}>
                <p>
                  <span className={`${styles.bookInfoLabel} h4`}>rating:</span>{' '}
                  {book.rating}/10
                </p>
              </li>
              <li className={styles.bookInfoItem}>
                <p>
                  <span className={`${styles.bookInfoLabel} h4`}>spice:</span>{' '}
                  {book.spice}/5
                </p>
              </li>
              <li className={styles.bookInfoItem}>
                <p>
                  <span className={`${styles.bookInfoLabel} h4`}>
                    amount completed:
                  </span>{' '}
                  {book.amountCompleted}%
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.bookSection}>
          <div className={styles.bookTextContainer}>
            <h3 className={styles.bookTextTitle}>Description</h3>
            <div className={styles.bookText}>{parse(book.description)}</div>
          </div>
          <div className={styles.bookTextContainer}>
            <h4 className={styles.bookTextTitle}>Notes</h4>
            <div className={styles.bookText}>{parse(book.notes)}</div>
          </div>
          <div className={styles.bookTextContainer}>
            <h4 className={styles.bookTextTitle}>Smell</h4>
            <div className={styles.bookText}>
              <p>{book.smell}</p>
            </div>
          </div>
          <div className={styles.bookTextContainer}>
            <h4 className={styles.bookTextTitle}>Links</h4>
            <div className={styles.bookLinksContainer}>
              <a
                className={styles.bookLink}
                href={book.goodreadsLink}
                target='_blank'
              >
                Goodreads{` `}
                <FontAwesomeIcon icon={faUpRightFromSquare} />
              </a>
              <a
                className={styles.bookLink}
                href={book.amazonLink}
                target='_blank'
              >
                Amazon{` `}
                <FontAwesomeIcon icon={faUpRightFromSquare} />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.sidebarContainer}>
        <SidebarSection title='stats'>
          <LinkList items={book.genres} itemLabel='genres' />
          <LinkList items={book.tropes} itemLabel='tropes' />
          <LinkList items={book.creatures} itemLabel='creatures' />
          <LinkList items={book.booktags} itemLabel='booktags' />
        </SidebarSection>
        <SidebarSection title='timeline'>
          <TimelineItem title='started' date={book.startDate} />
          <TimelineItem title='finished' date={book.finishDate} />
        </SidebarSection>
      </div>
    </div>
  )
}
