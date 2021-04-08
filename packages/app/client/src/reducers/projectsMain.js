import {
  ADD_FILTER,
  REMOVE_FILTER,
  CLEAR_FILTERS,
  SHOW_FILTERS,
  HIDE_FILTERS,
  SAVE_PROJECTS,
  SORT_ASC,
  SORT_DESC
} from '../actions/types'

const initialState = {
  filters: [],
  sort: 'asc',
  showFilters: false,
  projects: []
}

export default function(state = initialState, { type, payload }) {

  switch (type) {
    case ADD_FILTER:
      return {
        ...state,
        filters: payload ? [...state.filters, payload] : state.filters
      }
    case REMOVE_FILTER:
      return {
        ...state,
        filters: state.filters.filter(ft => ft !== payload)
      }
    case SORT_ASC:
      return {
        ...state,
        sort: 'ASC'
      }
    case SORT_DESC:
      return {
        ...state,
        sort: 'DESC'
      }
    case CLEAR_FILTERS:
      return {
        ...state,
        filters: []
      }
    case SHOW_FILTERS:
      return {
        ...state,
        showFilters: true
      }
    case HIDE_FILTERS:
      return {
        ...state,
        showFilters: false
      }
    case SAVE_PROJECTS:
      return {
        ...state,
        projects: Array.isArray(payload) ? payload : state.projects
      }
    default:
      return state
  }
}
