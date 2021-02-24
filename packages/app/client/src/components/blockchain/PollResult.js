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
              // this.props.result.slice(0, this.props.result.indexOf(":")) === 'Yes' ?
              //   ('card-body card border-dark')
              //   :
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
            {/* <p></p> */}
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary">
                {this.props.result.slice(0, this.props.result.indexOf(':')) +
                  ' '}
                {
                  // this.props.result.slice(0, this.props.result.indexOf(":")) === 'Yes' ?
                  <i className="fas fa-check-circle"></i>
                  // <i className="fas fa-times-circle"></i>
                }
              </button>
              {/* <div>
                  <a href={this.props.twitterLink} className='btn btn-link btn-primary'>Twitter <i className="fab fa-twitter"></i></a>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PollResult
