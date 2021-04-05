import React from 'react'
import TextField from './TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined'

const SearchField = (props) => {
  return (
    <TextField
      type="text"
      startAdornment={
        <InputAdornment position="start">
          <SearchOutlinedIcon />
        </InputAdornment>
      }
      {...props}
    />
  )
}

export default SearchField
