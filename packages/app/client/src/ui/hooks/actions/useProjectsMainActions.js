import { useDispatch } from 'react-redux'
import { addFilter, removeFilter, clearFilters, saveProjects } from '../../../reduxStructures/projects'

const useProjectsMainActions = () => {
  const dispatch = useDispatch()

  return {
    addFilter: (payload) => { dispatch(addFilter(payload)) },
    removeFilter: (payload) => { dispatch(removeFilter(payload)) },
    saveProjects: (payload) => { dispatch(saveProjects(payload)) },
    clearFilters: () => { dispatch(clearFilters()) },
  }
}

export default useProjectsMainActions