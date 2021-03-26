const errorHandling = (errorsObj) => (error, overwritingErrors) => {
  if (error.response?.data.err) {
    return error.response.data.err
  }

  if (error.response?.status) {
    if (overwritingErrors) {
      const newErrors = { ...errorsObj, ...overwritingErrors }

      return newErrors[error.response.status]
    }

    return errorsObj[error.response.status]
  }

  console.log(error)
  return 'Oops, something went wrong... Please try again and if the issue persists email blockchain@uninnovation.network'
}

export default errorHandling
