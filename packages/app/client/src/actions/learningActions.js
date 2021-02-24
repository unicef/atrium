import { SET_LEARNING_RESOURCES } from './types'
import * as LearningApi from '../api/learning'
import { setError } from './errorActions'

/**
 * Retrieve learning resources and dispatch action to store
 */
export const getLearningResources = () => async dispatch => {
  try {
    const { data } = await LearningApi.getLearningResources()
    dispatch(setLearningResources(data))
  } catch (e) {
    dispatch(setError('Unable to get learning resources'))
  }
}

export const setLearningResources = resources => {
  return {
    type: SET_LEARNING_RESOURCES,
    payload: resources
  }
}
