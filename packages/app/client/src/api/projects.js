import { baseRequest } from '../ui/utils'

const ROUTE = 'projects'

// ENDPOINTS
const getToggleLikeEndpoint = (projectId) => `${projectId}/like`
const getCommentEndpoint = (id) => `${id}/comment`

// ERRORS
export const ERRORS = {
  503: 'Unable to get user activity, refresh the page to try again',
  403: 'Session expired, login again'
}

//BASE REQUEST
const projectRequest = baseRequest({ errors: ERRORS, baseURL: ROUTE })

/**
 * Toggle a user's like in a project
 *
 * @export
 * @param {string} projectId
 * @returns
 */
export const toggleProjectLike = (projectId) => projectRequest({
  method: 'patch',
  endpoint: getToggleLikeEndpoint(projectId)
})

/**
 * Add new comment to project
 *
 * @export
 * @param {string} projectId
 * @param {Comment} comment
 * @returns
 */
export const addComment = (projectId, comment) => projectRequest({
  method: 'post',
  endpoint: getCommentEndpoint(projectId),
  body: comment
})

/**
 * Edit a comment
 *
 * @export
 * @param {string} commentId
 * @param {Comment} comment
 * @returns
 */
export const  editComment = (commentId, content) => projectRequest({
  method: 'put',
  endpoint: getCommentEndpoint(commentId),
  body: { content }
})

/**
 * Remove a comment
 *
 * @export
 * @param {string} commentId
 * @returns
 */
export const deleteComment = (commentId) => projectRequest({
  method: 'delete',
  endpoint: getCommentEndpoint(commentId)
})

export const getAttachment = (attachment) => {
  if(!attachment) throw new Error('Attachment is required')

  return projectRequest({
    method: 'get',
    endpoint: attachment,
    config: {
      responseType: 'arraybuffer'
    }
  })
}

/**
 * Get project
 *
 * @export
 * @param {string} projectId
 * @returns
 */
export const getProject = (projectId) =>  projectRequest({
  method: 'get',
  endpoint: projectId
})

/**
 * Get all project
 */
 export const getAllProjects = () => projectRequest({ method: 'get' })
