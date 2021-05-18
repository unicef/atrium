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
    })
  }
}

export default useAuthAsyncActions
