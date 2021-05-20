import useHandledRequest from './useHandledRequest'
import * as UsersApi from '../../../api/users'
import { useProfileActions } from '../actions'

const useProfileAsyncActions = () => {
  const handledRequest = useHandledRequest()
  const { saveUserInformation } = useProfileActions()

  return {
    getUserInfoById: handledRequest({
      request: UsersApi.getUserInformation,
      onSuccess: (payload) => saveUserInformation(payload),
      pageLoading: false
    })
  }
}

export default useProfileAsyncActions
