import * as TYPES from './types'

const initialState = {
  filters: {},
  searchedProjects: undefined,
  selectedProject: undefined
}

const handleProjectSaving = ({ project, userId }) => {
  const likeIndex = project.likes.findIndex(like => like.id === userId)
  const userLiked = likeIndex >= 0
  return { ...project, userLiked }
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

  return projects.map(project => handleProjectSaving({ project, userId }))
}

const onToggleLike = (state, project) => {
  const prevList = state.searchedProjects
  const projectIndex = prevList.findIndex(pjt => project.id === pjt.id)
  const userLiked = prevList[projectIndex].userLiked

  const updatedProject = { ...project, userLiked: !userLiked }
  
  const newList = prevList
  newList[projectIndex] = updatedProject
  const selectedProjectId = state.selectedProject && state.selectedProject.id

  if (selectedProjectId === project.id) {
    return {
      ...state,
      searchedProjects: newList,
      selectedProject: updatedProject
    }
  }

  return {
    ...state,
    searchedProjects: newList
  }
}

export default function(state = initialState, { type, payload }) {

  switch (type) {
    case TYPES.ADD_FILTER:
      return {
        ...state,
        filters: onAddFilter(state.filters, payload)
      }
    case TYPES.REMOVE_FILTER:
      return {
        ...state,
        filters: onRemoveFilter(state.filters, payload)
      }
    case TYPES.CLEAR_FILTERS:
      return {
        ...state,
        filters: []
      }
    case TYPES.SAVE_PROJECTS:
      return {
        ...state,
        searchedProjects: onSaveProjects(payload),
        selectedProject: undefined
      }
    case TYPES.TOGGLE_LIKE:
      return onToggleLike(state, payload)

    case TYPES.SET_PROJECT_VIEW:
      return {
        ...state,
        selectedProject: handleProjectSaving(payload)
      }
    default:
      return state
  }
}
