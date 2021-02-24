import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { withStyles, Button } from '@material-ui/core'

const styles = theme => ({
  anchor: {
    color: theme.colors['black'],
    textDecoration: 'none',
    textTransform: 'none',
    padding: 0
  }
})

export const TextButton = withStyles(styles)(
  ({ textContent, onClick, classes, ...props }) => {
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
)

TextButton.propTypes = {
  textContent: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  classes: PropTypes.object
}
