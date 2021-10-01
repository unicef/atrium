import React from 'react'
import FormHelperText from '@material-ui/core/FormHelperText'
import InputLabel from '@material-ui/core/InputLabel'
import Typography from '@material-ui/core/Typography'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from '@material-ui/styles'
import { useOutlinedInputStyle } from '../hooks'
import { Select as SelectUI } from '@material-ui/core'

const useStyles = makeStyles((theme) => (
  {
    chooseSelect: {
      color: theme.colors['warm-gray']
    },
    errorMessage: {
      marginLeft: 0,
      fontStyle: 'normal',
      fontWeight: 600,
      fontSize: '13px',
      lineHeight: '140%',
      color: theme.palette.error.main
    }
  }
))

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
  options,
  emptyOptionLabel,
  value,
  ...props
}) {
  const inputStyles = useOutlinedInputStyle({
    hasError: error,
    borderColor,
    borderColorFocus,
    padding,
    labelColor: 'black'
  })
  const classes = useStyles()
  const errorClassName = error ? classes.errorMessage : ''

  return (
    <>
      <InputLabel className={inputStyles.inputLabel} shrink htmlFor={htmlFor}>
        {label}
      </InputLabel>
      <SelectUI
        value={value !== undefined ? value : ''}
        variant="outlined"
        error={error}
        classes={{
          root: inputStyles.root
        }}
        labelWidth={0}
        {...props}
      >
        {emptyOptionLabel && 
          <MenuItem value="">
            <Typography className={classes.chooseSelect}>{emptyOptionLabel}</Typography>
          </MenuItem>
        }
        {options ?
          options.map((opt) => (
            <MenuItem value={opt.value}>
              {opt.label}
            </MenuItem>
          )) :
          props.children
        }
      </SelectUI>
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
