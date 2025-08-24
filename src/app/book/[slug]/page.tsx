import styles from './page.module.css'
import Image from 'next/image'
import { convertStringToDate } from '@/lib/utils'
import parse from 'html-react-parser'
import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
            <h4 className={styles.bookTextTitle}>Description</h4>
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
        <div className={styles.sidebarSection}>
          <p className={`${styles.sidebarTitle} h3`}>Stats</p>
          <ul className={styles.bookStatsList}>
            <li className={styles.bookStatsItem}>
              <span className={`${styles.bookStatsLabel} h4`}>Genres:</span>
              <ul className={styles.bookIndividualStatsList}>
                {book.genres.map(
                  (genre: { id: number; name: string }, index: number) => (
                    <li
                      className={styles.bookIndividualStatsItem}
                      key={genre.id}
                    >
                      {genre.name}
                      {book.genres.length > 1 &&
                        index < book.genres.length - 1 &&
                        ','}
                    </li>
                  )
                )}
              </ul>
            </li>
            <li className={styles.bookStatsItem}>
              <span className={`${styles.bookStatsLabel} h4`}>Tropes:</span>
              <ul className={styles.bookIndividualStatsList}>
                {book.tropes.map(
                  (trope: { id: number; name: string }, index: number) => (
                    <li
                      className={styles.bookIndividualStatsItem}
                      key={trope.id}
                    >
                      {trope.name}
                      {book.tropes.length > 1 &&
                        index < book.tropes.length - 1 &&
                        ','}
                    </li>
                  )
                )}
              </ul>
            </li>
            <li className={styles.bookStatsItem}>
              <span className={`${styles.bookStatsLabel} h4`}>Creatures:</span>
              <ul className={styles.bookIndividualStatsList}>
                {book.creatures.map(
                  (creature: { id: number; name: string }, index: number) => (
                    <li
                      className={styles.bookIndividualStatsItem}
                      key={creature.id}
                    >
                      {creature.name}
                      {book.creatures.length > 1 &&
                        index < book.creatures.length - 1 &&
                        ','}
                    </li>
                  )
                )}
              </ul>
            </li>
            <li className={styles.bookStatsItem}>
              <span className={`${styles.bookStatsLabel} h4`}>Booktags:</span>
              <ul className={styles.bookIndividualStatsList}>
                {book.booktags.map(
                  (booktag: { id: number; name: string }, index: number) => (
                    <li
                      className={styles.bookIndividualStatsItem}
                      key={booktag.id}
                    >
                      {booktag.name}
                      {book.booktags.length > 1 &&
                        index < book.booktags.length - 1 &&
                        ','}
                    </li>
                  )
                )}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
