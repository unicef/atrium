import React from 'react'
import PropTypes from 'prop-types'
import { Grid, withStyles } from '@material-ui/core'

const styles = theme => ({
  container: {
    marginTop: 50,
    flex: 1,
    overflowX: 'hidden',
    alignSelf: 'center',
    padding: '45px 0'
  }
})

const StandardVerticalTemplate = ({ children, classes, size=5, ...props }) => {
  return (
    <Grid
      container
      item
      xs={size}
      direction="column"
      className={classes.container}
      {...props}
    >
      {children}
    </Grid>
  )
}

StandardVerticalTemplate.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object
}

export default withStyles(styles)(StandardVerticalTemplate)
