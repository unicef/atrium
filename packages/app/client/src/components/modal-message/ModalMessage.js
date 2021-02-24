import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { withStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'

import { CommonModal } from '../../ui/'
import { unsetError } from '../../actions/errorActions'

const styles = theme => ({
  content: {
    padding: '40px 45px 45px 45px',
    display: 'flex',
    flexDirection: 'column'
  }
})

class ModalMessage extends React.PureComponent {
  state = {
    isOpen: false
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.error && !this.state.isOpen) {
      this.openModal()
    }
  }

  openModal = () => {
    this.setState({ isOpen: true })
  }

  closeModal = () => {
    this.props.unsetError()
    this.setState({ isOpen: false })
  }

  render() {
    const { isOpen } = this.state
    const { classes, error } = this.props

    return error ? (
      <CommonModal open={isOpen} onClose={this.closeModal}>
        <div className={classes.content}>
          <Typography
            component="p"
            variant="h4"
            color="secondary"
            style={{ marginBottom: 15 }}
          >
            {error}
          </Typography>
        </div>
      </CommonModal>
    ) : null
  }
}

const mapStateToProps = state => ({
  error: state.errors && state.errors.clientError
})

const mapDispatchToProps = dispatch => ({
  unsetError: () => dispatch(unsetError())
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(ModalMessage)
