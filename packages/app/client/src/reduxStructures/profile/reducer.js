import * as TYPES from './types'
import * as dataManipulation from './dataManipulation'

const initialState = {
  badges: undefined,
  activities: undefined,
  projects: undefined,
  posts: undefined,
  info: undefined,
  projectsPageCounter: undefined,
  loadActivitiesFlag: 'LOAD'
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
    case TYPES.SAVE_ACTIVITIES:
      return {
        ...state,
        activities: [...state.activities, ...payload]
      }
    case TYPES.SET_LOAD_MORE_FLAG:
      return {
        ...state,
        loadActivitiesFlag: payload
      }
    default:
      return state
  }
}

export default profileReducer
