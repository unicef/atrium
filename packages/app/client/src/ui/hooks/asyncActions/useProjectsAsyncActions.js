import useHandledRequest from './useHandledRequest'
import useIsAuthenticated from '../useIsAuthenticated'
import * as ProjectApi from '../../../api/projects'
import { useSearchActions, useProjectsMainActions } from '../actions'
import { useSelector } from 'react-redux'
import { getUserId } from '../../../selectors'

const useProjectsAsyncActions = () => {
  const handledRequest = useHandledRequest()
  const userId = useSelector(getUserId)
  const { showLoading, dismissLoading } = useSearchActions()
  const { saveSearchedProjects } = useProjectsMainActions()
  const isUserAuthenticated = useIsAuthenticated()

  return {
    fetchSearchedProjects: handledRequest(
      { 
        request: ProjectApi.getAllProjects,
        onSuccess: ({ projects }) => saveSearchedProjects({ projects, registeredUser: isUserAuthenticated, userId }),
        specificLoading: {
          show: showLoading,
          dismiss: dismissLoading
        }
      }
    )
  }
}

export default useProjectsAsyncActions
