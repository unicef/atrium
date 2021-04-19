import { combineReducers } from 'redux'
import main from './main/reducer'

export * from './main'
export const projectsReducer = combineReducers({
  main
})
