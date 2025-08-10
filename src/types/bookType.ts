export interface BookType {
  bookId: number
  title: string
  slug: string
  author: BookAuthor[]
  series: BookSeries[]
  image: string
  genres: BookGenre[]
  tropes: BookTrope[]
  creatures: BookCreature[]
  booktags: BookTag[]
  bookNumber: string
  publishDate: string
  length: string
  rating: string
  spice: string
  finished: boolean
  amountCompleted: string
  display: boolean
  description: string
  notes: string
  smell: string
  startDate: string
  finishDate: string
  goodreadsLink: string
  amazonLink: string
}

export type BookAuthor = {
  authorId: number
  name: string
  slug: string
}

export type BookSeries = {
  seriesId: number
  name: string
  slug: string
}

export type BookGenre = {
  genreId: number
  name: string
  slug: string
}

export type BookTrope = {
  tropeId: number
  name: string
  slug: string
}

export type BookCreature = {
  creatureId: number
  name: string
  slug: string
}

export type BookTag = {
  tagId: number
  name: string
  slug: string
}
