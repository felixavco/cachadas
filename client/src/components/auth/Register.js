import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReCAPTCHA from "react-google-recaptcha";
import keys from "../../keys/keys";

//Redux
import { connect } from 'react-redux'
import { registerUser } from '../../redux/actions/authActions'
//Router
import { Link, withRouter } from 'react-router-dom'
//Components
import TextFieldGroup from '../commons/TextFieldGroup'


class Register extends Component {
	constructor() {
		super();

		this.state = {
			isHuman: false,
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

		const { firstName, lastName, email, password, password2, isHuman } = this.state;

		
		if(isHuman) {
			const newUser = { firstName, lastName, email, password, password2 };
			this.props.registerUser(newUser, this.props.history);
		}
	};

	onChange = (e) => this.setState({ [e.target.name]: e.target.value });

	onValidate = value => {
		if(value) {
			this.setState({isHuman: true});
		}
	}

	render() {
		const { errors, firstName, lastName, email, password, password2, isHuman } = this.state;

		let RegistrationBtn;

		if(isHuman){
			RegistrationBtn = (
				<button type="submit" className="btn btn-primary btn-block">
					CREATE ACCOUNT &nbsp;<i className="fas fa-user-circle" />
				</button>
			)
		} else {
			RegistrationBtn = (
				<button type="submit" className="btn btn-primary btn-block" disabled>
					Complete ReCaptcha first! &nbsp;<i className="fas fa-user-circle" />
				</button>
			)
		}

		return (
			<div className="register">
				<div className="row">
					<div className="col-lg-12 m-auto">
						<h2 className="display-4 mt-3 text-center">Sing Up</h2>
						<p className="lead text-center">Create your account</p>
						<div className="d-flex justify-content-center mb-2"><small>All fields are required</small></div>
						<form className="custom-form " noValidate onSubmit={this.onSubmit}>
							<div className="row">
								<div className="col-lg-4 col-12">
									<TextFieldGroup
										placeholder="First Name"
										name="firstName"
										value={firstName}
										onChange={this.onChange}
										error={errors.firstName}
									/>
								</div>
								<div className="col-lg-4 col-12">
									<TextFieldGroup
										placeholder="Last Name"
										name="lastName"
										value={lastName}
										onChange={this.onChange}
										error={errors.lastName}
									/>
								</div>
								<div className="col-lg-4 col-12">
									<TextFieldGroup
										placeholder="Email"
										name="email"
										type="email"
										value={email}
										onChange={this.onChange}
										error={errors.email}
									/>
								</div>
							</div>

							<div className="row">
								<div className="col-lg-8 col-12 m-auto">
									<div className="row">
										<div className="col-lg-6 col-12">
											<TextFieldGroup
												placeholder="Password"
												name="password"
												type="password"
												value={password}
												onChange={this.onChange}
												error={errors.password}
											/>
										</div>
										<div className="col-lg-6 col-12">
											<TextFieldGroup
												placeholder="Confirm Password"
												name="password2"
												type="password"
												value={password2}
												onChange={this.onChange}
												error={errors.password2}
											/>
										</div>
									</div>
								</div>
							</div>

							<div className="d-flex justify-content-center my-3">
								<ReCAPTCHA
									sitekey={keys.SITE_KEY}
									onChange={this.onValidate}
								/>
							</div>
					
							<div className="row">
								<div className="col-lg-4 col-md-6 col-12 mx-auto">
									{ RegistrationBtn }
								</div>
							</div>
						</form>

						<div className="mt-3 d-flex justify-content-center">
            	<p className="lead">Already have an account? <Link to="/login">Login</Link></p> 
          	</div>
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
