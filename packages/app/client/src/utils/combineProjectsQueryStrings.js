
const combineProjectsQueryStrings = (
  {
    filters,
    sort,
    search = '',
    offset,
    limit
  }
) => {
  const combinedFilters = Object.entries(filters).reduce((acc, [key, options]) => {
    if (Array.isArray(options) && options.length > 0) return [...acc, `${key}=${options.join(',')}`]

    return acc
  }, [])
  
  if (Array.isArray(combinedFilters)) {
    return `?offset=${offset}&limit=${limit}&name=${search}&sort=${sort}${combinedFilters.length > 0 ? `&${combinedFilters.join('&')}` : ''}`
  }

  return `?offset=${offset}&limit=${limit}&name=${search}&sort=${sort}`
}

export default combineProjectsQueryStrings
