import { SET_ERRORS, UNSET_ERRORS } from './types'

// Set error
export const setError = payload => ({
  type: SET_ERRORS,
  payload
})

// clear error
export const unsetError = () => ({
  type: UNSET_ERRORS
})
