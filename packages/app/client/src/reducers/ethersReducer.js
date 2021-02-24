import { SET_BLOCKCHAIN_BLOCK_NUMBER } from '../actions/types'

const initialState = {
  blockNumber: ''
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_BLOCKCHAIN_BLOCK_NUMBER:
      return {
        ...state,
        blockNumber: action.payload
      }

    default:
      return state
  }
}
