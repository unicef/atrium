import { useDispatch } from 'react-redux'
import {
  ADD_FILTER,
  REMOVE_FILTER,
  SORT_ASC,
  SORT_DESC,
  CLEAR_FILTERS,
  SHOW_FILTERS,
  HIDE_FILTERS,
  SAVE_PROJECTS
} from '../../../actions/types'

const useProjectsMainActions = () => {
  const dispatch = useDispatch()

  return {
    addFilter: (payload) => { dispatch({ payload, type: ADD_FILTER }) },
    removeFilter: (payload) => { dispatch({ payload , type: REMOVE_FILTER }) },
    showFilters: () => { dispatch({ type: SHOW_FILTERS }) },
    hideFilters: () => { dispatch({ type: HIDE_FILTERS }) },
    sortAsc: () => { dispatch({ type: SORT_ASC }) },
    sortDesc: () => { dispatch({ type: SORT_DESC }) },
    hideFilters: () => { dispatch({ type: CLEAR_FILTERS }) },
    saveProjects: (payload) => { dispatch({ type: SAVE_PROJECTS, payload }) }
  }
}

export default useProjectsMainActions
