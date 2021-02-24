import React, { Component } from 'react'

class Validated extends Component {
  render() {
    return (
      <div className="mt-5">
        <div className="m-auto">
          <div className="card text-white bg-success card-body">
            <h3 className="mb-3 ">UN Agency Validated</h3>
            <div className="card-body">
              <h5 className="card-title">
                UNICEF is a member of the interagency blockchain
              </h5>
              <p className="card-text">
                UNICEF has been a member of the interagency blockchain since
                2019.
              </p>
              <p className="card-text">
                UNICEF has 13 members participating in the interagency
                blockchain.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Validated
