import React, { Component } from 'react'
import Helment from 'react-helmet'
import PropTypes from 'prop-types'

//Router
import { withRouter } from 'react-router-dom'

//Redux
import { connect } from 'react-redux'
import { editUser } from '../../redux/actions/authActions'

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

	componentWillReceiveProps = nextProps => {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
	}

	onChange = e => this.setState({ [e.target.name]: e.target.value })

	onSubmit = e => {
		e.preventDefault()
		const updatedUser = {...this.state}
		this.props.editUser(updatedUser, this.props.history)
	}

	render() {
		const { firstName, lastName, public_email, phone, errors } = this.state;
		return (
			<ProfileTemplate>
				<Helment>
					<title>Edit Profile</title>
				</Helment>
				<div className="edit-profile">
					<form className="w-75 mx-auto" onSubmit={this.onSubmit} noValidate>
						<h2 className="display-4 text-center mb-2">Edit Profile</h2>
						<div className="d-flex justify-content-center"><small>(*) Required Fields</small></div>
						<TextFieldGroup
							label="* First Name"
							name="firstName"
							value={firstName}
							onChange={this.onChange}
							error={errors.firstName}
						/>

						<TextFieldGroup
							label="* Last Name"
							name="lastName"
							value={lastName}
							onChange={this.onChange}
							error={errors.lastName}
						/>

						<TextFieldGroup
							label="Public Email"
							name="public_email"
							type="email"
							value={public_email}
							onChange={this.onChange}
							error={errors.public_email}
						/>
		
						<TextFieldGroup
							label="Phone"
							type="tel"
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
	editUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
})

export default connect(mapStateToProps, { editUser })(withRouter(EditProfile))
