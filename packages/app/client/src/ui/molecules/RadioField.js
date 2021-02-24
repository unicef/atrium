import React from 'react'
import { compose } from 'recompose'
import { withStyles } from '@material-ui/styles'
import Radio from '@material-ui/core/Radio'
import FormControlLabel from '@material-ui/core/FormControlLabel'

const styles = theme => ({
  default: {
    color: theme.colors['black']
  },
  checked: {
    color: `${theme.colors['shamrock-green']} !important`
  }
})

const enhance = compose(React.memo, withStyles(styles))

export const RadioField = enhance(({ value, label, classes, ...props }) => {
  const composeStyles = `${props.checked ? classes.checked : classes.default}`

  return (
    <FormControlLabel
      value={value}
      label={label}
      className={composeStyles}
      control={<Radio className={composeStyles} {...props} />}
    />
  )
})
