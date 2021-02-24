import React, { Component } from 'react'

import { connect } from 'react-redux'
import {
  voteOnSpecificPoll,
  endSpecificPoll
} from '../../../actions/pollActions'
import PropTypes from 'prop-types'

class ActivePoll extends Component {
  // Should pass in: Topic, Choices: Name, Number
  constructor() {
    super()
    this.state = {
      isShowing: true,
      pollId: ''
    }
    this.handlePollSubmit = this.handlePollSubmit.bind(this)
    this.endPoll = this.endPoll.bind(this)
  }
  handlePollSubmit(e) {
    console.log(this.props.auth.user)
    e.preventDefault()
    const pollId = this.props.id
    const choice = e.target.optionsRadios.value
    const data = {
      choice,
      pollId,
      user: this.props.auth.user.id
    }
    console.log(data)
    this.props.voteOnSpecificPoll(data, this.props.history)
  }
  loadPollChoices() {
    var rows = []
    if (this.props.choices) {
      this.props.choices.forEach((element, key) => {
        rows.push(
          <div key={key} className="col-md-6 form-check">
            <input
              className="form-check-input"
              type="radio"
              name="optionsRadios"
              value={element.value}
            />
            <label className="form-check-label" htmlFor={element.value}>
              <div className="float-left">{element.value}</div>
            </label>
          </div>
        )
      })
    }
    return rows
  }
  endPoll(e) {
    e.preventDefault()
    const pollId = this.props.id
    this.setState({ isShowing: false })
    if (this.props.topic.includes('authority')) {
      console.log(
        this.props.topic
          .slice(0, this.props.topic.indexOf(' with address'))
          .slice(12, -36)
      )
      this.props.endSpecificPoll(
        pollId,
        this.props.topic
          .slice(0, this.props.topic.indexOf(' with address'))
          .slice(12, -36),
        this.props.history
      )
    } else {
      console.log(
        this.props.topic
          .slice(0, this.props.topic.indexOf(' with address'))
          .slice(12, -38)
      )
      this.props.endSpecificPoll(
        pollId,
        this.props.topic
          .slice(0, this.props.topic.indexOf(' with address'))
          .slice(12, -38),
        this.props.history
      )
    }
  }
  loadPollResults() {
    var rows = []
    if (this.props.choices) {
      this.props.choices.forEach((element, key) => {
        rows.push(
          <div key={key}>
            <div className="progress">
              <div
                className="progress-bar progress-bar-striped"
                role="progressbar"
                style={{ width: element.votes + '%' }}
                aria-valuenow={element.votes ? element.votes : '0'}
                aria-valuemin="0"
                aria-valuemax="50"
              ></div>
              {' ' + element.value} ({element.votes})
            </div>
            <br />
          </div>
        )
      })
    }
    return rows
  }
  render() {
    return this.state.isShowing ? (
      <div className="mt-5">
        <div className="m-auto">
          <div className="card card-body">
            <h4 className="mb-3">{this.props.topic}</h4>
            {// (!this.props.voters.includes(this.props.auth.user.id) && this.props.auth.user.badges[4] )?
            !this.props.voters.includes(this.props.auth.user.id) ? (
              <form onSubmit={this.handlePollSubmit}>
                {this.loadPollChoices()}
                <br />
                <button type="submit" className="btn btn-primary btn-block">
                  Vote
                </button>
                <br />
                <h5 className="mb-3">Results</h5>
              </form>
            ) : null}
            {this.loadPollResults()}
            {
              // (this.props.auth.user.badges[4] )?
              <button
                onClick={this.endPoll}
                className="btn btn-danger btn-block"
              >
                End Poll
              </button>
              // : null
            }
          </div>
        </div>
      </div>
    ) : (
      <div>
        <h5>
          Poll for <b>{this.props.id}</b> is closed.
        </h5>
      </div>
    )
  }
}

ActivePoll.propTypes = {
  voteOnSpecificPoll: PropTypes.func.isRequired,
  endSpecificPoll: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
  // errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
  // errors: state.errors
})

export default connect(mapStateToProps, {
  voteOnSpecificPoll,
  endSpecificPoll
})(ActivePoll)
