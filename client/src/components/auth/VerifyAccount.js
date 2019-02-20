import React, { Component } from 'react';
import Spinner from '../commons/Spinner';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

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
		axios
			.get(`/api/user/account-verification/${this.state.token}`)
			.then((res) => {
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
				<div class="mt-5 pt-5">
					<h3 className="text-center display-4">
						Verification Falied!
					</h3>
					
					<h3 className="text-center text-danger">
						<i class="fas fa-exclamation-circle fa-2x"/>
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
					<i class="far fa-check-circle fa-2x"/>
				</h2>
			</div>
		);
		
		}
}

export default withRouter(VerifyAccount);
