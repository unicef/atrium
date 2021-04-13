import useHandledRequest from './useHandledRequest'
import * as ProjectApi from '../../../api/projects'
import { useSearchActions, useProjectsMainActions } from '../actions'
import useIsAuthenticated from '../useIsAuthenticated'

const useProjectsAsyncActions = () => {
  const handledRequest = useHandledRequest()
  const { showLoading, dismissLoading } = useSearchActions()
  const { saveProjects } = useProjectsMainActions()
  const isUserAuthenticated = useIsAuthenticated()

  return {
    fetchProjects: handledRequest(
      { 
        request: ProjectApi.getAllProjects,
        onSuccess: ({ projects }) => saveProjects({ projects, registeredUser: isUserAuthenticated }),
        specificLoading: {
          show: showLoading,
          dismiss: dismissLoading
        }
      }
    )
  }
}

export default useProjectsAsyncActions
