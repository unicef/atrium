import axios from 'axios'
import { GET_ERRORS, SET_BLOCKCHAIN_DECISIONS } from './types'
require('dotenv').config()

// List pending and active users from UNIN GitHub (might need a reducer / type thing here)
export const getBlockchainDecisions = user_id => dispatch => {
  console.log(user_id, 'Decisions are being received!')
  axios
    .get(`decisions/${user_id}`)
    .then(res => {
      console.log('It all worked out!')
      console.log(res)
      dispatch(setBlockchainDecisions(res.data))
    })
    .catch(err => {
      console.log('Error received:', err)
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      })
    })
}

export const setBlockchainDecisions = decisions => {
  return {
    type: SET_BLOCKCHAIN_DECISIONS,
    payload: decisions
  }
}
