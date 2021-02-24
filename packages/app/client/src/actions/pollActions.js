import axios from 'axios'

import {
  GET_ERRORS,
  SET_ACTIVE_POLLS,
  SET_CLOSED_OR_VOTED_ON_POLLS
} from './types'
require('dotenv').config()
export const createPoll = formData => async dispatch => {
  return axios
    .post('polls/', formData)
    .then(res => res.data)
    .catch(err => {
      throw err.response
    })
}

export const getActivePolls = () => async dispatch => {
  return axios
    .get('polls/')
    .then(res => {
      dispatch(setActivePolls(res.data.polls))
    })
    .catch(err => {
      throw err.response
    })
}
export const getClosedOrVotedOnPolls = userId => async dispatch => {
  return axios
    .get(`polls/votedOn/${userId}`)
    .then(res => {
      dispatch(setClosedOrVotedOnPolls(res.data.polls))
    })
    .catch(err => {
      throw err.response
    })
}
export const voteOnActivePoll = (pollId, formData) => async dispatch => {
  return axios
    .post(`polls/${pollId}/vote`, formData)
    .then(res => {
      dispatch(getClosedOrVotedOnPolls(formData.user))
      return res.data
    })
    .catch(err => {
      throw err.response
    })
}

export const addPollToCreateBlockchainParticipant = (
  data,
  history
) => dispatch => {
  axios
    .post('polls/', data)
    .then(res => {
      // Might need to add the poll to a reducer
      return history.push('/decisions')
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      })
    })
}
export const addPollToCreateBlockchainGovernor = (
  data,
  history
) => dispatch => {
  axios
    .post('polls/', data)
    .then(res => {
      // Might need to add the poll to a reducer
      return history.push('/decisions')
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      })
    })
}

export const listActivePolls = activePolls => dispatch => {
  axios
    .get('polls/', activePolls)
    .then(res => {
      dispatch(setActivePolls(res.data.polls))
    })
    .catch(err => {
      console.log(err)
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      })
    })
}

export const setActivePolls = activePolls => {
  return {
    type: SET_ACTIVE_POLLS,
    payload: activePolls
  }
}

export const setClosedOrVotedOnPolls = closedOrVotedOnPolls => {
  return {
    type: SET_CLOSED_OR_VOTED_ON_POLLS,
    payload: closedOrVotedOnPolls
  }
}
export const voteOnSpecificPoll = (data, history) => dispatch => {
  // should be poll id and user id
  console.log(data)
  axios
    .post(`polls/${data.pollId}/vote`, data)
    .then(res => {
      // Might need to add the poll to a reducer
      return history.push('/decisions')
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      })
    })
}

export const endSpecificPoll = (pollId, userName, history) => dispatch => {
  // should be poll id and user id
  console.log(pollId, userName)
  axios
    .post(`polls/completed/${pollId}`, {
      userName
    })
    .then(() => {
      // Might need to add the poll to a reducer
      console.log('Poll has returned successfully!')
      return history.push('/decisions')
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      })
    })
}
