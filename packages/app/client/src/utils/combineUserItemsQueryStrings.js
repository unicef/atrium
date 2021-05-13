const combineUserItemsQueryStrings = ({ sort, offset, limit }) => {
  return `?offset=${offset}&limit=${limit}&sort=${sort}`
}

export default combineUserItemsQueryStrings
