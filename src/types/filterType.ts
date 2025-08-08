export type FilterType = {
  order: 'asc' | 'desc'
  sort: 'series' | 'title' | 'rating' | 'spice' | 'length' | 'year'
  authors: string[]
  series: string[]
  genres: string[]
  tropes: string[]
  creatures: string[]
  booktags: string[]
  rating: number[]
  spice: number[]
  completed: boolean
  search: string
}
