import React, { Component } from 'react'

class PollResult extends Component {
  render() {
    return (
      <div className="mt-5">
        <div className="m-auto">
          {console.log(
            this.props.result.slice(0, this.props.result.indexOf(':'))
          )}
          <div
            className={
              'card-body card border-dark'
            }
          >
            <h5>
              {this.props.topic.slice(
                0,
                this.props.topic.indexOf(' with address')
              )}
              ?
            </h5>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary">
                {this.props.result.slice(0, this.props.result.indexOf(':')) +
                  ' '}
                {<i className="fas fa-check-circle"></i>}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PollResult
