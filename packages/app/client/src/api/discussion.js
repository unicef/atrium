import axios from 'axios'

/**
 * Call api to get discussion list
 */
export function getDiscussionList() {
  return axios.get('discussion')
}

/**
 * Create a new discussion
 *
 * @param {{title: string, content: string, type: string}} discussion
 */
export function createDiscussion(discussion) {
  return axios.post('discussion', discussion)
}
/**
 * Edit a discussion
 *
 * @param {{title: string, content: string, type: string}} discussion
 */
export function editDiscussion(discussion, discussionId) {
  return axios.put(`discussion/${discussionId}`, discussion)
}

/**
 * Delete a discussion
 *
 * @param {{title: string, content: string, type: string}} discussion
 */
export function deleteDiscussion(discussionId) {
  return axios.delete(`discussion/${discussionId}`)
}

/**
 * Get discussion details
 *
 * @param {string} discussionId
 */
export function getDiscussionDetails(discussionId) {
  return axios.get(`discussion/${discussionId}`)
}

/**
 * Add a new comment to a discussion and get the discussion details
 * @param {string} discussionId
 * @param {{content: string}} comment
 */
export function addCommentToDiscussion(discussionId, comment) {
  return axios.post(`discussion/${discussionId}/comment`, comment)
}

/**
 * Toggle like in a project
 *
 * @param {string} discussionId
 */
export function toggleLikeInDiscussion(discussionId) {
  return axios.patch(`discussion/${discussionId}/like`)
}
