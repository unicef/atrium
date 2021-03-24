import { combineReducers } from 'redux'
import authReducer from './authReducer'
import githubReducer from './githubReducer'
import twitterReducer from './twitterReducer'
import ethersReducer from './ethersReducer'
import pollReducer from './pollReducer'
import decisionReducer from './decisionReducer'
import errorReducer from './errorReducer'
import projectReducer from './projectReducer'
import learningReducer from './learningReducer'
import discussionReducer from './discussionReducer'
import alert from './alertReducer'

export default combineReducers({
  auth: authReducer,
  decisions: decisionReducer,
  github: githubReducer,
  twitter: twitterReducer,
  ethers: ethersReducer,
  poll: pollReducer,
  projects: projectReducer,
  errors: errorReducer,
  learning: learningReducer,
  discussions: discussionReducer,
  alert
})
