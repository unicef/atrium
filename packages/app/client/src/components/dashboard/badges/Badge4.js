import React, { Component } from 'react'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class Badge4 extends Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <div className="mt-2">
        <div className="m-auto">
          {this.props.auth.user.badges[4] ? (
            <div className="card text-white bg-dark mb-3">
              <div className="card-body">
                <h5 className="card-title">Governor</h5>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
            </div>
          ) : (
            <div className="card border-dark mb-3">
              <div className="card-body text-dark">
                <h5 className="card-title">Governor</h5>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}

Badge4.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(Badge4)
