import useHandledRequest from './useHandledRequest'
import * as CommentApi from '../../../api/comments'
import { useSearchActions } from '../actions'

const useCommentsAsyncActions = () => {
  const handledRequest = useHandledRequest()
  const { showLoading, dismissLoading } = useSearchActions()

  return {
    fetchLikeComment: handledRequest({
      request: CommentApi.likeComment,
      onSuccess: ({ comment }) => {},
      specificLoading: {
        show: showLoading,
        dismiss: dismissLoading
      },
      successMessage: 'Comment successfully liked'
    })
  }
}

export default useCommentsAsyncActions
