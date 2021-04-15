import * as TYPES from './types'

export const sortAsc =  () => ({ type: TYPES.SORT_ASC })
export const sortDesc =  () => ({ type: TYPES.SORT_DESC })
export const showLoading =  () => ({ type: TYPES.SHOW_LOADING })
export const dismissLoading =  () => ({ type: TYPES.DISMISS_LOADING })
export const addSearchText =  (payload) => ({ type: TYPES.ADD_SEARCH_TEXT, payload })
export const changePage =  (payload) => ({ type: TYPES.CHANGE_PAGE, payload })
export const resetSearch =  () => ({ type: TYPES.RESET_SEARCH })
export const setCurrentPageContext = (payload) => ({ type: TYPES.UPDATE_CONTEXT, payload })