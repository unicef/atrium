import React from 'react'
import TextField from './TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined'
import CloseIcon from '@material-ui/icons/Close'
import IconButton from '@material-ui/core/IconButton'

const SearchField = ({ onChange, searchText, ...props }) => {
  const [value, setValue] = React.useState(searchText)
 
  React.useEffect(() => {
    if (searchText === undefined && searchText !== value) {
      setValue('')
    }
  }, [searchText])

  const isFieldFilled = value !== '' && value !== undefined

  return (
    <TextField
      type="text"
      startAdornment={
        <InputAdornment position="start">
          <SearchOutlinedIcon />
        </InputAdornment>
      }
      endAdornment={
        isFieldFilled && 
        <IconButton
          aria-label="clear search field value"
          onClick={() => {
            setValue('')
            onChange('')
          }}
          onMouseDown={(event) =>  event.preventDefault()}
          edge="end"
        >
          <CloseIcon />
        </IconButton>
      }
      {...props}
      onChange={(e) => {
        const value = e.target.value

        setValue(value)
        onChange(value)
      }}
      value={value}
    />
  )
}

export default SearchField
