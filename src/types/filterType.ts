export type FilterType = {
  order: 'asc' | 'desc'
  sort: 'series' | 'title' | 'rating' | 'spice' | 'length' | 'year'
  authors: string[]
  series: string[]
  genres: string[]
  tropes: string[]
  creatures: string[]
  booktags: string[]
  rating: string[]
  spice: string[]
  completed: boolean
  search: string
}
