import React from 'react'
import PropTypes from 'prop-types'

//Redux
import { connect } from 'react-redux'

//React Router 
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  
  <Route 
    {...rest}
    render = {props => auth.isAuthenticated ? (<Component {...props}/>) : (<Redirect to="/login"/>)}
  />
   
    
  
)

PrivateRoute.proptypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(PrivateRoute)
