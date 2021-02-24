import axios from 'axios'

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

export const sendForgotPasswordEmail = userData => {
  return axios.post('users/email-forgot-password', userData)
}

export const resetPassword = userData => {
  return axios.post('users/reset-password', userData)
}