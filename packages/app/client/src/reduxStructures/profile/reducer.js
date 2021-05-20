import * as TYPES from './types'
import * as manipulation from './dataManipulation'

const initialState = {
  badges: undefined,
  activities: undefined,
  projects: undefined,
  posts: undefined,
  info: undefined
}

const searchReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case TYPES.SAVE_USER_INFO:
      return manipulation.onSaveInfos(state, payload)
    default:
      return state
  }
}

export default searchReducer
