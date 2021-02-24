import React, { Component } from 'react'

import BlockchainNetworkDetails from '../blockchain/BlockchainNetworkDetails'
class Technical extends Component {
  render() {
    return (
      // <div style={{ height: "75vh" }} className="container valign-wrapper">
      <div className="container mt-5">
        <div className="col-md-6 m-auto">
          <div className="card card-body">
            <h3 className="text-center mb-3">
              <b>Technical</b>{' '}
              <span style={{ fontFamily: 'monospace' }}>specifications</span>{' '}
              will be shared on this page
            </h3>
          </div>
          <BlockchainNetworkDetails />
        </div>
      </div>
    )
  }
}

export default Technical
