import * as TYPES from './types'

export const saveUserProjects = payload => ({
  type: TYPES.SAVE_USER_PROJECTS,
  payload
})

export const saveUserComments = payload => ({
  type: TYPES.SAVE_USER_COMMENTS,
  payload
})

export const saveUserLatestProject = payload => ({
  type: TYPES.SAVE_USER_LATEST_PROJECT,
  payload
})

export const saveUserLikes = payload => ({
  type: TYPES.SAVE_USER_LIKES,
  payload
})
