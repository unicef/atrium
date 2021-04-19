import {
  REMOVE_FILTER,
  CLEAR_FILTERS,
  ADD_FILTER,
  SAVE_PROJECTS,
  TOGGLE_LIKE
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
    const likeIndex = project.likes.findIndex(id => id === userId)
    const userLiked = likeIndex >= 0
    return { ...project, userLiked }
  })
}

const onToggleLike = (projectsList, { project, userId }) => {
  const projectIndex = projectsList.findIndex(pjt => project.id === pjt.id)
  const isLikedProject = projectsList[projectIndex].userLiked

  const newProject = { ...projectsList[projectIndex], userLiked: !projectsList[projectIndex].userLiked }
  
  const likes = isLikedProject ? newProject.likes.filter(id => id !== userId) : [...newProject.likes, userId]
  newProject.likes = likes
  const newList = projectsList
  newList[projectIndex] = newProject

  return newList
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
    case TOGGLE_LIKE:
      return {
        ...state,
        projects: onToggleLike(state.projects, payload)
      }
    default:
      return state
  }
}
