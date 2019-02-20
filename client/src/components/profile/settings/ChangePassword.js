import React, { Component } from 'react'
import TextFieldGroup from '../../commons/TextFieldGroup'
import PropTypes from 'prop-types'

//Redux
import { connect } from 'react-redux'
import { changePassword } from '../../../redux/actions/authActions'

class ChangePassword extends Component {
	constructor(props) {
		super(props)

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

	componentWillReceiveProps = nextProps => {
		if(nextProps.errors) {
			this.setState({errors: nextProps.errors})
		}
	}

	onChange = e => {
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

	onChangePassword = e => {
		e.preventDefault()
		const { currentPassword, newPassword, confirmNewPwd } = this.state
		const newPasswordData = { currentPassword, newPassword, confirmNewPwd }
		this.props.changePassword(newPasswordData)
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
				<small>
					<strong>
						<i class="fas fa-exclamation-triangle"/>&nbsp;
						Note:
					</strong> 
					You will be automatically sign out! after changing your password
				</small>
			</form>
		)
	}
}

ChangePassword.proptypes = {
	errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	errors: state.errors
})

export default connect(mapStateToProps, { changePassword })(ChangePassword)
