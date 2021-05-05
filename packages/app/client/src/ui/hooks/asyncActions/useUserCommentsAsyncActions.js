import useHandledRequest from './useHandledRequest'
import useIsAuthenticated from '../useIsAuthenticated'
import * as UserApi from '../../../api/users'
import { useSearchActions, useUserCommentsMainActions } from '../actions'
import { useSelector } from 'react-redux'
import { getUserId } from '../../../selectors'

const useUserCommentsAsyncActions = () => {
  const handledRequest = useHandledRequest()
  const userId = useSelector(getUserId)
  const { showLoading, dismissLoading, setNumberOfPages } = useSearchActions()
  const { saveSearchedUserComments } = useUserCommentsMainActions()
  const isUserAuthenticated = useIsAuthenticated()

  return {
    fetchSearchedUserComments: handledRequest({
      request: UserApi.getUserComments,
      onSuccess: ({ comments, pageCounter }) => {
        saveSearchedUserComments({
          comments,
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

export default useUserCommentsAsyncActions
