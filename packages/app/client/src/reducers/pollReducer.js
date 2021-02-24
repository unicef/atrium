import {
  SET_ACTIVE_POLLS,
  SET_CLOSED_OR_VOTED_ON_POLLS
} from '../actions/types'

const initialState = {
  activePolls: [],
  closedOrVotedOnPolls: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_ACTIVE_POLLS:
      return {
        ...state,
        activePolls: action.payload
      }
    case SET_CLOSED_OR_VOTED_ON_POLLS:
      return {
        ...state,
        closedOrVotedOnPolls: action.payload
      }
    default:
      return state
  }
}
