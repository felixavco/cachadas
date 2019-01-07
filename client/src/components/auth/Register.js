import React, { Component } from 'react'
import PropTypes from 'prop-types'
//Redux
import { connect } from 'react-redux'
import { registerUser } from '../../redux/actions/authActions'
//Router
import { withRouter } from 'react-router-dom'
//Components
import TextFieldGroup from '../commons/TextFieldGroup'
import GoogleBtn from './GoogleBtn'


class Register extends Component {
	constructor() {
		super();

		this.state = {
			pageTitle: 'Register',
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			password2: '',
			errors: {}
		};
	}

	componentDidMount() {
		if (this.props.auth.isAuthenticated) {
			this.props.history.push('/');
		} else {
			document.title = this.state.pageTitle;
		}
	}

	//Set errors from redux to the component state
	componentWillReceiveProps = nextProps => {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
	}

	onSubmit = (e) => {
		e.preventDefault();
		const { firstName, lastName, email, password, password2 } = this.state;
		const newUser = { firstName, lastName, email, password, password2 };

		this.props.registerUser(newUser, this.props.history);
	};

	onChange = (e) => this.setState({ [e.target.name]: e.target.value });

	render() {
		const { errors, firstName, lastName, email, password, password2 } = this.state;

		return (
			<div className="register">
				<div className="row">
					<div className="col-md-6 m-auto">
						<h2 className="display-4 mt-3 text-center">Sing Up</h2>
						<p className="lead text-center">Create your account</p>
						<div className="d-flex justify-content-center mb-2"><small>All fields are required</small></div>
						<form noValidate onSubmit={this.onSubmit}>
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
								placeholder="Email"
								name="email"
								type="email"
								value={email}
								onChange={this.onChange}
								error={errors.email}
							/>

							<TextFieldGroup
								placeholder="Password"
								name="password"
								type="password"
								value={password}
								onChange={this.onChange}
								error={errors.password}
							/>

							<TextFieldGroup
								placeholder="Confirm Password"
								name="password2"
								type="password"
								value={password2}
								onChange={this.onChange}
								error={errors.password2}
							/>

							<button type="submit" className="btn btn-primary btn-block">
								Create Account &nbsp;<i className="fas fa-user-circle" />
							</button>
						</form>
						<GoogleBtn />
					</div>
				</div>
			</div>
		);
	}
}

Register.propTypes = {
	registerUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
