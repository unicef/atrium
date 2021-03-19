import React, { useState } from 'react'
import { TextField } from '../atoms'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'

const PasswordField = (props) => {
  const [showPassword, setPasswordVisibility] = useState(false)

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  }

  return (
    <TextField
      {...props}
      type={showPassword ? 'text' : 'password'}
      onChange={props.onChange}
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={() => setPasswordVisibility(!showPassword)}
            onMouseDown={handleMouseDownPassword}
            edge="end"
          >
            {showPassword ? <Visibility /> : <VisibilityOff />}
          </IconButton>
        </InputAdornment>
      }
      />
  )
}

export default React.memo(PasswordField)
