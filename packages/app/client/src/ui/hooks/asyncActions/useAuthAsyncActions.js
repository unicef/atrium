import useHandledRequest from './useHandledRequest'
import * as UsersApi from '../../../api/users'
import { useUsersActions } from '../actions'

const useAuthAsyncActions = () => {
  const handledRequest = useHandledRequest()
  const { setCurrentUser } = useUsersActions()

  return {
    login: handledRequest({
      request: UsersApi.loginUser,
      onSuccess: ({ payload }) => setCurrentUser(payload),
      pageLoading: true,
      successMessage: 'User authenticated'
    }),
    updateUser: handledRequest({
      request: UsersApi.updateUserDetails,
      onSuccess: ({ payload }) => setCurrentUser(payload),
      pageLoading: true,
      successMessage: 'User updated'
    }),
    deleteUser: handledRequest({
      request: UsersApi.deleteUser,
      onSuccess: ({ payload }) => setCurrentUser(payload),
      pageLoading: true,
      successMessage: 'Account deleted'
    }),
    checkUserPassword: handledRequest({
      request: UsersApi.checkUserPassword,
      onSuccess: ({ payload }) => console.log(payload), //
      pageLoading: true,
      successMessage: 'User entered correct password'
    })
  }
}

export default useAuthAsyncActions
