import { combineReducers } from 'redux'
import authReducer from './authReducer'
import githubReducer from './githubReducer'
import twitterReducer from './twitterReducer'
import ethersReducer from './ethersReducer'
import pollReducer from './pollReducer'
import decisionReducer from './decisionReducer'
import errorReducer from './errorReducer'
import learningReducer from './learningReducer'
import discussionReducer from './discussionReducer'
import toast from './toastReducer'
import loader from './loaderReducer'
import { searchReducer } from '../reduxStructures/search'
import { projectsReducer } from '../reduxStructures/projects'
import { usersReducer } from '../reduxStructures/users'

export default combineReducers({
  auth: authReducer,
  decisions: decisionReducer,
  github: githubReducer,
  twitter: twitterReducer,
  ethers: ethersReducer,
  poll: pollReducer,
  projects: projectsReducer,
  errors: errorReducer,
  learning: learningReducer,
  discussions: discussionReducer,
  toast,
  loader,
  search: searchReducer,
  user: usersReducer
})
