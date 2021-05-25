import React from 'react'
import FormHelperText from '@material-ui/core/FormHelperText'
import InputLabel from '@material-ui/core/InputLabel'
import { useOutlinedInputStyle } from '../hooks'
import { Select as SelectUI } from '@material-ui/core'

function Select({
  error,
  errorMessage,
  helperText,
  htmlFor,
  label,
  initialValue,
  borderColor,
  borderColorFocus,
  padding,
  ...props
}) {
  const classes = useOutlinedInputStyle({
    hasError: error,
    borderColor,
    borderColorFocus,
    padding
  })
  const errorClassName = error ? classes.errorMessage : ''

  return (
    <>
      <InputLabel className={classes.inputLabel} shrink htmlFor={htmlFor}>
        {label}
      </InputLabel>
      <SelectUI
        variant="outlined"
        error={error}
        classes={classes}
        labelWidth={0}
        {...props}
      />
      <FormHelperText className={errorClassName}>
        {error ? errorMessage : helperText}
      </FormHelperText>
    </>
  )
}

Select.defaultProps = {
  fullWidth: true,
  helperText: '',
  borderColor: 'light-gray-two',
  borderColorFocus: 'black-two'
}

export default React.memo(Select)
