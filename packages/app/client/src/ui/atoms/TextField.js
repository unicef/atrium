import React from 'react'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import FormHelperText from '@material-ui/core/FormHelperText'
import InputLabel from '@material-ui/core/InputLabel'
import { useOutlinedInputStyle } from '../hooks'

function TextField({ error, errorMessage, helperText, htmlFor, label, initialValue, ...props }) {
  const classes = useOutlinedInputStyle({ hasError: error })
  const errorClassName = error ? classes.errorMessage : ""

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
        error={error}
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
      <FormHelperText className={errorClassName}>{error ? errorMessage : helperText}</FormHelperText>
    </>
  )

}

TextField.defaultProps = {
  fullWidth: true,
  helperText: ''
}

export default React.memo(TextField)
