import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import TwitterForm from '../twitter/TwitterForm'
import TwitterFeed from '../twitter/TwitterFeed'
import Badge1 from '../dashboard/badges/Badge1'

class TwitterPage extends Component {
  render() {
    const { user } = this.props.auth
    return (
      <div className="container mt-5">
        <div className="col-md-6 m-auto">
          <div className="card card-body">
            <h3 className="text-center">
              Twitter Details for:
              <p>
                <span style={{ fontFamily: 'monospace' }}>{user.address}</span>
              </p>
            </h3>
          </div>
          <div className="card card-body mt-5 m-auto">
            <h3>Badges:</h3>
            <Badge1 />
          </div>
          {!user.twitterHandle ? (
            !this.props.twitter.twitterHandle ? ( // implies that they have added it
              <TwitterForm history={this.props.history} />
            ) : (
              <div className="mt-5">
                <div className="m-auto">
                  <div className="card card-body">
                    <h3 className="mb-3">
                      Your Organization's Twitter has been saved
                    </h3>
                    <p>
                      Please logout and login again to see the updated
                      dashboard.
                    </p>
                  </div>
                </div>
              </div>
            )
          ) : (
            <div className="mt-5">
              <div className="m-auto">
                <div className="card card-body">
                  <h3 className="mb-3">
                    Your Organization's Twitter Handle:{' '}
                    <b>{user.twitterHandle}</b>
                  </h3>
                  <p>
                    If you do not see a Twitter follow from UNIN, please contact
                    the administrator.
                  </p>
                </div>
              </div>
            </div>
          )}
          <TwitterFeed history={this.props.history} />
        </div>
      </div>
    )
  }
}

TwitterPage.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  twitter: state.twitter,
  github: state.github
})

export default connect(mapStateToProps)(TwitterPage)
