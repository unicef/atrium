import { baseRequest } from '../ui/utils'

const ROUTE = 'comments'

// ENDPOINTS

// ERRORS
export const ERRORS = {
  503: 'Unable to get user activity, refresh the page to try again',
  403: 'Session expired, login again'
}

// BASE REQUEST
const commentsRequest = baseRequest({ errors: ERRORS, baseURL: ROUTE })

/**
 * Toggle a user's like in a comment
 *
 * @export
 * @param {string} projectId
 * @returns
 */
// export const toggleCommentLike = (commentId) => commentsRequest({
//   method: 'patch',
//   endpoint: ''
// })

/**
 * Get comment by id
 *
 * @export
 * @param {string} commentId
 * @returns
 */
export const getCommentReplies = commentId =>
  commentsRequest({
    method: 'get',
    endpoint: commentId
  })

/**
 * Create comment reply
 *
 * @export
 * @param {string} commentId
 * @returns
 */
export const replyComment = ({ content, mentions, commentId }) =>
  commentsRequest({
    method: 'post',
    endpoint: commentId,
    body: { content, mentions }
  })

export const likeComment = ({ id }) =>
  commentsRequest({
    method: 'get',
    endpoint: `${id}/like`
  })
