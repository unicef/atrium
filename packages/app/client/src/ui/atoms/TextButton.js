import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core'
import { Button } from './Button'
import { composeMargins } from '../utils'

const useStyles = makeStyles(theme => ({
  anchor: props => ({
    color: theme.colors[props.labelColor],
    textDecoration: 'none',
    textTransform: 'none',
    padding: 5,
    ...composeMargins(props)
  }),
  disabled: {
    backgroundColor: 'transparent'
  }
}))

export const TextButton = ({ textContent, onClick, ...props }) => {
  const classes = useStyles(props)

  return (
    <Button
      variant="text"
      onClick={onClick}
      className={classes.anchor}
      {...props}
    >
      <Typography variant="caption">{textContent}</Typography>
    </Button>
  )
}
TextButton.propTypes = {
  textContent: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  classes: PropTypes.object
}
