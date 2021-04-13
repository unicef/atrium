const dateFormatter = ({
  date,
  formatOptions = [{day: '2-digit'}, {month: '2-digit'}, {year: 'numeric'}],
  separator
}) => {
  const formatter = (option) => {
    const dateTime = new Intl.DateTimeFormat('en', option);
    
    return dateTime.format(new Date(date));
  }
  
  return formatOptions.map(formatter).join(separator);
}

export default dateFormatter
