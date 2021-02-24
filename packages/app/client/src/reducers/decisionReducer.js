import { SET_BLOCKCHAIN_DECISIONS } from '../actions/types'

const initialState = {
  decisions: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_BLOCKCHAIN_DECISIONS:
      return {
        ...state,
        decisions: action.payload
      }

    default:
      return state
  }
}
