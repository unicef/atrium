import { useDispatch } from 'react-redux'
import { setProjectView, editUpdate } from '../../../reduxStructures/projects'

const useProjectsMainActions = () => {
  const dispatch = useDispatch()

  return {
    setCurrentProject: (payload) => { dispatch(setProjectView(payload)) },
    editUpdate: (payload) => { dispatch(editUpdate(payload)) }
  }
}

export default useProjectsMainActions
