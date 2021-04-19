import { useDispatch } from 'react-redux'
import { addFilter, removeFilter, clearFilters, saveProjects, toggleLike } from '../../../reduxStructures/projects'

const useProjectsMainActions = () => {
  const dispatch = useDispatch()

  return {
    addFilter: (payload) => { dispatch(addFilter(payload)) },
    removeFilter: (payload) => { dispatch(removeFilter(payload)) },
    saveSearchedProjects: (payload) => { dispatch(saveProjects(payload)) },
    clearFilters: () => { dispatch(clearFilters()) },
    toggleProjectLike: (payload) => { dispatch(toggleLike(payload)) }
  }
}

export default useProjectsMainActions