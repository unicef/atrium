import axios from 'axios'

import {
  GET_ERRORS,
  SET_CURRENT_GITHUB_USERS,
  SET_GITHUB_HANDLE_FOR_USER
} from './types'
require('dotenv').config()
// Add user to UNIN GitHub
export const addUserToGitHubOrg = (githubData, history) => dispatch => {
  axios
    .post('github/add', githubData)
    .then(res => {
      // Need to dispatch an action here to display properly
      dispatch(setGitHubHandle(res.data.githubUsername))
      return history.push('/github')
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      })
    })
}

// List pending and active users from UNIN GitHub (might need a reducer / type thing here)
export const listUsersFromGithubOrg = githubData => dispatch => {
  axios
    .get('github/users', githubData)
    .then(res => {
      // Figure out what res will be
      // Try storing all info in res.data
      dispatch(setCurrentGitHubUserList(res.data.members))
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      })
    )
}

export const setCurrentGitHubUserList = list => {
  return {
    type: SET_CURRENT_GITHUB_USERS,
    payload: list
  }
}

export const setGitHubHandle = githubHandle => {
  return {
    type: SET_GITHUB_HANDLE_FOR_USER,
    payload: githubHandle
  }
}
