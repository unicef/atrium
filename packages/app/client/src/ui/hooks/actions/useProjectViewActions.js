import { useDispatch } from 'react-redux'
import { setCurrentProject } from '../../../reduxStructures/projects'

const useProjectsMainActions = () => {
  const dispatch = useDispatch()

  return {
    setCurrentProject: (payload) => { dispatch(setCurrentProject(payload)) },
  }
}

export default useProjectsMainActions