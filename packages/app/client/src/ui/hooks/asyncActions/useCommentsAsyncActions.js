import useHandledRequest from './useHandledRequest'
import * as CommentApi from '../../../api/comments'
import { useSearchActions } from '../actions'
import useProfileAsyncActions from './useProfileAsyncActions'

const useCommentsAsyncActions = () => {
  const handledRequest = useHandledRequest()
  const { showLoading, dismissLoading } = useSearchActions()
  const { refreshToken } = useProfileAsyncActions()

  return {
    fetchLikeComment: handledRequest({
      request: CommentApi.likeComment,
      onSuccess: () => {
        refreshToken()
      },
      specificLoading: {
        show: showLoading,
        dismiss: dismissLoading
      },
      successMessage: 'Action successfully performed'
    })
  }
}

export default useCommentsAsyncActions
