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
    })
  }
}

export default useAuthAsyncActions
