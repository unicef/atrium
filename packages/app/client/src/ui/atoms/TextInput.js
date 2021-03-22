import React from 'react'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import FormHelperText from '@material-ui/core/FormHelperText'
import InputLabel from '@material-ui/core/InputLabel'
import { useOutlinedInputStyle } from '../hooks'


function TextInput({ error, hasError, helperText, htmlFor, label, initialValue, ...props }) {
  const classes = useOutlinedInputStyle({ hasError })
  
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
        variant="outlined"
        error={hasError}
        classes={{
          root: classes.root,
          notchedOutline: classes.notchedOutline,
          focused: classes.focused,
          input: classes.input,
          error: classes.error
        }}
        labelWidth={0}
        {...props}
      />
      {hasError && <FormHelperText className={classes.errorMessage}>{error}</FormHelperText>}
      {helperText && !hasError && <FormHelperText>{helperText}</FormHelperText>}
    </>
  )

}

TextInput.defaultProps = {
  fullWidth: true
}

export default React.memo(TextInput)
