import axios from 'axios'

import { GET_ERRORS, SET_BLOCKCHAIN_BLOCK_NUMBER } from './types'
require('dotenv').config()

// List pending and active users from UNIN GitHub (might need a reducer / type thing here)
export const getBlockchainBlockNumber = () => dispatch => {
  axios
    .get('ethers/network-details')
    .then(res => {
      dispatch(setBlockchainNetworkBlock(res.data.lastBlock))
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      })
    )
}

export const setBlockchainNetworkBlock = blockNumber => {
  return {
    type: SET_BLOCKCHAIN_BLOCK_NUMBER,
    payload: blockNumber
  }
}
