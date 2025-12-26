import {
  ExcludeValuesType,
  FilterType,
  MobileFilterStateType,
  VisibleFilterType,
} from '@/types/filterType'

export const DEFAULT_FILTER_VALUES: FilterType = {
  view: 'grid',
  sort: 'reading order',
  order: 'desc',
  authors: [],
  series: [],
  genres: [],
  tropes: [],
  creatures: [],
  booktags: [],
  rating: ['0', '5'],
  spice: ['0', '5'],
  // finished: true,
  search: '',
}

export const MOBILE_FILTERS: VisibleFilterType[] = [
  'sort',
  'order',
  'authors',
  'series',
  'genres',
  'tropes',
  'creatures',
  'booktags',
  'rating',
  'spice',
]

export const SORT_OPTIONS = [
  'series',
  'title',
  'published',
  'length',
  'reading order',
  'rating',
  'spice',
]

export const ORDER_OPTIONS = ['desc', 'asc']

export const VIEW_OPTIONS = ['list', 'grid']

export const DEFAULT_EXCLUDE_VALUES: ExcludeValuesType = {
  authors: [],
  series: [],
  genres: [],
  tropes: [],
  creatures: [],
  booktags: [],
}

export const DEFAULT_MOBILE_FILTER_STATE_VALUES: MobileFilterStateType = {
  filters: false,
  sort: false,
  order: false,
  authors: false,
  series: false,
  genres: false,
  tropes: false,
  creatures: false,
  booktags: false,
  rating: false,
  spice: false,
}

export const POSSIBLE_ACTIVE_MOBILE_FILTERS: VisibleFilterType[] = [
  'authors',
  'series',
  'genres',
  'tropes',
  'creatures',
  'booktags',
  'rating',
  'spice',
]

export const API_URL: string =
  'https://readthatbooklist.com/wp-json/booklist/v1'
