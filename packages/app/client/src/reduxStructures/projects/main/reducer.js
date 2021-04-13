import {
  REMOVE_FILTER,
  CLEAR_FILTERS,
  ADD_FILTER,
  SAVE_PROJECTS,
} from './types'

const initialState = {
  filters: {},
  projects: undefined
}

const onAddFilter = (filters, { option, filterName }) => {
  const filterFromState = filters[filterName]
  const filterExists = filterFromState !== undefined && filterFromState !== null
  
  if (filterExists) {
    return { ...filters, [filterName]: [...filterFromState, option] }
  }

  return { ...filters, [filterName]: [option] }
}

const onRemoveFilter = (filters, { option, filterName }) => {
  const filterFromState = filters[filterName]
  const filterExists = filterFromState !== undefined && filterFromState !== null

  if (filterExists && filterFromState.length === 1) {
    return {...filters, [filterName]: undefined }
  }

  return { ...filters, [filterName]: filterFromState.filter(opt => opt !== option )}
}

const onSaveProjects = ({ registeredUser, projects }) => {

  if (!Array.isArray(projects)) {
    return []
  }

  if (!registeredUser) {
    return projects.filter(project => project.freeForAll)
  }

  return projects
}

export default function(state = initialState, { type, payload }) {

  switch (type) {
    case ADD_FILTER:
      return {
        ...state,
        filters: onAddFilter(state.filters, payload)
      }
    case REMOVE_FILTER:
      return {
        ...state,
        filters: onRemoveFilter(state.filters, payload)
      }
    case CLEAR_FILTERS:
      return {
        ...state,
        filters: []
      }
    case SAVE_PROJECTS:
      return {
        ...state,
        projects: onSaveProjects(payload)
      }
    default:
      return state
  }
}
