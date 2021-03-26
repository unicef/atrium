import axios from 'axios'

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

export const updateUserDetails = userDetails => {
  return axios.patch('users', userDetails)
}

export const changeUserPassword = passwordDetails => {
  return axios.post('users/change-password', passwordDetails)
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

export const sendEmailToSignUp = userData => {
  return axios.post('users/email-to-sign-up', userData)
}

export const sendForgotPasswordEmail = async (userData) => {
  try {
    await axios.post('users/email-forgot-password', userData)
  } catch (err) {
    let errorMessage = ERRORS.GENERIC
    if (err.response && err.response.status) {
      switch (err.response.status) {
        case 403:
          errorMessage = ERRORS.AWAITING_VERIFICATION
          break
        case 404:
          errorMessage = ERRORS.EMAIL_NOT_FOUND
          break
        default:
          break
      }
      throw errorMessage
    }
    throw ERRORS.GENERIC
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
export const registerUser = userData => {
  return axios.post('users/register', userData)
}

export const loginUser = async (userData) => {
  try {
    await axios.post('users/login', userData)

  } catch(err) {
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

      throw errorMessage
    }

    throw ERRORS.GENERIC
  }
}