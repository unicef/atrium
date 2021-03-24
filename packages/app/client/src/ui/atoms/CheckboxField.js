import React from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  root: {
    color: theme.colors['light-gray'],
    '&$checked': {
      color: theme.palette.primary.main,
    },
  },
  checked: {},
}))

const CustomCheckbox = ({ fullWidth, formLabelProps, hasError, value, label, classes, ...props }) => {
  const styles = useStyles()

  const mergeClassesObj = Object.keys(styles).reduce((acc, key) => {
    if (acc[key] && classes) {
      return { ...acc, [key]: `${acc[key]} ${classes[key]}`}
    }
    return acc
  }, styles)
  
  return (
    <FormControlLabel
      {...formLabelProps}
      control={
        <Checkbox
          checked={value}
          {...props}
          classes={mergeClassesObj}
        />
      }
      label={label}
    />
  )
}

export default CustomCheckbox