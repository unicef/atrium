import {
 SET_CURRENT_PROJECT
} from './types'

const initialState = {
  project: undefined,
}

export default function(state = initialState, { type, payload }) {

  switch (type) {
    case SET_CURRENT_PROJECT:
      return {
        ...state,
        project: payload[0]
      }
    default:
      return state
  }
}
