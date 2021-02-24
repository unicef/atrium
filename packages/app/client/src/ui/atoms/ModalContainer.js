import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core'

const styles = theme => ({
  container: {
    padding: '63px 45px 45px 45px',
    display: 'flex',
    flexDirection: 'column'
  }
})

const ModalContainer = ({ children, classes }) => {
  return <div className={classes.container}>{children}</div>
}

ModalContainer.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object
}

export default withStyles(styles)(ModalContainer)
