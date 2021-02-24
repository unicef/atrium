import axios from 'axios'

import {
  GET_ERRORS,
  SET_RECENT_TWEETS,
  SET_TWITTER_HANDLE_FOR_USER
} from './types'
require('dotenv').config()
// Add user to UNIN GitHub
export const followOrgOnTwitter = (twitterData, history) => dispatch => {
  axios
    .post('twitter/add', twitterData)
    .then(res => {
      dispatch(setTwitterHandle(res.data.twitterHandle))
      // window.location.reload();
      return history.push('/twitter')
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    })
}

// List pending and active users from UNIN GitHub (might need a reducer / type thing here)
export const listTweetsFromTwitterOrg = twitterData => dispatch => {
  axios
    .get('twitter/', twitterData)
    .then(res => {
      dispatch(setRecentTweets(res.data.tweetsForClient))
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      })
    )
}

export const setRecentTweets = tweets => {
  return {
    type: SET_RECENT_TWEETS,
    payload: tweets
  }
}

export const setTwitterHandle = twitterHandle => {
  return {
    type: SET_TWITTER_HANDLE_FOR_USER,
    payload: twitterHandle
  }
}
