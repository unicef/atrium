import React from 'react'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import FormHelperText from '@material-ui/core/FormHelperText'
import InputLabel from '@material-ui/core/InputLabel'
import { useOutlinedInputStyle } from '../hooks'

function TextField({ error, errorMessage, helperText, htmlFor, label, initialValue, borderColor, borderColorFocus, padding, labelColor, ...props }) {
  const classes = useOutlinedInputStyle({ hasError: error, borderColor, borderColorFocus, padding, labelColor })
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
        classes={classes}
        labelWidth={0}
        {...props}
      />
      <FormHelperText className={errorClassName}>{error ? errorMessage : helperText}</FormHelperText>
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
