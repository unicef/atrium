import * as TYPES from './types'

const initialState = {
  searchedProjects: undefined,
  searchedComments: undefined,
  searchedUpdates: undefined
}

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case TYPES.SAVE_REPORTS:
      return {
        ...state,
        searchedProjects: payload.projects,
        searchedComments: payload.comments,
        searchedReports: payload.reports
      }
    default:
      return state
  }
}
