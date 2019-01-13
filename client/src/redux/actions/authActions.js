import axios from 'axios'
import setAuthToken from '../../utils/setAuthToken'
import jwt_decode from 'jwt-decode'

import { GET_ERRORS, SET_CURRENT_USER, EDIT_USER } from './types'

//Register User
export const registerUser = (userData, history) => (dispatch) => {
	axios.post('/api/user/register', userData)
		.then(res => history.push('/login'))
		.catch((err) => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		})
}

//Login - Get user
export const loginUser = userData => (dispatch) => {
	axios
		.post('/api/user/login', userData)
		.then((res) => {
			//Save to Local Storage
			const { token } = res.data
			localStorage.setItem('jwtToken', token)
			//Set token to Auth header
			setAuthToken(token)
			//Decode token to get user Data
			const decodedUser = jwt_decode(token)
			//Set Current user
			dispatch(setCurrentUser(decodedUser))
		})
		.catch((err) => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		})
}

export const editUser = (updatedUser, history) => (dispatch) => {
	axios.post('/api/user/profile', updatedUser)
		.then((res) => {
			dispatch({
				type: EDIT_USER,
				payload: res.data
			})
			if(history) {
				history.push('/profile')
			} else {
				window.location.replace('/profile')
			}
			
		})
		.catch((err) => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		})
}

//Set logged user
export const setCurrentUser = userData => {
	return {
		type: SET_CURRENT_USER,
		payload: userData
	}
}

//Changes the user password
export const changePassword = newPasswordData => dispatch => {
	axios.post('/api/user/change-password', newPasswordData) 
		.then(res => logoutUser())
		.catch(err => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		})
}

export const deleteAccount = data => dispatch => {
	axios.post('/api/user/delete', data)
		.then(res => console.log(res.data))
		.catch(err => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		})
}

export const logoutUser = () => (dispatch) => {
	//remove token from local storage
	localStorage.removeItem('jwtToken')
	//remove Auth header for future request
	setAuthToken(false)
	// Set current user to {} this will set isAuthenticated to false
	dispatch(setCurrentUser({}))
}
