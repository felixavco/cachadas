import React, { Component, Fragment } from 'react';
import TextFieldGroup from '../../commons/TextFieldGroup'

class DeleteAccount extends Component {
  constructor() {
    super()
    this.state = {
      password: '',
      isActive: false,
      errors: {}
    }

  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
    this.validateInput()
  }

  validateInput = () => {
    if(this.state.password.length >= 5) {
      this.setState({isActive: true})
    } else {
      this.setState({isActive: false})
    }
  }

  clearForm = () => {
    this.setState({
      password: '',
      isActive: false
    })
  }
  
  onSubmit = () => {
    console.log("ACCOUNT DELETED :(")
  }

	render() {

    const { password, errors, isActive } =this.state

		return (
			<Fragment>
				<div className="mt-5 p-4 delete-account">
					<h4 className="mb-4 text-center">Delete Account</h4>
					<div className="d-flex justify-content-center">
						<button className="btn btn-danger" data-toggle="modal" data-target="#exampleModal">
							DELETE YOUR ACCOUNT
						</button>
					</div>
				</div>

				<div className="modal fade" id="exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title text-center" id="exampleModalLabel">
									Enter Your Password
								</h5>
								<button onClick={this.clearForm} type="button" className="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div className="modal-body">
                <form className="custom-form mx-auto w-75">

                <TextFieldGroup
                  placeholder="Enter your current password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={this.onChange}
                  error={errors.currentPassword}
                />

                </form>
              </div>
							<div className="modal-footer">
								<button onClick={this.clearForm} type="button" className="btn btn-primary" data-dismiss="modal">
									Close
								</button>
								<button onClick={this.onSubmit} type="button" className="btn btn-danger" disabled={!isActive ? "disabled" : null}>
									DELETE ACCOUNT
								</button>
							</div>
						</div>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default DeleteAccount;
