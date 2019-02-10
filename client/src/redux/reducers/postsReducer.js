import { MY_POSTS, GET_SINGLE_POST, POSTS_PER_PAGE } from '../actions/types'
import { PostPerPage } from '../actions/postsActions';
// import isEmpty from '../../validation/isEmpty'

const initialState = {
  myPosts: [],
  singlePost: {},
  PostsPerPage: [],
  total_items: 0
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
    
    case POSTS_PER_PAGE:
      return {
        ...state, 
        PostsPerPage: action.payload.posts,
        total_items: action.payload.total_Items
      }
  
    default:
      return state
  }
}