import { GET_ERRORS, SET_ERRORS, UNSET_ERRORS } from '../actions/types'
import { discussionActions } from './discussionReducer'

const initialState = { clientError: null }

/**
|--------------------------------------------------
| TODO: remove GET_ERRORS
|--------------------------------------------------
*/

export default function errorReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return { ...state }

    case SET_ERRORS:
    case discussionActions.CREATE_NEW_DISCUSSION_ERROR:
    case discussionActions.GET_ALL_DICUSSIONS_ERROR:
    case discussionActions.GET_DISCUSSION_DETAILS_ERROR:
    case discussionActions.TOGGLE_LIKE_IN_DISCUSSION_ERROR:
    case discussionActions.ADD_COMMENT_IN_DISCUSSION_ERROR:
      return { ...state, clientError: action.payload }

    case UNSET_ERRORS:
      return { ...state, clientError: null }

    default:
      return state
  }
}
