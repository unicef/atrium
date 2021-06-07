import * as TYPES from './types'
import * as dataManipulation from './dataManipulation'

const initialState = {
  searchedProjects: undefined,
  searchedComments: undefined
}

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case TYPES.SAVE_USER_PROJECTS:
      return {
        ...state,
        searchedProjects: dataManipulation.onSaveUserProjects(payload)
      }
    case TYPES.SAVE_USER_COMMENTS:
      return {
        ...state,
        searchedComments: dataManipulation.onSaveUserComments(payload)
      }
    case TYPES.SAVE_USER_LATEST_PROJECT:
      return {
        ...state,
        latestProject: payload.project
      }
    case TYPES.SAVE_USER_LIKES:
      return {
        ...state,
        likes: payload.likes
      }
    default:
      return state
  }
}
