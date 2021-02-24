import React, { Component } from 'react'
import ActivePoll from './ActivePoll'
import PollResults from '../contracts/build/PollResults'

import { connect } from 'react-redux'

import PropTypes from 'prop-types'
import { listActivePolls } from '../../../actions/pollActions'

Array.prototype.unique = function() {
  return this.filter(function(value, index, self) {
    return self.indexOf(value) === index
  })
}

class Actions extends Component {
  async componentDidMount() {
    await this.props.listActivePolls()
  }

  loadPolls() {
    var polls = []

    this.props.poll.activePolls.forEach((element, key) => {
      console.log(element)
      polls.push(
        <ActivePoll
          key={key}
          topic={element.topic}
          id={element._id}
          choices={element.choices}
          history={this.props.history}
          voters={element.voters.unique()}
        />
      )
    })
    return polls
  }
  render() {
    return (
      <div className="mt-5">
        <div className="m-auto">
          <div className="card card-body">
            <h3 className="mb-3">Pending Decisions</h3>
            {this.loadPolls()}
          </div>
          <PollResults />
        </div>
      </div>
    )
  }
}

Actions.propTypes = {
  listActivePolls: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  poll: state.poll
})

export default connect(mapStateToProps, {
  listActivePolls
})(Actions)
