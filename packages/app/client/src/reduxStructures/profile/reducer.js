import * as TYPES from './types'
import * as dataManipulation from './dataManipulation'

const initialState = {
  badges: undefined,
  activities: undefined,
  projects: undefined,
  posts: undefined,
  info: undefined,
  projectsPageCounter: undefined
}

const profileReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case TYPES.SAVE_USER_INFO:
      return dataManipulation.onSaveInfos(state, payload)
    case TYPES.SAVE_PROJECTS:
      return {
        ...state,
        projects: dataManipulation.onSaveProjects(payload),
        projectsPageCounter: payload.pageCounter
      }
    case TYPES.LIKE_PROJECT:
      return dataManipulation.onToggleLike(state, payload)
    default:
      return state
  }
}

export default profileReducer
