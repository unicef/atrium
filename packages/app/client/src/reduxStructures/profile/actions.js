import * as TYPES from './types'

export const saveUserInformation = (payload) => ({ type: TYPES.SAVE_USER_INFO, payload })
export const saveProfileProjects = (payload) => ({ type: TYPES.SAVE_PROJECTS, payload })
export const likeProfileProject = (payload) => ({ type: TYPES.LIKE_PROJECT, payload })
export const saveProfileActivities = (payload) => ({ type: TYPES.SAVE_ACTIVITIES, payload })
export const setLoadMoreActivitiesFlag = (payload) => ({ type: TYPES.SET_LOAD_MORE_FLAG, payload })
