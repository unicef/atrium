import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logoutUser } from '../../actions/authActions'

import BadgeViewer from './badges/BadgeViewer'

class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault()
    this.props.logoutUser()
  }

  render() {
    const { user } = this.props.auth
    return (
      <div className="container mt-5">
        <div className="col-md-6 m-auto">
          <div className="card card-body">
            <h3 className="text-center">
              <b>Hey there,</b> {user.name.split(' ')[0]}
              <p className="text-center flow-text grey-text text-darken-1">
                You are logged into the{' '}
                <span style={{ fontFamily: 'monospace' }}>
                  interagency blockchain onboarding
                </span>{' '}
                app 👏
              </p>
              <p>
                Your blockchain address:{' '}
                <span style={{ fontFamily: 'monospace' }}>{user.address}</span>
              </p>
            </h3>
          </div>
          <BadgeViewer />
        </div>
      </div>
    )
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  twitter: state.twitter,
  github: state.github
})

export default connect(mapStateToProps, { logoutUser })(Dashboard)
