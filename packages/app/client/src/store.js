import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

const initialState = {}

const middleware = [thunk]

const storeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION__
  ? compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__()
  )
  : compose(applyMiddleware(...middleware))

const store = createStore(rootReducer, initialState, storeEnhancer)

export default store
