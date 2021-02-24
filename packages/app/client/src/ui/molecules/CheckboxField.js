import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { withStyles } from '@material-ui/styles'
import MaterialCheckbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'

const styles = theme => ({
  default: {
    color: theme.colors['black']
  },
  checked: {
    color: theme.colors['shamrock-green']
  }
})

const enhance = compose(React.memo, withStyles(styles))

export const CheckboxField = enhance(
  ({ checked, value, label, onChange, id, classes, ...props }) => {
    const composeStyles = `${classes.default} ${checked ? classes.checked : ''}`

    return (
      <FormControlLabel
        label={label}
        className={composeStyles}
        control={
          <MaterialCheckbox
            className={composeStyles}
            color="default"
            id={id}
            value={value}
            checked={checked}
            onChange={onChange}
            {...props}
          />
        }
      />
    )
  }
)

CheckboxField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired
}
