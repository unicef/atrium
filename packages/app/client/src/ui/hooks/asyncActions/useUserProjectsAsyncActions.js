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
  const {
    saveSearchedUserProjects,
    saveSearchedUserLatestProject,
    saveSearchedUserLikes
  } = useUserProjectsMainActions()
  const isUserAuthenticated = useIsAuthenticated()

  return {
    fetchSearchedUserProjects: handledRequest({
      request: UserApi.getOwnProjects,
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
    }),
    fetchSearchedUserLatestProject: handledRequest({
      request: UserApi.getUserLatestProject,
      onSuccess: ({ project }) => {
        saveSearchedUserLatestProject({
          project,
          registeredUser: isUserAuthenticated,
          userId
        })
      },
      specificLoading: {
        show: showLoading,
        dismiss: dismissLoading
      }
    }),
    fetchSearchedUserLikes: handledRequest({
      request: UserApi.getUserLikes,
      onSuccess: ({ likes }) => {
        saveSearchedUserLikes({
          likes,
          registeredUser: isUserAuthenticated,
          userId
        })
      },
      specificLoading: {
        show: showLoading,
        dismiss: dismissLoading
      }
    })
  }
}

export default useUserProjectsAsyncActions
