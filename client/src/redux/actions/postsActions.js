import axios from 'axios'

import { MY_POSTS, GET_SINGLE_POST, GET_ERRORS, POSTS_PER_PAGE } from './types'

//Load Posts per page 
export const loadAllPosts = (page, query, category) => dispatch => {

  axios
    .get(`/api/post/?page=${page}&search=${query || 'none'}&category=${category}`)
    .then(res => {
      dispatch({
        type: POSTS_PER_PAGE,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
				payload: err.response.data
      })
    })
}

//Create new Ad (Post)
export const createPost = (postData, history) => dispatch => {
  axios
    .post('/api/post/create', postData)
    .then(res => history.push('/my-ads'))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
				payload: err.response.data
      })
    })
}

//Edit Post 
export const editPost = (postData, history) => dispatch => {
  axios
    .post('/api/post/edit', postData)
    .then(res => history.push(`/post/${res.data.updated}?origin=my-ads`))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
				payload: err.response.data
      })
    })
}

//Return single post (ad)
export const getSinglePost = (postId) => dispatch => {
    axios
    .post('/api/post/single', postId)
    .then(res => {
      dispatch({
        type: GET_SINGLE_POST,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
}

//Loads post (ads) owned by the user
export const loadMyPosts = () => dispatch => {
  axios
    .get('/api/post/my-ads')
    .then(res => {
      dispatch({
        type: MY_POSTS,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
				payload: err.response.data
      })
    })

}


export const deletePost = (id, newMyPosts) => dispatch => {
  axios
    .post('/api/post/delete', id)
    .then(res => {
      dispatch({
        type: MY_POSTS,
        payload: newMyPosts
      })
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
}
