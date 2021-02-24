import axios from 'axios'

/**
 * Toggle a user's like in a project
 *
 * @export
 * @param {string} projectId
 * @returns
 */
export function toggleProjectLike(projectId) {
  return axios.patch(`projects/${projectId}/like`)
}

/**
 * Add new comment to project
 *
 * @export
 * @param {string} projectId
 * @param {Comment} comment
 * @returns
 */
export function addComment(projectId, comment) {
  return axios.post(`projects/${projectId}/comment`, comment)
}
/**
 * Edit a comment
 *
 * @export
 * @param {string} commentId
 * @param {Comment} comment
 * @returns
 */
export function editComment(commentId, content) {
  return axios.put(`projects/${commentId}/comment`, { content })
}
/**
 * Remove a comment
 *
 * @export
 * @param {string} projectId
 * @param {Comment} comment
 * @returns
 */
export function deleteComment(commentId) {
  return axios.delete(`projects/${commentId}/comment/`)
}

export function getAttachment(attachment) {
  if(!attachment)
    return
  return axios.get(attachment, {
    responseType: 'arraybuffer'
  })
}
/**
 * Get project
 *
 * @export
 * @param {string} projectId
 * @returns
 */
export function getProject(projectId) {
  return axios.get(`projects/${projectId}`)
}
