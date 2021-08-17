import useHandledRequest from './useHandledRequest'
import * as UsersApi from '../../../api/users'
import { useUsersActions } from '../actions'
import { useHistory } from 'react-router'

const useAuthAsyncActions = () => {
  const handledRequest = useHandledRequest()
  const { setCurrentUser } = useUsersActions()
  const history = useHistory()

  return {
    login: handledRequest({
      request: UsersApi.loginUser,
      onSuccess: ({ payload }) => {
        setCurrentUser(payload)
        history.replace('/')
      },
      pageLoading: true,
      successMessage: 'User authenticated'
    }),
    updateUser: handledRequest({
      request: UsersApi.updateUserDetails,
      onSuccess: () => {},
      pageLoading: true,
      successMessage: 'User updated'
    }),
    deleteUser: handledRequest({
      request: UsersApi.deleteUser,
      onSuccess: ({ payload }) => setCurrentUser(payload),
      pageLoading: true,
      successMessage: 'Account deleted'
    }),
    changeUserPassword: handledRequest({
      request: UsersApi.changeUserPassword,
      onSuccess: ({ payload }) => console.log(payload), //
      pageLoading: true,
      successMessage: 'User password changed'
    }),
    addBookmark: handledRequest({
      request: UsersApi.addBookmark,
      onSuccess: () => {},
      pageLoading: true,
      successMessage: 'Project added to bookmarks'
    })
  }
}

export default useAuthAsyncActions
