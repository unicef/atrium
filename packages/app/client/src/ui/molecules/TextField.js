import React from 'react'
import { compose } from 'recompose'
import { withStyles } from '@material-ui/styles'
import TextField from '@material-ui/core/TextField'

const styles = theme => ({
  '@global': {
    '.MuiFormControl-root, .MuiInputBase-input': {
      color: 'black',
      fontFamily: 'Roboto'
    },
    '.MuiInputBase-input::placeholder': {
      color: theme.colors['warm-gray'],
      opacity: 1
    },
    '.MuiInputLabel-root.Mui-focused': {
      color: theme.colors['dark-forest-green']
    },
    '.MuiInput-underline:after': {
      borderColor: theme.colors['dark-forest-green']
    },
    '.MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderColor: theme.colors['dark-forest-green']
    }
  }
})

const enhance = compose(
  React.memo, // remove excess rerender
  withStyles(styles)
)

const UiTextField = enhance(
  ({
    type,
    id,
    name,
    label,
    value,
    error,
    onChange,
    multiline,
    rowsMax,
    variant,
    fullWidth,
    required,
    ...props
  }) => {
    return (
      <TextField
        type={type}
        fullWidth={fullWidth}
        id={id}
        name={name}
        value={value}
        label={label}
        error={error}
        onChange={onChange}
        multiline={multiline}
        rowsMax={rowsMax}
        variant={variant}
        required={required}
        {...props}
      />
    )
  }
)

export default UiTextField
