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
