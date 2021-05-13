import useHandledRequest from './useHandledRequest'
import useIsAuthenticated from '../useIsAuthenticated'
import * as UserApi from '../../../api/users'
import { useSearchActions, useUserProjectsMainActions } from '../actions'
import { useSelector } from 'react-redux'
import { getUserId } from '../../../selectors'

const useUserProjectsAsyncActions = () => {
  const handledRequest = useHandledRequest()
  const userId = useSelector(getUserId)
  const { showLoading, dismissLoading, setNumberOfPages } = useSearchActions()
  const { saveSearchedUserProjects } = useUserProjectsMainActions()
  const isUserAuthenticated = useIsAuthenticated()

  return {
    fetchSearchedUserProjects: handledRequest({
      request: UserApi.getUserProjects,
      onSuccess: ({ projects, pageCounter }) => {
        saveSearchedUserProjects({
          projects,
          registeredUser: isUserAuthenticated,
          userId
        })
        setNumberOfPages(pageCounter)
      },
      specificLoading: {
        show: showLoading,
        dismiss: dismissLoading
      }
    })
  }
}

export default useUserProjectsAsyncActions
