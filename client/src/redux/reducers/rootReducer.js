import { combineReducers } from 'redux'
import authReducer from './authReducer'
import postsReducer from './postsReducer'
import errorReducer from './errorReducer'



export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  posts: postsReducer
})