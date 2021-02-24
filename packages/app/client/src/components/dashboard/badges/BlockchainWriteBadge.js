import React, { Component } from 'react'
import ReactModal from 'react-modal'

// New
import { connect } from 'react-redux'
import {
  addPollToCreateBlockchainParticipant,
  addPollToCreateBlockchainGovernor
} from '../../../actions/pollActions'
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

class BlockchainWrite extends Component {
  constructor() {
    super()
    this.state = {
      showModal: false,
      choices: [
        {
          value: 'Yes'
        },
        {
          value: 'No'
        }
      ], // should always be yes and no
      governorFlag: '' // if checkbox is clicked then change this to false
    }
    this.handleOpenModal = this.handleOpenModal.bind(this)
    this.handleCloseModal = this.handleCloseModal.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)

    this.handleGovernorChange = this.handleGovernorChange.bind(this)
  }
  handleGovernorChange(e) {
    const target = e.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    console.log(this.state.governorFlag)
    this.setState({
      [name]: value
    })
  }
  handleOpenModal() {
    this.setState({ showModal: true })
  }

  handleCloseModal() {
    this.setState({ showModal: false })
  }
  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleFormSubmit(e) {
    e.preventDefault()
    const participantData = {
      topic: `Do you want ${this.props.auth.user.name} to be a participant on the blockchain with address ${this.props.auth.user.address}`,
      choices: this.state.choices
    }
    this.props.addPollToCreateBlockchainParticipant(
      participantData,
      this.props.history
    )
    if (this.state.governorFlag) {
      const governorData = {
        topic: `Do you want ${this.props.auth.user.name} to have authority on the blockchain with address ${this.props.auth.user.address}`,
        choices: this.state.choices
      }
      this.props.addPollToCreateBlockchainGovernor(
        governorData,
        this.props.history
      )
    }
  }
  render() {
    return (
      <div className="mt-5">
        <div className="m-auto">
          <div className="card card-body">
            <h3 className="mb-3">Node access and writing to blockchain</h3>
            <div
              className="btn btn-secondary mb-3"
              onClick={this.handleOpenModal}
            >
              {' '}
              Blockchain Write Permissions
            </div>
            <ReactModal
              isOpen={this.state.showModal}
              contentLabel="Requesting Blockchain Write Access Form"
              ariaHideApp={false}
              style={customStyles}
            >
              <h1 className="text-center mb-3">
                <i className="fas fa-link"></i> Request Blockchain Access
              </h1>
              <form noValidate onSubmit={this.handleFormSubmit}>
                <div className="form-group">
                  <p>
                    You are initiating a request to all of the agencies in the
                    interagency blockchain. The request is to obtain a node on
                    the interagency blockchain. This will allow your
                    organizations to write to the interagency blockchain.
                  </p>
                  {/* Voting access can be requested here as well */}
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="governorFlag"
                      value={this.state.governorFlag}
                      onChange={this.handleGovernorChange}
                      id="governorFlag"
                    />
                    <label className="form-check-label" htmlFor="governorFlag">
                      Request permission to vote
                    </label>
                  </div>
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

// export default BlockchainWrite;
BlockchainWrite.propTypes = {
  addPollToCreateBlockchainParticipant: PropTypes.func.isRequired,
  addPollToCreateBlockchainGovernor: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, {
  addPollToCreateBlockchainParticipant,
  addPollToCreateBlockchainGovernor
})(BlockchainWrite)
