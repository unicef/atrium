const dateFormatter = ({
  date,
  formatOptions = [{day: '2-digit'}, {month: '2-digit'}, {year: 'numeric'}],
  separator
}) => {
  const formatter = (option) => {
    const dateTime = new Intl.DateTimeFormat('en', option)
    
    return dateTime.format(new Date(date))
  }
  const formattedDateArray = formatOptions.map(formatter)

  if (separator) {
    return formattedDateArray.join(separator)
  }

  return formattedDateArray
}

export default dateFormatter
