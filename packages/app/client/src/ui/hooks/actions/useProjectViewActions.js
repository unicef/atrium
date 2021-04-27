import { useDispatch } from 'react-redux'
import { setProjectView, editUpdate, deleteUpdate } from '../../../reduxStructures/projects'

const useProjectsMainActions = () => {
  const dispatch = useDispatch()

  return {
    setCurrentProject: (payload) => { dispatch(setProjectView(payload)) },
    editUpdate: (payload) => { dispatch(editUpdate(payload)) },
    deleteUpdate: (payload) => { dispatch(deleteUpdate(payload)) }
  }
}

export default useProjectsMainActions