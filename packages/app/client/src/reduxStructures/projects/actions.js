import * as TYPES from './types'

export const saveComments = (payload) => ({ type: TYPES.SAVE_COMMENTS, payload })
export const addFilter = (payload) => ({ type: TYPES.ADD_FILTER, payload })
export const removeFilter = (payload) => ({ type: TYPES.REMOVE_FILTER, payload })
export const saveProjects = (payload) => ({ type: TYPES.SAVE_PROJECTS, payload })
export const clearFilters = () => ({ type: TYPES.CLEAR_FILTERS })
export const toggleLike = (payload) => ({ type: TYPES.TOGGLE_LIKE, payload })
export const setProjectView = (payload) => ({ type: TYPES.SET_PROJECT_VIEW, payload })
export const editUpdate = (payload) => ({ type: TYPES.EDIT_UPDATE, payload })
