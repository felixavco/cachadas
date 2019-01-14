import axios from 'axios'

import { CREATE_POST, GET_ERRORS } from './types'

//Create new Ad (Post)
export const createPost = (postData, history) => dispatch => {
  axios.post('/api/post/create', postData)
    .then(res => history.push('/my-ads'))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
				payload: err.response.data
      })
    })
}
