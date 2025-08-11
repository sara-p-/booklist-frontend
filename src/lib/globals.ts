import { FilterType } from '@/types/filterType'

export const DEFAULT_FILTER_VALUES: FilterType = {
  sort: 'series',
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
  'completed',
]

export const ORDER_OPTIONS = ['asc', 'desc']
