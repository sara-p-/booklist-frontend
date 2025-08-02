export type BookType = {
  id: number
  title: {
    rendered: string
  }
  slug: string
  status: string
  author: number[]
  series: number[]
  genre: number[]
  trope: number[]
  creature: number[]
  booktag: number[]
}
