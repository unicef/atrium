import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import GitHubWriteBadge from '../dashboard/badges/GitHubWriteBadge'
import GitHubUsers from '../github/GitHubUsers'

import Badge1 from '../dashboard/badges/Badge1'
import Badge2 from '../dashboard/badges/Badge2'

class GitHubPage extends Component {
  render() {
    const { user } = this.props.auth
    return (
      <div className="container mt-5">
        <div className="col-md-6 m-auto">
          <div className="card card-body">
            <h3 className="text-center">
              {/* {user.name.split(" ")[0]} */}
              GitHub Access Details for:
              <p>
                <span style={{ fontFamily: 'monospace' }}>{user.address}</span>
              </p>
            </h3>
          </div>
          <div className="card card-body mt-5 m-auto">
            <h3>Badges:</h3>
            <Badge1 />
            <Badge2 />
          </div>

          {!user.githubHandle ? ( // Implies that they haven't added a github yet
            !this.props.github.githubHandle ? ( // implies that they have added it
              <GitHubWriteBadge history={this.props.history} />
            ) : (
              <div className="mt-5">
                <div className="m-auto">
                  <div className="card card-body">
                    <h3 className="mb-3">
                      Your Organizaton's GitHub has been saved:{' '}
                      <b>{user.githubHandle}</b>
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
                    Your Organization's GitHub Handle:{' '}
                    <b>{user.githubHandle}</b>
                  </h3>
                  <p>
                    If you do not see your GitHub handle in the list below,
                    please check your email and confirm joining the
                    organization. If you still do not see your GitHub handle
                    after confirm, please contact the administrator.
                  </p>
                </div>
              </div>
            </div>
          )}
          {this.props.auth.user.badges[2] ? (
            <GitHubUsers history={this.props.history} />
          ) : null}
          <br />
        </div>
      </div>
    )
  }
}

GitHubPage.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  github: state.github
})

export default connect(mapStateToProps)(GitHubPage)
