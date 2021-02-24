export const getEmailHash = searchString => {
  const searchParams = new URLSearchParams(searchString)

  if (searchParams.has('hash')) {
    return searchParams.get('hash')
  }
  return null
}
