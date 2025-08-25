import styles from './page.module.css'
import parse from 'html-react-parser'
import LinkList from '@/components/features/SingleBook/LinkList/LinkList'
import SidebarSection from '@/components/features/SingleBook/SidebarSection/SidebarSection'
import TimelineItem from '@/components/features/SingleBook/TimelineItem/Timeline'
import BookText from '@/components/features/SingleBook/BookText/BookText'
import ExternalLink from '@/components/features/SingleBook/ExternalLink/ExternalLink'
import BookInfo from '@/components/features/SingleBook/BookInfo/BookInfo'
import { fetchData } from '@/lib/fetch'
import { BookType, BookItem } from '@/types/bookType'
import Pagination from '@/components/features/SingleBook/Pagination/Pagination'
import RelatedBooks from '@/components/features/SingleBook/RelatedBooks/RelatedBooks'

export default async function BookPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const book = await fetchData(
    `https://readthatbooklist.com/wp-json/booklist/v1/book?slug=${slug}`
  )

  const parsedBook: BookType = {
    ...book,
    title: parse(book.title) as string,
    series: book.series.map((series: BookItem) => ({
      name: parse(series.name) as string,
      id: series.id,
      slug: series.slug,
    })),
    description: parse(book.description) as string,
    notes: parse(book.notes) as string,
    smell: parse(book.smell) as string,
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.mainContainer}>
          <BookInfo book={parsedBook} />
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
    </>
  )
}
