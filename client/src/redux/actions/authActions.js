import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import { GET_ERRORS, SET_CURRENT_USER, EDIT_USER } from './types';

//Register User
export const registerUser = (userData, history) => (dispatch) => {
	axios.post('/api/user/register', userData).then((res) => history.push('/login')).catch((err) => {
		dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		});
	});
};

export const accountVerification = (data) => (dispatch) => {
	const { token } = data;
	localStorage.setItem('jwtToken', token);
	//Set token to Auth header
	setAuthToken(token);
	//Decode token to get user Data
	const decodedUser = jwt_decode(token);
	//Set Current user
	dispatch(setCurrentUser(decodedUser));
};

//Login - Get user
export const loginUser = (userData) => (dispatch) => {
	axios
		.post('/api/user/login', userData)
		.then((res) => {
			//Save to Local Storage
			const { token } = res.data;
			localStorage.setItem('jwtToken', token);
			//Set token to Auth header
			setAuthToken(token);
			//Decode token to get user Data
			const decodedUser = jwt_decode(token);
			//Set Current user
			dispatch(setCurrentUser(decodedUser));
		})
		.catch((err) => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			});
		});
};

//Edit user information
export const editUser = (updatedUser, history) => (dispatch) => {
	axios
		.post('/api/user/profile', updatedUser)
		.then((res) => {
			dispatch({
				type: EDIT_USER,
				payload: res.data
			});
			if (history) {
				history.push('/profile');
			} else {
				window.location.replace('/profile');
			}
		})
		.catch((err) => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			});
		});
};

//Set logged user
export const setCurrentUser = (userData) => {
	return {
		type: SET_CURRENT_USER,
		payload: userData
	};
};

export const logoutUser = () => (dispatch) => {
	//remove token from local storage
	localStorage.removeItem('jwtToken');
	//remove Auth header for future request
	setAuthToken(false);
	// Set current user to {} this will set isAuthenticated to false
	dispatch(setCurrentUser({}));
};

export const clearCurrentProfile = () => (dispatch) => {
	dispatch(setCurrentUser({}));
};

//Changes the user password (from account settings when the user knows the current password)
export const changePassword = (newPasswordData) => (dispatch) => {
	axios
		.post('/api/user/change-password', newPasswordData)
		.then((res) => {
			localStorage.removeItem('jwtToken');
			setAuthToken(false);
			dispatch(setCurrentUser({}));
		})
		.catch((err) => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			});
		});
};

//Reset user Password (when the user forgot the password and cannot login)
export const resetPassword = (data, history) => (dispatch) => {
	if (data.email) {
		axios.post('/api/user/reset-password', data).then((res) => history.push('/login')).catch((err) => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			});
		});
	} else {
		axios.put('/api/user/reset-password', data).then((res) => history.push('/login')).catch((err) => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			});
		});
	}
};

export const deleteAccount = (data) => (dispatch) => {
	axios
		.post('/api/user/delete', data)
		.then((res) => {
			localStorage.removeItem('jwtToken');
			setAuthToken(false);
			dispatch(setCurrentUser({}));
			window.location.replace('/login');
		})
		.catch((err) => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			});
		});
};
