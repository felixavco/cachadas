import React from 'react';
import ProfileTemplate from '../ProfileTemplate'
import ChangePassword from './ChangePassword'
import DeleteAccount from './DeleteAccount'
import Helment from 'react-helmet'

const Settings = () => {
	return (
		<ProfileTemplate>
      <Helment>
				<title>Account Settings</title>
			</Helment>
			<div className="profile-settings">
				<div className="row">
					<div className="col-md-8 col-12 m-auto">
						<h3 className="mt-3 text-center display-4">Settings</h3>
						<hr />
            <ChangePassword/>
            
            <DeleteAccount/>
					</div>
				</div>
			</div>
		</ProfileTemplate>
	);
};

export default Settings;
