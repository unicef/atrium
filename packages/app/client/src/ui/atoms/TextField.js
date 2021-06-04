import React from 'react'
import Box from '@material-ui/core/Box'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import FormHelperText from '@material-ui/core/FormHelperText'
import InputLabel from '@material-ui/core/InputLabel'
import Fade from '@material-ui/core/Fade'
import { useOutlinedInputStyle } from '../hooks'

function TextField({
  error,
  errorMessage,
  helperText,
  htmlFor,
  label,
  initialValue,
  borderColor,
  borderColorFocus,
  padding,
  labelColor,
  ...props 
}) {
  const classes = useOutlinedInputStyle({ hasError: error, borderColor, borderColorFocus, padding, labelColor })
  const errorClassName = error ? classes.errorMessage : ""
  const showHelperTextOrError = Boolean(error || helperText)
  return (
    <>
      <InputLabel
        className={classes.inputLabel}
        shrink
        htmlFor={htmlFor}
      >
        {label}
      </InputLabel>
      <OutlinedInput
        error={error}
        classes={{
          input: classes.input
        }}
        labelWidth={0}
        {...props}
      />
      <Box position="relative" mb="13px" width="100%">
        <Box position="absolute">
          <Fade in={showHelperTextOrError}>
            <FormHelperText className={errorClassName}>{error ? errorMessage : helperText}</FormHelperText>
          </Fade>
        </Box>
      </Box>
    </>
  )

}

TextField.defaultProps = {
  fullWidth: true,
  helperText: '',
  borderColor: 'light-gray-two',
  borderColorFocus: 'black-two',
  labelColor: 'black'
}

export default React.memo(TextField)
