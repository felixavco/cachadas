import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

//Router
import { NavLink } from 'react-router-dom';
//Redux
import { connect } from 'react-redux';
import { logoutUser } from '../../redux/actions/authActions';

//component
import Avatar from './Avatar'
class Navbar extends Component {

	onLogoutClick = () => this.props.logoutUser()
	
	render() {
		const { isAuthenticated, user } = this.props.auth
		let content = '';

		if (!isAuthenticated) {
			content = (
				<Fragment>
					<li className="nav-item">
						<NavLink activeClassName="active" className="nav-link" to="/login">
							Login <i className="fas fa-sign-in-alt"/> 
						</NavLink>
					</li>
				</Fragment>
			);
		} else {
			content = (
				<Avatar 
					name={`${user.firstName} ${user.lastName}`}
					avatarImg={user.avatar}
					onClick={this.onLogoutClick}
				/>
			)
		}

		return (
			<nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
				<div className="container">
					<NavLink className="navbar-brand" to="/">
						Cachadas SV
					</NavLink>

					<button
						className="navbar-toggler"
						type="button"
						data-toggle="collapse"
						data-target="#navbarNav"
						aria-controls="navbarNav"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon" />
					</button>

					<div className="collapse navbar-collapse" id="navbarNav">
						<ul className="navbar-nav ml-auto">{content}</ul>
					</div>
				</div>
			</nav>
		);
	}
}

Navbar.prototypes = {
	logoutUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
