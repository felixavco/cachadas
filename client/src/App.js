import React, { Component, Fragment } from 'react';
import setAuthToken from './utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import './styles/App.css';

//React Router
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

//Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { setCurrentUser, logoutUser, clearCurrentProfile } from './redux/actions/authActions';

//Components
//Private Route component
import PrivateRoute from './components/auth/PrivateRoute';
//Not Found page
import NotFound from './components/commons/NotFound';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Login from './components/auth/Login';
import VerifyAccount from './components/auth/VerifyAccount';
import Register from './components/auth/Register';
import Landing from './components/landing/Landing';
import Profile from './components/profile/Profile';
import EditProfile from './components/profile/EditProfile';
import CreateAd from './components/ads/createAd/CreateAd';
import MyAds from './components/ads/myAds/MyAds';
import Settings from './components/profile/settings/Settings';
import ResetPassword from './components/auth/ResetPassword';
import ResetPasswordForm from './components/auth/ResetPasswordForm';
import SingleAd from './components/ads/singleAd/SingleAd';
import EditAd from './components/ads/editAd/EditAd';
import ContactForm from './components/contactForm/ContactForm';
import About from './components/contactForm/About';
import ReportProblem from './components/contactForm/ReportProblem';

//Checks if there is a token
if (localStorage.jwtToken) {
	// Set auth token header auth
	setAuthToken(localStorage.jwtToken);
	// Decode token and get user info and exp
	const decoded = jwt_decode(localStorage.jwtToken);
	// set user and isAuthenticated
	store.dispatch(setCurrentUser(decoded));

	//check for expired token
	const currentTime = Date.now() / 1000;
	if (decoded.exp < currentTime) {
		//Logout the user
		store.dispatch(logoutUser());
		// Clear current profile
		store.dispatch(clearCurrentProfile());
		//Redirect to login
		window.location.href = '/login';
	}
}

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<Fragment>
						<Navbar />
						<div className="container main-cont">
							<Switch>
								{/* Public Routes */}
								<Route exact path="/" component={Landing} />
								<Route exact path="/register" component={Register} />
								<Route exact path="/login" component={Login} />
								<Route exact path="/reset-password" component={ResetPassword} />
								<Route exact path="/reset-password/:token" component={ResetPasswordForm} />
								<Route exact path="/post/:postId" component={SingleAd} />
								<Route exact path="/contact-us" component={ContactForm} />
								<Route exact path="/report-problem" component={ReportProblem} />
								<Route exact path="/about-us" component={About} />
								<Route exact path="/account-verification/:token" component={VerifyAccount} />
								{/* Private Routes */}
								<PrivateRoute exact path="/profile" component={Profile} />
								<PrivateRoute exact path="/edit-profile" component={EditProfile} />
								<PrivateRoute exact path="/my-ads" component={MyAds} />
								<PrivateRoute exact path="/create-ad" component={CreateAd} />
								<PrivateRoute exact path="/account-settings" component={Settings} />
								<PrivateRoute exact path="/post/edit/:postId" component={EditAd} />
								{/* CatchAll route  404 page */}
								<Route exact path="/not-found" component={NotFound} />
								<Redirect to="/not-found" />
							</Switch>
						</div>
						<Footer />
					</Fragment>
				</Router>
			</Provider>
		);
	}
}

export default App;
