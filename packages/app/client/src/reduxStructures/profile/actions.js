import * as TYPES from './types'

export const saveUserInformation = (payload) => ({ type: TYPES.SAVE_USER_INFO, payload })
export const saveProfileProjects = (payload) => ({ type: TYPES.SAVE_PROJECTS, payload })
export const likeProfileProject = (payload) => ({ type: TYPES.LIKE_PROJECT, payload })
