import { SET_ALL_PROJECTS, UPDATE_PROJECT_LIST } from '../actions/types'

const initialState = {
  allProjects: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_ALL_PROJECTS:
      return {
        ...state,
        allProjects: action.payload
      }
    case UPDATE_PROJECT_LIST:
      return {
        ...state,
        allProjects: state.allProjects.length ? state.allProjects.map(proj =>
          proj.id === action.payload.id ? action.payload : proj
        ) : [ action.payload ]
      }
    default:
      return state
  }
}
