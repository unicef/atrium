import React, { Component } from 'react'
import ReactModal from 'react-modal'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { followOrgOnTwitter } from '../../actions/twitterActions'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: '50%',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '33%'
  }
}

class TwitterForm extends Component {
  constructor() {
    super()
    this.state = {
      showModal: false,
      twitterHandle: ''
    }
    this.handleOpenModal = this.handleOpenModal.bind(this)
    this.handleCloseModal = this.handleCloseModal.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }
  handleOpenModal() {
    this.setState({ showModal: true })
  }

  handleCloseModal() {
    this.setState({ showModal: false })
  }
  handleChange(e) {
    this.setState({ [e.target.id]: e.target.value })
  }
  handleFormSubmit(e) {
    e.preventDefault()
    const twitterData = {
      name: this.props.auth.user.name,
      twitterHandle: this.state.twitterHandle
    }
    this.props.followOrgOnTwitter(twitterData, this.props.history)
  }

  render() {
    return (
      <div className="mt-5">
        <div className="m-auto">
          <div className="card card-body">
            <h3 className="mb-3">Twitter Account</h3>
            <div
              className="btn btn-secondary mb-3"
              onClick={this.handleOpenModal}
            >
              {' '}
              Twitter Account
            </div>
            <ReactModal
              isOpen={this.state.showModal}
              contentLabel="Requesting Twitter Follow Form"
              ariaHideApp={false}
              style={customStyles}
            >
              <h1 className="text-center mb-3">
                <i className="fab fa-twitter"></i> Request UNIN to Follow Your
                Organization's Twitter
              </h1>
              <form noValidate onSubmit={this.handleFormSubmit}>
                <div className="form-group">
                  <label htmlFor="twitterHandle">Twitter Handle</label>
                  <input
                    type="text"
                    id="twitterHandle"
                    name="twitterHandle"
                    className="form-control"
                    placeholder="Please provide your Twitter handle"
                    onChange={this.handleChange}
                    value={this.state.twitterHandle}
                  />
                </div>
                <button
                  type="submit"
                  onClick={this.handleCloseModal}
                  className="btn btn-danger btn-block"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={this.handleFormSubmit}
                  className="btn btn-success btn-block"
                >
                  Request Follow
                </button>
              </form>
            </ReactModal>
          </div>
        </div>
      </div>
    )
  }
}

TwitterForm.propTypes = {
  followOrgOnTwitter: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { followOrgOnTwitter })(TwitterForm)
