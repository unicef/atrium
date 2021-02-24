import {
  SET_RECENT_TWEETS,
  SET_TWITTER_HANDLE_FOR_USER
} from '../actions/types'

const initialState = {
  tweets: [],
  twitterHandle: ''
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_RECENT_TWEETS:
      return {
        ...state,
        tweets: action.payload
      }
    case SET_TWITTER_HANDLE_FOR_USER:
      return {
        ...state,
        twitterHandle: action.payload
      }

    default:
      return state
  }
}
