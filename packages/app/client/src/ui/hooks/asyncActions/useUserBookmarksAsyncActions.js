import useHandledRequest from './useHandledRequest'
import useIsAuthenticated from '../useIsAuthenticated'
import * as UserApi from '../../../api/users'
import { useSearchActions, useUserBookmarksMainActions } from '../actions'
import { useSelector } from 'react-redux'
import { getUserId } from '../../../selectors'

const useUserBookmarksAsyncActions = () => {
  const handledRequest = useHandledRequest()
  const userId = useSelector(getUserId)
  const { showLoading, dismissLoading, setNumberOfPages } = useSearchActions()
  const { saveSearchedUserBookmarks } = useUserBookmarksMainActions()
  const isUserAuthenticated = useIsAuthenticated()

  return {
    fetchSearchedUserBookmarks: handledRequest({
      request: UserApi.getUserBookmarks,
      onSuccess: ({ bookmarks, pageCounter }) => {
        saveSearchedUserBookmarks({
          bookmarks,
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

export default useUserBookmarksAsyncActions
