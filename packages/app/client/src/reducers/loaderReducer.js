import {
  SHOW_LOADING,
  DISMISS_LOADING
} from '../actions/types'

const initialState = {
  showLoader: false,
}

export default function(state = initialState, { type }) {
  switch (type) {
    case SHOW_LOADING:
      return {
        showLoader: true
      }
    case DISMISS_LOADING:
      return initialState
    default:
      return state
  }
}
