import useHandledRequest from './useHandledRequest'
import * as ProjectApi from '../../../api/projects'
import { useProjectsMainActions } from '../actions'

const useProjectsAsyncActions = () => {
  const handledRequest = useHandledRequest()
  const { saveProjects } = useProjectsMainActions()

  return {
    fetchAllProjects: handledRequest(
      { 
        request: ProjectApi.getAllProjects,
        onSuccess: ({ projects }) => saveProjects(projects),
        pageLoading: true
      }
    )
  }
}

export default useProjectsAsyncActions
