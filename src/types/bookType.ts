export interface BookType {
  bookId: number
  title: string
  slug: string
  author: BookItem[]
  series: BookItem[]
  image: string
  genres: BookItem[]
  tropes: BookItem[]
  creatures: BookItem[]
  booktags: BookItem[]
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

export type BookItem = {
  id: number
  name: string
  slug: string
  disabled?: boolean
  amount?: number
}
