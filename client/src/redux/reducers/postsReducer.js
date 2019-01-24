import { MY_POSTS } from '../actions/types'
import isEmpty from '../../validation/isEmpty'

const initialState = {
  myPosts: []
}

export default (state = initialState, action) => {
  switch (action.type) {

    case MY_POSTS:
      return {
        ...state,
        myPosts: action.payload
      }
    break
  
    default:
      return state
  }
}