import {
  REMOVE_FILTER,
  CLEAR_FILTERS,
  ADD_FILTER,
  SAVE_PROJECTS,
  UPDATE_PROJECT_IN_LIST
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

const onSaveProjects = ({ userId, registeredUser, projects }) => {

  if (!Array.isArray(projects)) {
    return []
  }

  if (!registeredUser) {
    return projects.filter(project => project.freeForAll)
  }

  return projects.map(project => {
    const likeIndex = project.likes.findIndex(like => like.id === userId)
    const userLiked = likeIndex >= 0
    return { ...project, userLiked }
  })
}

const onProjectUpdate = (projectsList, project) => {
  const updatedList = projectsList.reduce((newList, pjt) => {
    if (project._id === pjt._id) {
      return [...newList, {...project, userLiked: !pjt.userLiked }]
    }

    return [...newList, pjt]
  }, [])

  return updatedList
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
    case UPDATE_PROJECT_IN_LIST:
      return {
        ...state,
        projects: onProjectUpdate(state.projects, payload)
      }
    default:
      return state
  }
}
