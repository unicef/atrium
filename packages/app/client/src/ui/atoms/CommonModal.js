import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/styles'
import Fade from '@material-ui/core/Fade'
import Modal from '@material-ui/core/Modal'

const styles = theme => ({
  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  paper: {
    width: '100%',
    maxWidth: 595,
    height: 'auto',
    backgroundColor: 'white',
    borderRadius: 5,
    outline: 'none',
    maxHeight: '100%',
    overflowY: 'auto'
  }
})

const CommonModal = ({ classes, open, onClose, children, style }) => (
  <Modal
    open={open}
    className={classes.modal}
    onClose={onClose}
    closeAfterTransition
  >
    <Fade in={open}>
      <div className={classes.paper} style={style}>
        {children}
      </div>
    </Fade>
  </Modal>
)

CommonModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

export default withStyles(styles)(CommonModal)
