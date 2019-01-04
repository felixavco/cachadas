import React, { Component, Fragment } from 'react';
import './App.css';
import setAuthToken from './utils/setAuthToken'
import jwt_decode from 'jwt-decode'

//React Router
import { BrowserRouter as Router, Route } from 'react-router-dom'

//Redux 
import { Provider } from 'react-redux'
import store from './redux/store'
import { setCurrentUser, logoutUser } from './redux/actions/authActions'

//Components 
import Navbar from './components/layout/Navbar';
import Login from './components/login/Login'
import Register from './components/register/Register'
import Landing from './components/landing/Landing'

//Checks if there is a token 
if(localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken)
  // Decode token and get user info and exp 
  const decoded = jwt_decode(localStorage.jwtToken)
  // set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded))

  //check for expired token
  const currentTime = Date.now() / 1000
  if(decoded.exp < currentTime) {
    //Logout the user 
    store.dispatch(logoutUser())
    // Clear current profile 
    //*****TODO */
    // store.dispatch(clearCurrentProfile())
    //Redirect to login
    window.location.href = '/login'
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={ store } >
        <Router>
          <Fragment>
            <Navbar />
            <div className="container main-cont">
              <Route exact path="/" component={Landing} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </div>
          </Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
