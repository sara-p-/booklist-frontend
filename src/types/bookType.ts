export interface BookType {
  bookId: number
  title: string
  slug: string
  author: bookAuthor[]
  series: bookSeries[]
  image: string
  genres: bookGenre[]
  tropes: bookTrope[]
  creatures: bookCreature[]
  booktags: bookTag[]
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

type bookAuthor = {
  authorId: number
  authorName: string
  authorSlug: string
}

type bookSeries = {
  seriesId: number
  seriesName: string
  seriesSlug: string
}

type bookGenre = {
  genreId: number
  genreName: string
  genreSlug: string
}

type bookTrope = {
  tropeId: number
  tropeName: string
  tropeSlug: string
}

type bookCreature = {
  creatureId: number
  creatureName: string
  creatureSlug: string
}

type bookTag = {
  tagId: number
  tagName: string
  tagSlug: string
}
