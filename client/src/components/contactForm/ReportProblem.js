import React, { Component, Fragment } from 'react';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';
import keys from '../../keys/keys';
import { problem_descriptions } from '../ads/List_Items/ListsItems';
import Helment from 'react-helmet';

//Components
import TextFieldGroup from '../commons/TextFieldGroup';
import TextAreaFieldGroup from '../commons/TextAreaFieldGroup';
import SelectListGroup from '../commons/SelectListGroup';
import Spinner from '../commons/Spinner';

class ContactForm extends Component {
	constructor() {
		super();

		this.state = {
			isDisabled: true,
			isHuman: false,
			isSending: false,
			subject: '',
			category: '',
			message: '',
			errors: {}
		};
	}

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value }, () => this.onValidation());
	};

	onValidate = (value) => {
		if (value) {
			this.setState({
				isHuman: true
			});
		} else {
			this.setState({
				isHuman: false
			});
		}
	};

	onValidation = () => {
		const { category, subject, message } = this.state;

		if ( category !== '' && subject !== '' && message !== '') {
			this.setState({ isDisabled: false });
		} else {
			this.setState({ isDisabled: true });
		}
	};

	onSubmit = (e) => {
		e.preventDefault();

		const { category, subject, message } = this.state;
		const data = { category, subject, message };

		this.setState({
			isSending: true
		});

		axios
			.post('/api/admin/report-problem', data)
			.then((res) => {
				this.setState({
					isDisabled: true,
					category: '',
					subject: '',
					message: '',
					isSending: false
				});
			})
			.catch((err) => {
				this.setState({
					errors: err.response.data
				});
			});
	};

	render() {
		const { category, subject, message, errors, isDisabled, isHuman, isSending } = this.state;

		let sendBtn;

		let content;

		if (!isDisabled && isHuman) {
			sendBtn = (
				<button className="btn btn-block btn-primary">
					SEND &nbsp; <i class="far fa-envelope" />
				</button>
			);
		} else {
			sendBtn = (
				<button className="btn btn-block btn-primary" disabled>
					SEND &nbsp; <i class="far fa-envelope" />
				</button>
			);
		}

		if (!isSending) {
			content = (
				<Fragment>

					<SelectListGroup
						name="category"
						value={category}
						onChange={this.onChange}
						options={problem_descriptions}
					/>

					<TextFieldGroup
						placeholder="* Subject"
						name="subject"
						value={subject}
						onChange={this.onChange}
						error={errors.subject}
					/>

					<TextAreaFieldGroup
						placeholder="* Message"
						name="message"
						value={message}
						onChange={this.onChange}
						error={errors.message}
					/>

					<div className="d-flex justify-content-center my-2">
						<ReCAPTCHA sitekey={keys.SITE_KEY} onChange={this.onValidate} />
					</div>
				</Fragment>
			);
		} else {
			content = (
				<div className="my-5">
					<h3 className="text-center display-4">Sending....</h3>
					<Spinner />
				</div>
			);
		}

		return (
			<form className="p-5 custom-form" onSubmit={this.onSubmit}>
				<Helment>
					<title>Report a Problem</title>
				</Helment>
				<h1 className="display-4 text-center mb-1">Report a problem</h1>
				<div className="d-flex justify-content-center">
					<small className="mb-3">* All fields are required</small>
				</div>
				<div className="row">
					<div className="col-lg-8 col-12 mx-auto">
						{content}

						<hr />

						<div className="d-flex justify-content-center col-lg-6 col-12 mx-auto">{sendBtn}</div>
					</div>
				</div>
			</form>
		);
	}
}

export default ContactForm;
