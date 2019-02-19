import React, { Component } from 'react';
import PropTypes from 'prop-types';

//Redux
import { connect } from 'react-redux';

//Components
import ProfileActions from './ProfileActions';
import ProfileAvatar from './ProfileAvatar';

class ProfileTemplate extends Component {
	render() {
		const { user } = this.props.auth;

		return (
			<div className="row mt-4">
				<div className="col-md-3 col-12">
					<ProfileAvatar avatarURL={user.avatar} alt={`Profile picture ${user.firstName} ${user.lastName}`} />
					<hr />
					<ProfileActions />
				</div>
				<div className="col-md-9 col-12">{this.props.children}</div>
			</div>
		);
	}
}

ProfileTemplate.prototypes = {
	auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps)(ProfileTemplate);
