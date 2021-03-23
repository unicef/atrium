import React, { useState } from 'react'
import TextInput from './TextInput'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import PasswordInfoBubble from './PasswordInfoBubble'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  wrapper: {
    position: 'relative',
    '@media (max-width: 1024px)': {
      marginBottom: (props) => props.isFocused ? 140 : 0
    }
  }
})

const PasswordField = (props) => {
  const [showPassword, setPasswordVisibility] = useState(false)
  const [isFocused, setFocus] = useState(false)
  const classes = useStyles({ isFocused })

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  }

  return (
    <div className={classes.wrapper}>
      <TextInput
        {...props}
        type={showPassword ? 'text' : 'password'}
        onFocus={() => setFocus(true)}
        onBlur={(e) => {
          props.onBlur(e)
          setFocus(false)
        }}
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
      <PasswordInfoBubble isFocused={isFocused}/>
    </div>
  )
}

export default React.memo(PasswordField)
