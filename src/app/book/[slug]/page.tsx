import styles from './page.module.css'
import parse from 'html-react-parser'
import LinkList from '@/components/features/SingleBook/LinkList/LinkList'
import SidebarSection from '@/components/features/SingleBook/SidebarSection/SidebarSection'
import TimelineItem from '@/components/features/SingleBook/TimelineItem/Timeline'
import BookText from '@/components/features/SingleBook/BookText/BookText'
import ExternalLink from '@/components/features/SingleBook/ExternalLink/ExternalLink'
import BookInfo from '@/components/features/SingleBook/BookInfo/BookInfo'

// TODO: work on the fetch function. Might be able to forego it completely if I can pull the book through the bookContext
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
        <BookInfo book={book} />
        <div className={styles.bookSection}>
          <BookText title='description'>{parse(book.description)}</BookText>
          <BookText title='notes'>{parse(book.notes)}</BookText>
          <BookText title='smell'>{book.smell}</BookText>
          <BookText title='links' cname='linksContainer'>
            <ExternalLink href={book.goodreadsLink} title='Goodreads' />
            <ExternalLink href={book.amazonLink} title='Amazon' />
          </BookText>
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
