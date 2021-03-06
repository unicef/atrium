import { baseRequest } from '../ui/utils'
import axios from 'axios'

const ROUTE = 'projects'

// ENDPOINTS
const getToggleLikeEndpoint = projectId => `${projectId}/like`
const getCommentEndpoint = id => `${id}/comment`
const getUpdateEndpoint = projectId => `${projectId}/update`
const getAddMemberEndpoint = projectId => `${projectId}/addMembers`
const getDeleteMemberEndpoint = projectId => `${projectId}/deleteMember`
const getDeleteUpdateEndpoint = updateId => `${updateId}/update`
const getProjectCommentsEndpoint = (projectId, query) =>
  `${projectId}/comments?${query}`
const getDeleteFileEndpoint = (projectId, type) => `${projectId}/${type}/deleteFile`

// ERRORS
export const ERRORS = {
  503: 'Unable to get user activity, refresh the page to try again',
  403: 'Session expired, login again'
}

// BASE REQUEST
const projectRequest = baseRequest({ errors: ERRORS, baseURL: ROUTE })

/**
 * Toggle a user's like in a project
 *
 * @export
 * @param {string} projectId
 * @returns
 */
export const toggleProjectLike = projectId =>
  projectRequest({
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
export const addComment = (projectId, content, mentions) =>
  projectRequest({
    method: 'post',
    endpoint: getCommentEndpoint(projectId),
    body: { content, mentions }
  })

/**
 * Edit a comment
 *
 * @export
 * @param {string} commentId
 * @param {Comment} comment
 * @returns
 */
export const editComment = ({ commentId, content }) =>
  projectRequest({
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
export const deleteComment = commentId =>
  projectRequest({
    method: 'delete',
    endpoint: getCommentEndpoint(commentId)
  })

/**
 * Get all comments from a project with pagination and sorting
 * @param {string} projectId
 * @returns
 */
export const getComments = (projectId, query) =>
  projectRequest({
    method: 'get',
    endpoint: getProjectCommentsEndpoint(projectId, query)
  })

export const getAttachment = attachment => {
  if (!attachment) throw new Error('Attachment is required')

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
export const getProject = projectId =>
  projectRequest({
    method: 'get',
    endpoint: projectId
  })

export const deleteProject = projectId =>
  projectRequest({
    method: 'delete',
    endpoint: projectId
  })

/**
 * Get all project
 */
export const getAllProjects = query =>
  projectRequest({ method: 'get', endpoint: query })

export const getAllProjectsUnreg = query =>
  projectRequest({ method: 'get', endpoint: `unreg${query}` })

export const addUpdate = (projectId, update) =>
  projectRequest({
    method: 'post',
    endpoint: getUpdateEndpoint(projectId),
    body: update
  })

export const removeUpdate = updateId =>
  projectRequest({
    method: 'delete',
    endpoint: getDeleteUpdateEndpoint(updateId)
  })

export const editUpdate = ({ id, text, title }) =>
  projectRequest({
    method: 'put',
    endpoint: getDeleteUpdateEndpoint(id),
    body: { text, title }
  })

export const reportUpdate = ({ id, reported, reportMessage }) =>
  projectRequest({
    method: 'post',
    endpoint: `${id}/update/report`,
    body: { reported, reportMessage }
  })

export const reportComment = ({ id, reported, reportMessage }) =>
  projectRequest({
    method: 'post',
    endpoint: `${id}/comment/report`,
    body: { reported, reportMessage }
  })

export const reportProject = ({ id, reported, reportMessage }) =>
  projectRequest({
    method: 'post',
    endpoint: `${id}/report`,
    body: { reported, reportMessage }
  })

export const addMembers = (projectId, members) =>
  projectRequest({
    method: 'post',
    endpoint: getAddMemberEndpoint(projectId),
    body: { members }
  })

export const deleteMember = (projectId, memberId) =>
  projectRequest({
    method: 'post',
    endpoint: getDeleteMemberEndpoint(projectId),
    body: { memberId }
  })

export const deleteFile = (projectId, filePath, type) =>
  projectRequest({
    method: 'post',
    endpoint: getDeleteFileEndpoint(projectId, type),
    body: { filePath }
  })

export const transferOwnership = (projectId, userToTransfer) =>
  projectRequest({
    method: 'post',
    endpoint: `${projectId}/transferOwnership`,
    body: { userToTransfer }
  })

export const createProject = (projectData) =>
  projectRequest({
    method: 'post',
    body: projectData
  })

export const updateProject = (projectData, projectId) =>
  projectRequest({
    method: 'put',
    endpoint: projectId,
    body: projectData
  })
