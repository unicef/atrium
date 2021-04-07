import useHandledRequest from './useHandledRequest'
import { SET_ALL_PROJECTS } from '../../../actions/types'
import * as ProjectApi from '../../../api/projects'
import { useDispatch } from 'react-redux'

const useProjectsAsyncActions = () => {
  const handledRequest = useHandledRequest()
  const dispatch = useDispatch()

  return {
    fetchAllProjects: handledRequest(
      { 
        request: ProjectApi.getAllProjects,
        onSuccess: (projects) => dispatch({ type: SET_ALL_PROJECTS, payload: projects }),
        pageLoading: true
      }
    )
  }
}

export default useProjectsAsyncActions
