import React, { Component } from 'react'
import Helment from 'react-helmet'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

//Redux
import { connect } from 'react-redux'


//Components
import TextFieldGroup from '../commons/TextFieldGroup'
import ProfileTemplate from './ProfileTemplate'

class EditProfile extends Component {
	constructor(props) {
		super(props)

		const { firstName, lastName, public_email, phone, id } = this.props.auth.user

		this.state = {
			id,
			firstName,
			lastName,
			public_email,
			phone,
			errors: {}
		}

	}

	onChange = e => this.setState({ [e.target.name]: e.target.value })

	onSubmit = e => {
		e.preventDefault()
		this.props.history.push('/profile')
		const updatedUser = {...this.state}
		console.log(updatedUser)
	}

	render() {
		const { firstName, lastName, public_email, phone, errors, id } = this.state;
		return (
			<ProfileTemplate>
				<Helment>
					<title>Edit Profile</title>
				</Helment>
				<div className="edit-profile">
					<form className="w-75 mx-auto" onSubmit={this.onSubmit}>
						<h2 className="display-4 text-center mb-2">Edit Profile</h2>

						<TextFieldGroup
							placeholder="First Name"
							name="firstName"
							value={firstName}
							onChange={this.onChange}
							error={errors.firstName}
						/>

						<TextFieldGroup
							placeholder="Last Name"
							name="lastName"
							value={lastName}
							onChange={this.onChange}
							error={errors.lastName}
						/>

						<TextFieldGroup
							placeholder="Public Email"
							name="public_email"
							type="email"
							value={public_email}
							onChange={this.onChange}
							error={errors.public_email}
						/>

						<TextFieldGroup
							placeholder="Phone"
							name="phone"
							value={phone}
							onChange={this.onChange}
							error={errors.phone}
						/>

						<div className="ml-auto">
							<button type="submit" className="btn btn-primary btn-block">
								Save &nbsp;<i className="far fa-save" />
							</button>
						</div>
					</form>
				</div>
			</ProfileTemplate>
		);
	}
}

EditProfile.proptypes = {
	auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	auth: state.auth
})

export default connect(mapStateToProps)(withRouter(EditProfile))
