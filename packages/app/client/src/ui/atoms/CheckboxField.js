import React from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  root: {
    color: theme.colors['light-gray'],
    '&$checked': {
      color: theme.palette.primary.main,
      backgroundColor: 'transparent',
      '&:hover': {
        backgroundColor: 'transparent'
      }
    },
    '&:hover': {
      backgroundColor: 'transparent'
    },
    '& svg': {
      width: 26,
      height: 26
    }
  },
  checked: {},
}))

const CustomCheckbox = ({ contentPlacemet, fullWidth, formLabelProps, hasError, value, label, classes, ...props }) => {
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
      contentPlacemet={contentPlacemet}
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

export default React.memo(CustomCheckbox)