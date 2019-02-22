import { SET_CURRENT_USER, EDIT_USER, VERIFIED } from '../actions/types'
import isEmpty from '../../validation/isEmpty'

const initialState = {
  isAuthenticated: false, 
  user: {}
}

export default (state = initialState, action) => {
  switch (action.type) {

    case EDIT_USER:
      return {
        ...state,
        user: action.payload
      }
    
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      }
    
    case VERIFIED:
      return {
        ...state,
        user: {...state.user, isVerified: action.payload}
      }
  
    default:
      return state
  }
}