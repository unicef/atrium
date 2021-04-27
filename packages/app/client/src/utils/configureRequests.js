import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'
import jwt_decode from 'jwt-decode'
import store from '../store'
import { setCurrentUser, logoutUser } from '../actions/authActions'


export const getBaseURL = () => {
  if (process.env.NODE_ENV === 'development') {
    return `http://localhost:${process.env.PORT || 5000}/api/`
  }
  return `/api/`
}
axios.defaults.withCredentials = true
axios.defaults.headers.common = { 'X-Requested-With': 'XMLHttpRequest' }
axios.defaults.baseURL = getBaseURL()

axios.interceptors.response.use(
  function(response) {
    const { url } = response.config
    const { payload } = response.data
    if (url.includes('users') && payload?.id && payload?.iat)
      store.dispatch(setCurrentUser(payload))
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
