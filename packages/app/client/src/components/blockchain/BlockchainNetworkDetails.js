import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { getBlockchainBlockNumber } from '../../actions/ethersActions'

class BlockchainNetworkDetails extends Component {
  componentDidMount() {
    this.props.getBlockchainBlockNumber()
  }

  render() {
    return (
      <div className="mt-5">
        <div className="m-auto">
          <div className="card card-body">
            <h3 className="mb-3">Network Details</h3>
            <p>Last Block #: {this.props.ethers.blockNumber}</p>
          </div>
        </div>
      </div>
    )
  }
}

BlockchainNetworkDetails.propTypes = {
  getBlockchainBlockNumber: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  ethers: state.ethers
})

export default connect(mapStateToProps, { getBlockchainBlockNumber })(
  BlockchainNetworkDetails
)
