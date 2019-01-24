import axios from 'axios'

import { MY_POSTS, GET_ERRORS } from './types'

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
