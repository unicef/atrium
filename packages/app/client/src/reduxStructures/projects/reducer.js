import * as TYPES from './types'
import * as dataManipulation from './dataManipulation'

const initialState = {
  filters: {},
  searchedProjects: undefined,
  selectedProject: undefined,
  handledUpdates: undefined
}

export default function(state = initialState, { type, payload }) {

  switch (type) {
    case TYPES.ADD_FILTER:
      return {
        ...state,
        filters: dataManipulation.onAddFilter(state.filters, payload)
      }
    case TYPES.REMOVE_FILTER:
      return {
        ...state,
        filters: dataManipulation.onRemoveFilter(state.filters, payload)
      }
    case TYPES.CLEAR_FILTERS:
      return {
        ...state,
        filters: []
      }
    case TYPES.SAVE_PROJECTS:
      return {
        ...state,
        searchedProjects: dataManipulation.onSaveProjects(payload),
        selectedProject: undefined
      }
    case TYPES.TOGGLE_LIKE:
      return dataManipulation.onToggleLike(state, payload)

    case TYPES.SET_PROJECT_VIEW:
      return {
        ...state,
        selectedProject: dataManipulation.handleProjectSaving(payload),
        handledUpdates: dataManipulation.handleUpdates(payload.project.updates)
      }
    case TYPES.EDIT_UPDATE:
      return {
        ...state,
        handledUpdates: dataManipulation.onEditUpdate({ updates: state.handledUpdates, ...payload })
      }
    default:
      return state
  }
}
