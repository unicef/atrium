import * as TYPES from './types'

const initialState = {
  sort: 'asc',
  isLoading: false,
  searchText: undefined,
  page: 1,
  context: undefined,
  numberOfPages: undefined
}

const searchReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case TYPES.SORT_ASC:
      return {
        ...state,
        sort: 'asc'
      }
    case TYPES.SORT_DESC:
      return {
        ...state,
        sort: 'desc'
      }
    case TYPES.SHOW_LOADING:
      return {
        ...state,
        isLoading: true
      }
    case TYPES.DISMISS_LOADING:
      return {
        ...state,
        isLoading: false
      }
    case TYPES.ADD_SEARCH_TEXT:
      return {
        ...state,
        searchText: payload
      }
    case TYPES.CHANGE_PAGE:
      return {
        ...state,
        page: payload
      }
    case TYPES.RESET_SEARCH:
      return initialState

    case TYPES.UPDATE_CONTEXT:
        return {
          ...state,
          context: payload
        }
    case TYPES.SET_NUMBER_OF_PAGES:
      return {
        ...state,
        numberOfPages: payload
      }
    default:
      return state
  }
}

export default searchReducer
