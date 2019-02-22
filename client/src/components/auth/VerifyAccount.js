import React, { Component } from 'react';
import Spinner from '../commons/Spinner';
import PropTypes from 'prop-types'
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { accountVerification } from '../../redux/actions/authActions';

class VerifyAccount extends Component {
	constructor(props) {
		super(props);

		this.state = {
			token: props.match.params.token,
			isLoading: true,
			error: ''
		};
	}

	componentDidMount() {
		let url;
		const { isAuthenticated } = this.props.auth;

		if(isAuthenticated) {
			url = `/api/user/account-verification/${this.state.token}?fx=1`;
		} else  {
			url = `/api/user/account-verification/${this.state.token}?fx=0`
		}

		axios
			.get(url)
			.then((res) => {
				if(isAuthenticated) {
					this.props.accountVerification(res.data);
				}
				this.setState({ isLoading: false }, () => {
					setTimeout(() => { this.props.history.push('/login')}, 2500);
				});
			})
			.catch((err) => {
				this.setState({
					error: err.response.data.error
				});
			});
	}

	render() {
    
    if (this.state.error !== '') {
			return (
				<div className="mt-5 pt-5">
					<h3 className="text-center display-4">
						Verification Falied!
					</h3>
					
					<h3 className="text-center text-danger">
						<i className="fas fa-exclamation-circle fa-2x"/>
					</h3>

					<h6 className="text-center">
						{` Error: ${this.state.error}`}
					</h6>
				</div>
			);
		}

		if (this.state.isLoading) {
			return (
				<div className="my-5">
					<h3 className="text-center display-4">Loading....</h3>
					<Spinner />
				</div>
			);
		}

		return (
			<div className="mt-5 pt-5">
				<h2 className="text-center display-4">
					Your account has been Verified
				</h2>
				<h2 className="text-center display-4 text-success">
					<i className="far fa-check-circle fa-2x"/>
				</h2>
			</div>
		);
		
		}
}

VerifyAccount.proptypes = {
	accountVerification: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps, { accountVerification })(withRouter(VerifyAccount));
