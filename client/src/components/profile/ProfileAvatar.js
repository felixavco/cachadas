import React from 'react';
import Proptypes from 'prop-types'

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

ProfileAvatar.proptypes = {
	avatarURL: Proptypes.string.isRequired,
	alt: Proptypes.string.isRequired
}

export default ProfileAvatar;
