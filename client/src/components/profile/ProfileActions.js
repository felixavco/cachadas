import React from 'react';
import { NavLink } from 'react-router-dom';

const ProfileActions = () => {
	return (
		<div className="profile-actions">
			<NavLink activeClassName="active" to="/profile" className="btn btn-outline-primary btn-block mb-3">
				Profile &nbsp; <i className="fas fa-user-alt" />
			</NavLink>
			<NavLink activeClassName="active" to="/edit-profile" className="btn btn-outline-primary btn-block mb-3">
				Edit Profile &nbsp; <i className="fas fa-user-edit" />
			</NavLink>
			<NavLink to="/my-ads" className="btn btn-outline-primary btn-block mb-3">
				My Ads &nbsp; <i className="fab fa-adversal" />
			</NavLink>
			<NavLink to="/create-ad" className="btn btn-outline-primary btn-block mb-3">
				Create an Add &nbsp; <i className="fas fa-bullhorn" />
			</NavLink>
			<NavLink to="/account-settings" className="btn btn-outline-primary btn-block mb-3">
				Settings &nbsp; <i className="fas fa-cog" />
			</NavLink>
		</div>
	);
};

export default ProfileActions;
