import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { listUsersFromGithubOrg } from '../../actions/githubActions'

class GitHubUsers extends Component {
  componentDidMount() {
    this.props.listUsersFromGithubOrg()
  }
  loadTableRows() {
    var rows = []
    if (this.props.github.list) {
      this.props.github.list.forEach(element => {
        rows.push(
          <tr key={rows.length + 1}>
            <th scope="row">{element.login}</th>
            <td>
              <a href={`https://github.com/${element.login}`}>
                Link to Profile
              </a>
            </td>
            <td>{element.type}</td>
          </tr>
        )
      })
    }
    return rows
  }
  render() {
    return (
      <div className="mt-5">
        <div className="m-auto">
          <div className="card card-body">
            <h3 className="mb-3">UNIN GitHub Users</h3>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Login</th>
                  <th scope="col">Link to GitHub</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>{this.loadTableRows()}</tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

GitHubUsers.propTypes = {
  listUsersFromGithubOrg: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  github: state.github
})

export default connect(mapStateToProps, { listUsersFromGithubOrg })(GitHubUsers)
