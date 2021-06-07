// ERRORS
import { baseRequest } from '../ui/utils'
const ROUTE = 'reports'

export const ERRORS = {
  503: 'Unable to get reports, refresh the page to try again',
  403: 'Session expired, login again',
  404: "Your email wasn't found in our system. Please make sure you've entered it correctly, or, if you haven't signed up, please click the Register button"
}

// BASE REQUEST
const reportsRequest = baseRequest({ errors: ERRORS, baseURL: ROUTE })

export const getReports = () =>
  reportsRequest({
    method: 'get'
  })
