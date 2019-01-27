import { MY_POSTS, GET_SINGLE_POST } from '../actions/types'
// import isEmpty from '../../validation/isEmpty'

const initialState = {
  myPosts: [],
  singlePost: {}
}

export default (state = initialState, action) => {
  switch (action.type) {

    case MY_POSTS:
      return {
        ...state,
        myPosts: action.payload
      }

    case GET_SINGLE_POST:
      return {
        ...state, 
        singlePost: action.payload
      }
  
    default:
      return state
  }
}