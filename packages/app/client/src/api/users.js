import { baseRequest } from '../ui/utils'

const ROUTE = 'users'

// ENDPOINTS
const changeUserPasswordEndpoint = 'change-password'
const uploadAvatarEndpoint = 'avatar'
const sendEmailToSignUpEndpoint = 'email-to-sign-up'
const sendForgotPasswordEmailEndpoint = 'email-forgot-password'
const resetPasswordEndpoint = 'reset-password'
const registerUserEndpoint = 'register'
const loginUserEndpoint = 'login'
const getSearchUserEndpoint = params => {
  const queryParams = Object.keys(params).map(key => `${key}=${params[key]}`)
  return `search?${queryParams}`
}

// ERRORS
export const ERRORS = {
  503: 'Unable to get user activity, refresh the page to try again',
  403: 'Session expired, login again',
  404: "Your email wasn't found in our system. Please make sure you've entered it correctly, or, if you haven't signed up, please click the Register button"
}

// BASE REQUEST
const usersRequest = baseRequest({ errors: ERRORS, baseURL: ROUTE })

// REQUESTS
export const updateUserDetails = userDetails =>
  usersRequest({
    method: 'patch',
    body: userDetails
  })

export const changeUserPassword = (currentPassword, password) =>
  usersRequest({
    method: 'post',
    endpoint: changeUserPasswordEndpoint,
    body: { currentPassword, password },
    overwritingErrors: { 401: 'Invalid token' }
  })

export const uploadAvatar = avatar =>
  usersRequest({
    method: 'post',
    endpoint: uploadAvatarEndpoint,
    body: avatar
  })

/**
 * Search for a user with a given set of params
 * @param {SearchParams} params
 */
export const searchUser = params =>
  usersRequest({
    method: 'get',
    endpoint: getSearchUserEndpoint(params)
  })

export const getUserInformation = userId =>
  usersRequest({
    method: 'get',
    endpoint: userId
  })

export const sendEmailToSignUp = email =>
  usersRequest({
    method: 'post',
    endpoint: sendEmailToSignUpEndpoint,
    body: { email },
    overwritingErrors: {
      500: 'Your account is waiting verification. Please check your email'
    }
  })

export const sendForgotPasswordEmail = email =>
  usersRequest({
    method: 'post',
    endpoint: sendForgotPasswordEmailEndpoint,
    body: { email }
  })

/**
 * Reset password
 * @param {Object} data
 * @property {String} data.token
 * @property {String} data.password
 * @returns {Promise}
 */
export const resetPassword = data =>
  usersRequest({
    method: 'post',
    endpoint: resetPasswordEndpoint,
    body: data
  })

/**
 * Function to register a user after the email verification
 * @param {Object} userData
 * @property {String} userData.emailHash
 * @property {String} userData.invitationCode
 * @property {String} userData.company
 * @property {String} userData.role
 * @property {String} userData.name
 * @property {String} userData.surname
 * @property {String} userData.password
 * @returns {Promise}
 */
export const registerUser = userData =>
  usersRequest({
    method: 'put',
    endpoint: registerUserEndpoint,
    body: userData
  })

/**
 * Function to authenticate the user credentials
 * @param {Object} userData
 * @property {String} userData.email
 * @property {String} userData.password
 * @returns {Promise}
 */
export const loginUser = userData =>
  usersRequest({
    method: 'post',
    endpoint: loginUserEndpoint,
    body: userData,
    overwritingErrors: { 400: 'Your email or password are incorrect' }
  })

export const getUserProjects = query =>
  usersRequest({
    method: 'get',
    endpoint: `projects${query}`
  })

export const getUserComments = query =>
  usersRequest({
    method: 'get',
    endpoint: `comments${query}`
  })

export const deleteUser = userId =>
  usersRequest({
    method: 'post',
    endpoint: `delete/${userId}`
  })
