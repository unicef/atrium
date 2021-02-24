import {
  SET_CURRENT_GITHUB_USERS,
  SET_GITHUB_HANDLE_FOR_USER
} from '../actions/types'

const initialState = {
  list: [],
  githubHandle: ''
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_GITHUB_USERS:
      return {
        ...state,
        list: action.payload
      }
    case SET_GITHUB_HANDLE_FOR_USER:
      return {
        ...state,
        githubHandle: action.payload
      }

    default:
      return state
  }
}
