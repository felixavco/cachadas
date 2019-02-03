import React, { Component } from 'react';
import axios from 'axios';
import ReCAPTCHA from "react-google-recaptcha";
import keys from "../../keys/keys";

//Components
import TextFieldGroup from '../commons/TextFieldGroup';
import TextAreaFieldGroup from '../commons/TextAreaFieldGroup';

class ContactForm extends Component {
	constructor() {
		super();

		this.state = {
      isDisabled: true,
      isHuman: false,
			name: '',
			email: '',
			subject: '',
			message: '',
			errors: {}
    };
    
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value }, () => this.onValidation())
  };

  onValidate = value => {
    if (value) {
      this.setState({
        isHuman: true
      })
    } else {
      this.setState({
        isHuman: false
      })
    }
  }

  onValidation = () => {

    const { name, email, subject, message } = this.state;

    if (
      name !== "" &&
      email !== "" &&
      subject !== "" &&
      message !== ""
    ) {
      this.setState({isDisabled: false})
    } else {
      this.setState({isDisabled: true})
    }

  }
  
  onSubmit = e => {

    e.preventDefault()

    const { name, email, subject, message } = this.state;
    const data = { name, email, subject, message }

    axios
      .post('/api/admin/contact', data)
      .then(res => {
        this.setState({
          isDisabled: true,
          name: '',
          email: '',
          subject: '',
          message: '',
        })
      })
      .catch(err => {
        this.setState({
          errors: err.response.data
        })
      })
  }

	render() {
    const { name, email, subject, message, errors, isDisabled, isHuman } = this.state;

    let sendBtn;

    if(!isDisabled && isHuman){
      sendBtn = <button className="btn btn-block btn-primary">SEND &nbsp; <i class="far fa-envelope"/></button>
    } else {
      sendBtn = <button className="btn btn-block btn-primary" disabled>SEND &nbsp; <i class="far fa-envelope"/></button>
    }

		return (
			<form className="p-5" onSubmit={this.onSubmit}>
				<h1 className="display-4 text-center mb-1">Contact Us</h1>
        <div className="d-flex justify-content-center">
          <small className="mb-3">* All fields are required</small>
        </div>
				<div className="row">
					<div className="col-lg-8 col-12 mx-auto">
						<div className="row">
							<div className="col-md-6 col-12">
								<TextFieldGroup
									placeholder="* Name"
									name="name"
									value={name}
									onChange={this.onChange}
									error={errors.name}
								/>
							</div>
							<div className="col-md-6 col-12">
								<TextFieldGroup
									placeholder="* Email"
                  name="email"
                  type="email"
									value={email}
									onChange={this.onChange}
									error={errors.email}
								/>
							</div>
						</div>
          
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
              <ReCAPTCHA
                sitekey={keys.SITE_KEY}
                onChange={this.onValidate}
              />
            </div>

            <hr/>

            <div className="d-flex justify-content-center col-lg-6 col-12 mx-auto">
              { sendBtn }
            </div>
          </div>
				</div>
			</form>
		);
	}
}

export default ContactForm;
