import * as TYPES from './types'

const initialState = {
  sort: 'ASC',
  isLoading: false,
  searchText: undefined,
  page: 1,
  context: undefined
}

const searchReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case TYPES.SORT_ASC:
      return {
        ...state,
        sort: 'ASC'
      }
    case TYPES.SORT_DESC:
      return {
        ...state,
        sort: 'DESC'
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
    default:
      return state
  }
}

export default searchReducer
