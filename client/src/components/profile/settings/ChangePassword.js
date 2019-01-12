import React, { Component } from 'react'
import TextFieldGroup from '../../commons/TextFieldGroup'

class ChangePassword extends Component {
	constructor() {
		super()

		this.state = {
			showInput: true,
			showInput2: true,
			showInput3: true,
			currentPassword: '',
			newPassword: '',
			confirmNewPwd: '',
			errors: {}
		}
	}

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value })
		this.inputValidation()
	}

	inputValidation = () => {
		const { currentPassword, newPassword, confirmNewPwd } = this.state
		if(currentPassword.length >= 5 ) {
			this.setState({showInput: false})
			
			if(newPassword.length >=5) {
				this.setState({showInput2: false})

				if(confirmNewPwd.length >= 5) {
					this.setState({showInput3: false})
				} else {
					this.setState({showInput3: true})
				}

			} else {
				this.setState({showInput2: true})
			}

		} else {
			this.setState({showInput: true})
		}
	}

	onChangePassword = (e) => {
		e.preventDefault()

		console.log(this.state)
	}

	render() {
		const { currentPassword, newPassword, confirmNewPwd, errors, showInput, showInput2, showInput3 } = this.state

		return (
			<form className="change-password-form custom-form mx-auto my-5 p-4" onSubmit={this.onChangePassword}>
        <h4 className="mt4 mb-3 text-center">Change Password</h4>
        <div>
          <TextFieldGroup
            placeholder="Enter your current password"
            name="currentPassword"
            type="password"
            value={currentPassword}
            onChange={this.onChange}
            error={errors.currentPassword}
          />
        </div>

        <div className={showInput ? "input-hide" : null}>
          <TextFieldGroup
            placeholder="Enter New Password"
            name="newPassword"
            type="password"
            value={newPassword}
            onChange={this.onChange}
            error={errors.newPassword}
          />
        </div>

				<div className={showInput2 ? "input-hide" : null}>
					<TextFieldGroup
						placeholder="Confirm new Password"
						name="confirmNewPwd"
						type="password"
						value={confirmNewPwd}
						onChange={this.onChange}
						error={errors.confirmNewPwd}
					/>
				</div>
        <div className={showInput3 ? "input-hide" : null}>
          <button type="submit" className="btn btn-primary btn-block">
            Change Password
          </button>
        </div>
			</form>
		)
	}
}

export default ChangePassword
