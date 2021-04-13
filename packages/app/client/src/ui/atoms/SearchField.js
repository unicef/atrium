import React from 'react'
import TextField from './TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined'
import CloseIcon from '@material-ui/icons/Close'
import IconButton from '@material-ui/core/IconButton'

const SearchField = ({ onChange, ...props }) => {
  const [value, setValue] = React.useState('')

  return (
    <TextField
      type="text"
      startAdornment={
        <InputAdornment position="start">
          <SearchOutlinedIcon />
        </InputAdornment>
      }
      endAdornment={
        value !== '' && 
        <IconButton
          aria-label="toggle password visibility"
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
