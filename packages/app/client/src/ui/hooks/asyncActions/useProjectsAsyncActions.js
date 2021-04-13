import useHandledRequest from './useHandledRequest'
import * as ProjectApi from '../../../api/projects'
import { useSearchActions, useProjectsMainActions } from '../actions'

const useProjectsAsyncActions = () => {
  const handledRequest = useHandledRequest()
  const { showLoading, dismissLoading } = useSearchActions()
  const { saveProjects } = useProjectsMainActions()

  return {
    fetchProjects: handledRequest(
      { 
        request: ProjectApi.getAllProjects,
        onSuccess: ({ projects }) => saveProjects(projects),
        specificLoading: {
          show: showLoading,
          dismiss: dismissLoading
        }
      }
    )
  }
}

export default useProjectsAsyncActions
