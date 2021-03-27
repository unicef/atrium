const errorHandling = (errorsObj) => (error, overwritingErrors = {}) => {
  const genericError = 'Oops, something went wrong... Please try again and if the issue persists email blockchain@uninnovation.network'

  if (error.response?.data.err) {
    return error.response.data.err
  }

  if (error.response?.status) {
    const mergedErros = { ...errorsObj, ...overwritingErrors }
    const mappedError = mergedErros[error.response.status]

    return mappedError || genericError
  }

  console.log(error)
  return genericError
}

export default errorHandling
