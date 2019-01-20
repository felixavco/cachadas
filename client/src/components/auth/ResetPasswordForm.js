import React, { Component, Fragment } from 'react';
import TextFieldGroup from '../commons/TextFieldGroup';
import Helment from 'react-helmet';

//Router
import { withRouter, Link } from 'react-router-dom';

//Redux
import { connect } from 'react-redux';
import { resetPassword } from '../../redux/actions/authActions';

class ResetPasswordForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			token: props.match.params.token,
			isActive: false,
			password: '',
			password2: '',
			errors: {}
		};
	}

	componentWillReceiveProps = (nextProps) => {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
	};

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value }, () => this.inputValidation());
	};

	inputValidation = () => {
		const { password, password2 } = this.state;
		if (password.length > 5 && password2.length > 5) {
			this.setState({ isActive: true });
		} else {
			this.setState({ isActive: true });
		}
	};

	onSubmit = (e) => {
		e.preventDefault();
		const { password, password2, token } = this.state;
		const data = { password, password2, token };
		this.props.resetPassword(data, this.props.history);
	};

	render() {
		const { password, password2, errors, isActive } = this.state;
		return (
			<Fragment>

				<Helment>
					<title>Reset Password</title>
				</Helment>

				<h2 className="display-4 text-center mt-3">Reset Password</h2>
				<div className="d-flex justify-content-center mb-2">
					<small>Password must have at least 6 characters</small>
				</div>
				<div className="row">
					<div className="col-md-6 col-12 mx-auto">
						<div className="reset-password">
							<form className="custom-form create-ad-form mx-auto mt-3 p-4" onSubmit={this.onSubmit}>
								<TextFieldGroup
									placeholder="Enter your new password"
									name="password"
									type="password"
									value={password}
									onChange={this.onChange}
									error={errors.password}
								/>

								<TextFieldGroup
									placeholder="Confirm your password"
									name="password2"
									type="password"
									value={password2}
									onChange={this.onChange}
									error={errors.password2}
								/>

								<div>
									<input
										className="btn btn-primary btn-block"
										type="submit"
										value="Reset Password"
										disabled={!isActive ? 'disabled' : null}
									/>
								</div>
							</form>
							<div className="mt-3">
								<p className="lead">
									New User? <Link to="/register">Create an Account</Link>
								</p>
							</div>
						</div>
					</div>
				</div>
			</Fragment>
		);
	}
}

const mapStateToProps = (state) => ({
	errors: state.errors
});

export default connect(mapStateToProps, { resetPassword })(withRouter(ResetPasswordForm));
