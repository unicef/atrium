import main from './main/reducer'
import view from './view/reducer'
import { combineReducers } from 'redux'

export * from './main'
export * from './view'

export const projectsReducer = combineReducers({
  main,
  view
})
