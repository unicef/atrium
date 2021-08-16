import React from 'react'
import Radio from '@material-ui/core/Radio'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { withStyles } from '@material-ui/styles'

const styles = theme => ({
  default: {
    color: theme.colors['black']
  },
  checked: {
    color: `${theme.colors['shamrock-green']} !important`
  }
})

const _Radio = (props) => (
  <FormControlLabel
      value={props.value}
      label={props.label}
      control={<Radio />}
      {...props}
    />
)

export default withStyles(styles)(_Radio)
