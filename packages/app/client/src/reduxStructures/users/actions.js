import * as TYPES from './types'

export const saveUserProjects = payload => ({
  type: TYPES.SAVE_USER_PROJECTS,
  payload
})

export const saveUserComments = payload => ({
  type: TYPES.SAVE_USER_COMMENTS,
  payload
})
