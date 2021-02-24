import React, { Component } from 'react'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Badge1 from './Badge1'
import Badge2 from './Badge2'
import Badge3 from './Badge3'
import Badge4 from './Badge4'

class BadgeViewer extends Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <div className="mt-5">
        <div className="m-auto">
          <div className="card card-body">
            <h3 className="mb-3">Badge Viewer</h3>
            <Badge1 />
            {/* { this.props.auth.user.badges[1] ? (
                <div className="card text-white bg-primary mb-3">
                    <div className="card-body">
                        <h5 className="card-title">Viewer</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                </div>
                ) : (
                  <div className="card border-dark mb-3">
                    <div className="card-body text-dark">
                      <h5 className="card-title">Viewer</h5>
                      <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                  </div>
                )
            } */}
            <Badge2 />
            <Badge3 />
            <Badge4 />
          </div>
        </div>
      </div>
    )
  }
}

BadgeViewer.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(BadgeViewer)
