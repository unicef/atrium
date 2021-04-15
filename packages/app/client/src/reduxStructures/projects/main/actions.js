import * as TYPES from './types'

export const addFilter = (payload) => ({ type: TYPES.ADD_FILTER, payload })
export const removeFilter = (payload) => ({ type: TYPES.REMOVE_FILTER, payload })
export const saveProjects = (payload) => ({ type: TYPES.SAVE_PROJECTS, payload })
export const clearFilters = () => ({ type: TYPES.CLEAR_FILTERS })
export const updateProject = (payload) => ({ type: TYPES.UPDATE_PROJECT_IN_LIST, payload })
