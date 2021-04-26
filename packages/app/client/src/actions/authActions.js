import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'

import { SET_CURRENT_USER, USER_LOADING, SET_USER_ACTIVITY } from './types'
import { setError } from './errorActions'
import get from 'lodash/get'
import store from '../store'
import { setAllProjects } from './projectActions'

require('dotenv').config()

export const ERRORS = {
  USER_ACTIVITY: 'Unable to get user activity, refresh the page to try again',
  LOGIN_EXPIRED: 'Session expired, login again',
  GENERIC:
    'Oops, something went wrong... Please try again and if the issue persists email blockchain@uninnovation.network',
  AWAITING_VERIFICATION:
    'Your account is waiting verification. Please check your email',
  INVALID_CREDENTIALS: 'Your email or password are incorrect',
  EMAIL_NOT_FOUND: `Your email wasn't found in our system. Please make sure you've entered it correctly, or, if you haven't signed up, please click the Register button`
}
/**
 * Retrieve current logged in user activity
 */
export const getUserActivity = () => dispatch => {
  axios
    .get('users/activity')
    .then(response => {
      dispatch(setUserActivity(response.data))
    })
    .catch(err => {
      dispatch(setError(ERRORS.USER_ACTIVITY))
    })
}

/**
 * Refresh the token of the current logged in user
 */
export const refreshToken = () => dispatch => {
  return axios
    .get('users/refresh-token')
    .catch(err => dispatch(setError(ERRORS.LOGIN_EXPIRED)))
}

/**
 *
 * @param {string} { emailHash }
 */
export const verifyEmail = ({ emailHash }) => dispatch => {
  return axios
    .get(`users/email-verify/${emailHash}`)
    .then(res => res)
    .catch(err => {
      throw err
    })
}

// Register User
export const registerUser = (userData, submitStage) => dispatch => {
  return axios
    .put('users/register', userData)
    .then(res => {
      submitStage()
    })
    .catch(err => {
      let errorMessage = ERRORS.GENERIC
      if (err.response && err.response.status) {
        switch (err.response.status) {
          case 412: //412 is for unverified email
            errorMessage = ERRORS.AWAITING_VERIFICATION
            break
          default:
            break
        }
      }
      dispatch(setError(errorMessage))
    })
}

// Login - get user token
export const loginUser = userData => dispatch => {
  axios.post('users/login', userData).catch(err => {
    let errorMessage = ERRORS.GENERIC
    if (err.response && err.response.status) {
      switch (err.response.status) {
        case 403:
          errorMessage = ERRORS.AWAITING_VERIFICATION
          break
        case 400:
          errorMessage = ERRORS.INVALID_CREDENTIALS
          break
        case 404:
          errorMessage = ERRORS.EMAIL_NOT_FOUND
          break
        default:
          break
      }
    }
    dispatch(setError(errorMessage))
  })
}

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  }
}

export const setUserActivity = activityList => {
  return {
    type: SET_USER_ACTIVITY,
    payload: activityList
  }
}

// Log user out
export const logoutUser = () => dispatch => {
  axios.post('users/logout').catch(err => {
    let errorMessage = ERRORS.GENERIC
    if (err.response && err.response.status) {
      switch (err.response.status) {
        case 403:
          errorMessage = ERRORS.AWAITING_VERIFICATION
          break
        case 400:
          errorMessage = ERRORS.INVALID_CREDENTIALS
          break
        case 404:
          errorMessage = ERRORS.EMAIL_NOT_FOUND
          break
        default:
          break
      }
    }
    dispatch(setError(errorMessage))
  })
  dispatch(setCurrentUser({}))
}

export const getUserInformation = () => {
  const auth = store.getState().auth
  axios.get('users/me').catch(err => {
    let errorMessage = ERRORS.GENERIC
    if (err.response && err.response.status) {
      switch (err.response.status) {
        case 403:
          errorMessage = ERRORS.AWAITING_VERIFICATION
          break
        case 400:
          errorMessage = ERRORS.INVALID_CREDENTIALS
          break
        case 404:
          errorMessage = ERRORS.EMAIL_NOT_FOUND
          break
        default:
          break
      }
    }

    
    if (auth.user.id){
      // Logout user
      store.dispatch(logoutUser())
      
      // Redirect to login
      window.location.href = './login'
    } 
  })
}

export const getFilteredUsers = prefix => async dispatch => {
  return await axios.post('users', { prefix })
}
