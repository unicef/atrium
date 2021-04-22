import { useDispatch } from 'react-redux'
import { setProjectView } from '../../../reduxStructures/projects'

const useProjectsMainActions = () => {
  const dispatch = useDispatch()

  return {
    setCurrentProject: (payload) => { dispatch(setProjectView(payload)) },
  }
}

export default useProjectsMainActions