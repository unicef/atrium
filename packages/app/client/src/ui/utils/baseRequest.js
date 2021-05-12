import axios from 'axios'
import errorHandling from "../../utils/errorHandling"

const baseRequest = ({ errors, baseURL }) => async ({ method, endpoint, body, overwritingErrors, config }) => {
  const getStandardizedError = errorHandling(errors)
  try {
    const composedEndpoint = endpoint ? `/${endpoint}` : ''

    return await axios[method](`${baseURL}${composedEndpoint}`, ...[body, config])
  } catch(error) {
    throw new Error(getStandardizedError(error, overwritingErrors))
  }
}

export default baseRequest
