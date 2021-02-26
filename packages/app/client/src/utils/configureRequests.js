import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'
import jwt_decode from 'jwt-decode'
import store from '../store'
import { setCurrentUser, logoutUser } from '../actions/authActions'

const authorizationHeader = 'authorization'

export const getBaseURL = () => {
  if (process.env.NODE_ENV === 'development') {
    return `http://localhost:${process.env.PORT || 5000}/api/`
  }
  return `/api/`
}

axios.defaults.headers.common = { 'X-Requested-With': 'XMLHttpRequest' }
axios.defaults.withCredentials = true
axios.defaults.baseURL = getBaseURL()

axios.interceptors.response.use(
  function(response) {
    const sentHeader = response.config.headers[authorizationHeader]
    const receivedHeader = response.headers[authorizationHeader]
    if (receivedHeader && sentHeader !== receivedHeader) {
      const parsedHeader = receivedHeader.split('Bearer ')[1]
      // Set token to localStorage
      localStorage.setItem('jwtToken', parsedHeader)
      // Set token to Auth header
      setAuthToken(parsedHeader)
      // Decode token to get user data
      const decoded = jwt_decode(parsedHeader)
      // Set current user

      store.dispatch(setCurrentUser(decoded))
    }
    return response
  },
  function(error) {
    const status = error && error.response && error.response.status
    if (status === 401) {
      store.dispatch(logoutUser())
    }
    return Promise.reject(error)
  }
)
