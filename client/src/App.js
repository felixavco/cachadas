import React, { Component, Fragment } from 'react'
import setAuthToken from './utils/setAuthToken'
import jwt_decode from 'jwt-decode'

//React Router
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

//Redux 
import { Provider } from 'react-redux'
import store from './redux/store'
import { setCurrentUser, logoutUser } from './redux/actions/authActions'

//Components 
import Navbar from './components/layout/Navbar';
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Landing from './components/landing/Landing'
import Profile from './components/profile/Profile'
import EditProfile from './components/profile/EditProfile'
import CreateAd from './components/ads/CreateAd'
import MyAds from './components/ads/MyAds'
import WishList from './components/profile/WishList'
import Settings from './components/profile/settings/Settings'
import ResetPassword from './components/auth/ResetPassword';
import ResetPasswordForm from './components/auth/ResetPasswordForm';
//Private Route component
import PrivateRoute from './components/auth/PrivateRoute'
//Not Found page
import NotFound from './components/commons/NotFound'

//**********DELETE LATER **************/
import TEST from './components/TEST/Form'

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
              {/* Public Routes */}
              <Route exact path="/" component={Landing} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/reset-password" component={ResetPassword} />
              <Route exact path="/reset-password/:token" component={ResetPasswordForm} />
              <Route exact path="/test" component={TEST} />

              {/* Private Routes */}
              <Switch>
                <PrivateRoute exact path="/profile" component={Profile} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/edit-profile" component={EditProfile} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/wish-list" component={WishList} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/my-ads" component={MyAds} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/create-ad" component={CreateAd} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/account-settings" component={Settings} />
              </Switch>

              {/* Not Found */}
              <Route exact path="/not-found" component={NotFound} />
              {/* <Redirect from="*" to="/not-found" /> */}
            </div>
          </Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
