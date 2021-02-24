import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PollResult from './PollResult'

import { getBlockchainDecisions } from '../../actions/decisionActions'

class PollResults extends Component {
  componentDidMount() {
    this.props.getBlockchainDecisions(this.props.auth.user.id)
  }
  loadPollResults() {
    console.log('Hi there!')
    var pollResults = []
    this.props.decisions.decisions.forEach((decisionArray, key) => {
      console.log(decisionArray)
      pollResults.push(
        <PollResult
          key={key}
          topic={decisionArray[1]}
          result={decisionArray[2]}
        />
      )
    })
    return pollResults
  }

  render() {
    return (
      <div className="mt-5">
        <div className="m-auto">
          <div className="card card-body">
            <h3 className="mb-3">Finalized Decisions</h3>
            {this.props.decisions.decisions ? (
              this.loadPollResults()
            ) : (
              <p>There are no poll results at this time</p>
            )}
          </div>
        </div>
      </div>
    )
  }
}

PollResults.propTypes = {
  getBlockchainDecisions: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  decisions: state.decisions
})

export default connect(mapStateToProps, {
  getBlockchainDecisions
})(PollResults)
