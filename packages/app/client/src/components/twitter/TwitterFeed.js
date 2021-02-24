import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { listTweetsFromTwitterOrg } from '../../actions/twitterActions'

class TwitterFeed extends Component {
  async componentDidMount() {
    await this.props.listTweetsFromTwitterOrg()
  }
  loadTableRows() {
    var rows = []
    if (this.props.twitter.tweets) {
      this.props.twitter.tweets.forEach(element => {
        rows.push(
          <tr key={rows.length + 1}>
            <th scope="row">{element.created_at}</th>
            <td>>{element.favorite_count}</td>
            <td>{element.retweet_count}</td>
            <td>{element.full_text}</td>
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
            <h3 className="mb-3">UNIN Tweets</h3>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Favourite</th>
                  <th scope="col">RT</th>
                  <th scope="col">Text</th>
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

TwitterFeed.propTypes = {
  listTweetsFromTwitterOrg: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  twitter: state.twitter
})

export default connect(mapStateToProps, { listTweetsFromTwitterOrg })(
  TwitterFeed
)
