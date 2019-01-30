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

		const { firstName, lastName, public_email, phone } = this.props.auth.user

		this.state = {
			avatar: null,
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

	onChangeImg = e => this.setState({ [e.target.name]: e.target.files[0]})
	

	onChange = e => this.setState({ [e.target.name]: e.target.value })

	onSubmit = e => {
		e.preventDefault()
		const { avatar, firstName, lastName, public_email, phone } = this.state

		const formData = new FormData()
		formData.append('avatar',avatar)
		formData.append('firstName',firstName)
		formData.append('lastName', lastName)
		formData.append('public_email', public_email)
		formData.append('phone', phone)
		if(!avatar) {
			this.props.editUser(formData, this.props.history)
		} else {
			this.props.editUser(formData, null)
		}
		
	}

	render() {
		const { firstName, lastName, public_email, phone, errors } = this.state;
		return (
			<ProfileTemplate>
				<Helment>
					<title>Edit Profile</title>
				</Helment>
				<div className="edit-profile">
					<h2 className="display-4 text-center mb-2">Edit Profile</h2>
					<div className="d-flex justify-content-center"><small>(*) Required Fields</small></div>
					<form className="w-75 custom-form edit-profile-form mx-auto mt-3 p-4" onSubmit={this.onSubmit} noValidate>
					
						<div className="mb-2">
							<input 
								ref={fileInput => this.fileInput = fileInput} 
								className="d-none" 
								type="file" name="avatar" 
								onChange={this.onChangeImg} 
								accept="image/png, image/jpg, image/jpeg"
							/>
							
							<button 
								onClick={() => this.fileInput.click()} 
								type="button" className="btn btn-primary"
							> 
								Change Profile Picture 
								&nbsp;
								<i className="fas fa-camera-retro"/>
							</button>
  					</div>

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
							value={public_email || ''}
							onChange={this.onChange}
							error={errors.public_email}
						/>
		
						<TextFieldGroup
							label="Phone"
							type="tel"
							name="phone"
							value={phone || ''}
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
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
})

export default connect(mapStateToProps, { editUser })(withRouter(EditProfile))
