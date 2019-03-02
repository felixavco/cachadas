import React from 'react';
import PropTypes from 'prop-types'

const ProfileAvatar = props => {
	return (
		<div>
			<div className="profile-img-cont mx-auto">
				<img
					className="rounded-circle"
					src={props.avatarURL}
					alt={props.alt}
				/>
			</div>
		</div>
	);
};

ProfileAvatar.propTypes = {
	avatarURL: Proptypes.string.isRequired,
	alt: PropTypes.string.isRequired
}

export default ProfileAvatar;
