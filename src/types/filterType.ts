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
  // finished: boolean
  search: string
}

export type FilterArrayType =
  | 'authors'
  | 'series'
  | 'genres'
  | 'tropes'
  | 'creatures'
  | 'booktags'

export type VisibleFilterType =
  | 'sort'
  | 'order'
  | 'authors'
  | 'series'
  | 'genres'
  | 'tropes'
  | 'creatures'
  | 'booktags'
  | 'rating'
  | 'spice'

export type FilterStateType = {
  sort: boolean
  order: boolean
  authors: boolean
  series: boolean
  genres: boolean
  tropes: boolean
  creatures: boolean
  booktags: boolean
  rating: boolean
  spice: boolean
}
