import axios from 'axios'
import errorHandling from '../utils/errorHandling'

export const ERRORS = {
  USER_ACTIVITY: 'Unable to get user activity, refresh the page to try again',
  LOGIN_EXPIRED: 'Session expired, login again',
  GENERIC:
    'Oops, something went wrong... Please try again and if the issue persists email blockchain@uninnovation.network',
  403:
    'Your account is waiting verification. Please check your email',
  400: 'Your email or password are incorrect',
  404: `Your email wasn't found in our system. Please make sure you've entered it correctly, or, if you haven't signed up, please click the Register button`
}

const handleError = errorHandling(ERRORS)

export const updateUserDetails = userDetails => {
  return axios.patch('users', userDetails)
}

export const changeUserPassword = async (passwordDetails) => {
  try {
    await axios.post('users/change-password', passwordDetails)

  } catch(err) {
    throw handleError(err, { 401: 'Invalid token' })
  }
}

export const uploadAvatar = avatar => {
  return axios.post('users/avatar', avatar)
}
/**
 * Search for a user with a given set of params
 * @param {SearchParams} params
 */
export const searchUser = params => {
  const queryParams = Object.keys(params).map(key => `${key}=${params[key]}`)
  return axios.get(`users/search?${queryParams}`)
}

export const getUserInformation = userId => {
  return axios.get(`users/${userId}`)
}

export const sendEmailToSignUp = (email) => {
  return axios.post('users/email-to-sign-up', { emailHash: email })
}

export const sendForgotPasswordEmail = async (userData) => {
  try {
    await axios.post('users/email-forgot-password', userData)
  } catch (err) {
    throw handleError(err)
  }
}

export const resetPassword = userData => {
  return axios.post('users/reset-password', userData)
}
/**
 * Function to register a user after the email verification
 * @param {Object} userData 
 * @property {String} userData.email
 * @property {String} userData.name
 * @property {String} userData.surname
 * @property {String} userData.password
 * @returns 
 */
export const registerUser = async (userData) => {
  try {
    await axios.post('users/register', userData)
  } catch(e) {
    throw handleError(e)
  }
}

export const loginUser = async (userData) => {
  try {
    return await axios.post('users/login', userData)
  } catch(err) {
    throw handleError(err)
  }
}