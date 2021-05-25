export const getEmailHash = searchString => {
  const searchParams = new URLSearchParams(searchString)

  if (searchParams.has('hash')) {
    return searchParams.get('hash')
  }
  return null
}

export const getEmailInvtCode = searchString => {
  const searchParams = new URLSearchParams(searchString)

  if (searchParams.has('code')) {
    return searchParams.get('code')
  }
  return null
}
