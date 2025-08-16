export type FilterType = {
  order: 'asc' | 'desc'
  view: 'list' | 'grid'
  sort:
    | 'series'
    | 'title'
    | 'rating'
    | 'spice'
    | 'length'
    | 'year'
    | 'reading order'
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

export type FilterArrayType =
  | 'authors'
  | 'series'
  | 'genres'
  | 'tropes'
  | 'creatures'
  | 'booktags'
