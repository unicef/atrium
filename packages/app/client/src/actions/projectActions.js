import axios from 'axios'
import get from 'lodash/get'

import { SET_ALL_PROJECTS, UPDATE_PROJECT_LIST } from './types'
import { setError } from './errorActions'
import * as ProjectApi from '../api/projects'

const GENERIC_ERROR =
  'Oops, something went wrong... Please try again and if the issue persists email blockchain@uninnovation.network'
export const createProject = (projectData, onSuccess) => async dispatch => {
  return axios
    .post('projects', projectData)
    .then(response => {
      onSuccess()
    })
    .catch(err => {
      const errorMessage = get(err, 'response.data.err', GENERIC_ERROR)
      dispatch(setError(errorMessage))
    })
}

export const editProject = (projectId, projectData, onSuccess) => dispatch => {
  return axios
    .put(`projects/${projectId}`, projectData)
    .then(response => {
      onSuccess()
    })
    .catch(err => {
      const errorMessage = get(err, 'response.data.err', GENERIC_ERROR)
      dispatch(setError(errorMessage))
    })
}

export const deleteProject = (projectId, onSuccess) => dispatch => {
  return axios
    .delete(`projects/${projectId}`)
    .then(response => {
      onSuccess()
    })
    .catch(err => {
      const errorMessage = get(err, 'response.data.err', GENERIC_ERROR)
      dispatch(setError(errorMessage))
    })
}

export const getAllProjects = () => dispatch => {
  axios
    .get('projects')
    .then(res => {
      dispatch(setAllProjects(res.data.projects))
    })
    .catch(err => {
      const errorMessage = get(err, 'response.data.err', GENERIC_ERROR)
      dispatch(setError(errorMessage))
    })
}

export const setAllProjects = payload => ({
  type: SET_ALL_PROJECTS,
  payload
})

export const updateProjectList = projectToUpdate => ({
  type: UPDATE_PROJECT_LIST,
  payload: projectToUpdate
})

export const toggleLikeProject = projectId => dispatch => {
  ProjectApi.toggleProjectLike(projectId)
    .then(res => {
      dispatch(updateProjectList(res.data.project))
    })
    .catch(err => {
      const errorMessage = get(err, 'response.data.err', GENERIC_ERROR)
      dispatch(setError(errorMessage))
    })
}

/**
 * Add comment to project
 * If successful, update the project list
 * If error, show a modal with error details
 *
 * @param {string} projectId
 * @param {string} content
 * @param {string[]} mentions
 */
export const addCommentToProject = (
  projectId,
  content,
  mentions
) => async dispatch => {
  try {
    const { data } = await ProjectApi.addComment(projectId, {
      content,
      mentions
    })
    dispatch(updateProjectList(data.project))
  } catch (err) {
    const errorMessage = get(err, 'response.data.err', GENERIC_ERROR)
    dispatch(setError(errorMessage))
  }
}

export const addUpdateToProject = (projectId, formData) => async dispatch => {
  try {
    const { data } = await ProjectApi.addUpdate(projectId, {
      text: formData.text,
      title: formData.title
    })
    dispatch(updateProjectList(data.project))
  } catch (err) {
    const errorMessage = get(err, 'response.data.err', GENERIC_ERROR)
    dispatch(setError(errorMessage))
  }
}

export const addMembersToProject = (projectId, members) => async dispatch => {
  try {
    const { data } = await ProjectApi.addMembers(projectId, members)
    dispatch(updateProjectList(data.project))
  } catch (err) {
    const errorMessage = get(err, 'response.data.err', GENERIC_ERROR)
    dispatch(setError(errorMessage))
  }
}

export const deleteMemberFromProject = (
  projectId,
  memberId
) => async dispatch => {
  try {
    const { data } = await ProjectApi.deleteMember(projectId, memberId)
    dispatch(updateProjectList(data.project))
  } catch (err) {
    const errorMessage = get(err, 'response.data.err', GENERIC_ERROR)
    dispatch(setError(errorMessage))
  }
}

export const deleteFileFromProject = (
  projectId,
  filePath,
  type
) => async dispatch => {
  try {
    const { data } = await ProjectApi.deleteFile(projectId, filePath, type)
    dispatch(updateProjectList(data.project))
  } catch (err) {
    const errorMessage = get(err, 'response.data.err', GENERIC_ERROR)
    dispatch(setError(errorMessage))
  }
}
