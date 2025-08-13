import { FilterType } from '@/types/filterType'

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
  rating: [],
  spice: [],
  completed: true,
  search: '',
}

export const SORT_OPTIONS = [
  'series',
  'title',
  'published',
  'length',
  'reading order',
  'rating',
  'spice',
]

export const ORDER_OPTIONS = ['asc', 'desc']

export const VIEW_OPTIONS = ['list', 'grid']
