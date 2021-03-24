import {
  SHOW_ALERT,
  CLEAR_ALERT
} from '../actions/types'

const initialState = {
  severity: undefined,
  message: undefined
}

export default function(state = initialState, { message, severity}  = {}) {
  switch (action.type) {
    case SHOW_ALERT:
      return {
        severity,
        message
      }
    case CLEAR_ALERT:
      return initialState
    default:
      return state
  }
}
