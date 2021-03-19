import React, { Component } from 'react'
import ReactModal from 'react-modal'

import { connect } from 'react-redux'
import { addUserToGitHubOrg } from '../../../actions/githubActions'
import PropTypes from 'prop-types'

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

class GithubWrite extends Component {
  constructor() {
    super()
    this.state = {
      showModal: false,
      githubHandle: '',
      githubHandle2: ''
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
    // This function will take the the GitHub handle and add it to the repository
    // Need to check for both inputs being there
    e.preventDefault()
    if (this.state.githubHandle === this.state.githubHandle2) {
      const githubData = {
        name: this.props.auth.user.name,
        githubHandle: this.state.githubHandle
      }
      this.props.addUserToGitHubOrg(githubData, this.props.history)
    } else {
      console.log('GitHub Handles do not match')
    }
  }

  render() {
    return (
      <div className="mt-5">
        <div className="m-auto">
          <div className="card card-body">
            <h3 className="mb-3">Contribution to GitHub</h3>
            <div
              className="btn btn-secondary mb-3"
              onClick={this.handleOpenModal}
            >
              {' '}
              GitHub Write Permissions
            </div>
            <ReactModal
              isOpen={this.state.showModal}
              contentLabel="Requesting GitHub Write Access Form"
              ariaHideApp={false}
              style={customStyles}
            >
              <h1 className="text-center mb-3">
                <i className="fab fa-github"></i> Request Interagency GitHub
                Access
              </h1>
              <form noValidate onSubmit={this.handleFormSubmit}>
                <div className="form-group">
                  <label htmlFor="email">GitHub Handle</label>
                  <input
                    type="text"
                    id="githubHandle"
                    name="githubHandle"
                    className="form-control"
                    placeholder="Please provide your GitHub handle"
                    onChange={this.handleChange}
                    value={this.state.githubHandle}
                  />
                  <label htmlFor="email">Confirm GitHub Handle</label>
                  <input
                    type="text"
                    id="githubHandle2"
                    name="githubHandle2"
                    className="form-control"
                    placeholder="Please provide your GitHub handle"
                    onChange={this.handleChange}
                    value={this.state.githubHandle2}
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
                  Request Access
                </button>
              </form>
            </ReactModal>
          </div>
        </div>
      </div>
    )
  }
}

GithubWrite.propTypes = {
  addUserToGitHubOrg: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { addUserToGitHubOrg })(GithubWrite)
