import {
  SHOW_TOAST,
  DISMISS_TOAST
} from '../actions/types'

const initialState = {
  severity: undefined,
  message: undefined,
  open: false
}

export default function(state = initialState, { type, payload = {} }) {
  const { severity, message } = payload
  switch (type) {
    case SHOW_TOAST:
      return {
        severity,
        message,
        open: true
      }
    case DISMISS_TOAST:
      return initialState
    default:
      return state
  }
}
