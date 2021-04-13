
const combineProjectsQueryStrings = (
  {
    filters,
    sort,
    search = '',
    offset,
    limit
  }
) => {
  const combinedFilters = Object.entries(filters).map(([key, options]) => Array.isArray(options) ? `${key}=${options.join(',')}` : '')
  
  if (Array.isArray(combinedFilters)) {
    return `?offset=${offset}&limit=${limit}&name=${search}&sort=${sort}&${combinedFilters.join('&')}`
  }

  return `?offset=${offset}&limit=${limit}&name=${search}&sort=${sort}`
}

export default combineProjectsQueryStrings
