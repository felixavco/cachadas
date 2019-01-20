import React, { Component, Fragment } from 'react';
import TextFieldGroup from '../commons/TextFieldGroup';
import Helment from 'react-helmet'

//Router
import { withRouter, Link } from 'react-router-dom';

//Redux
import { connect } from 'react-redux';
import { resetPassword } from '../../redux/actions/authActions';

class ResetPassword extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isActive: false,
			email: '',
			errors: {}
		};
	}

	componentWillReceiveProps = (nextProps) => {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
	};

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value }, () => {
			if (this.state.email.length > 5) {
				this.setState({ isActive: true });
			} else {
				this.setState({ isActive: false });
			}
		});
	};

	onSubmit = (e) => {
		e.preventDefault();
		const data = { email: this.state.email };
		this.props.resetPassword(data, this.props.history);
	};

	render() {
		const { email, errors, isActive } = this.state;
		return (
			<Fragment>
				
				<Helment>
					<title>Reset Password</title>
				</Helment>

				<h2 className="display-4 text-center mt-3">Reset Password</h2>
				<div className="row">
					<div className="col-md-6 col-12 mx-auto">
						<div className="reset-password">
							<form className="custom-form create-ad-form mx-auto mt-3 p-4" onSubmit={this.onSubmit}>
								<TextFieldGroup
									placeholder="Enter your email address"
									name="email"
									type="email"
									value={email}
									onChange={this.onChange}
									error={errors.email}
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

export default connect(mapStateToProps, { resetPassword })(withRouter(ResetPassword));
