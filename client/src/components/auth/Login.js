import React, { Component } from 'react'
import PropTypes from 'prop-types'
//Redux
import { connect } from 'react-redux'
import { loginUser } from '../../redux/actions/authActions'
//Router 
import { Link, withRouter } from 'react-router-dom'
//Components 
import TextFieldGroup from '../commons/TextFieldGroup'

class Login extends Component {
  constructor() {
    super()

    this.state = {
      pageTitle: "Login",
      email: '',
      password: '',
      errors: {}
    }
  }

  componentDidMount() {
    if(this.props.auth.isAuthenticated) {
      this.props.history.push('/')
    } else {
      document.title = this.state.pageTitle
    }
  }

  //Set errors from redux to the component state
  componentWillReceiveProps = nextProps => {
    if(nextProps.auth.isAuthenticated){
      this.props.history.push('/profile')
    }

    if(nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
  }

  onSubmit = e => {
    e.preventDefault()
    const { email, password } = this.state
    const userData = { email, password }

    this.props.loginUser(userData)
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value })

  render() {
    const { email, password, pageTitle, errors } = this.state
    
    return (
      <div className="login">
       <div className="row">
        <div className="col-md-6 m-auto">
          <h2 className="display-4 mt-3 text-center">{pageTitle}</h2>
          <form className="custom-form " noValidate onSubmit={this.onSubmit}>
    
            <TextFieldGroup
              placeholder="Email"
              name="email"
              type="email"
              value={email}
              onChange={this.onChange}
              error={errors.email}
						/>

            <TextFieldGroup
              placeholder="Password"
              name="password"
              type="password"
              value={password}
              onChange={this.onChange}
              error={errors.password}
						/>

            <button type="submit" className="btn btn-primary btn-block">{pageTitle} &nbsp;<i className="fas fa-sign-in-alt" /></button>
          </form>
          
          <div className="mt-3">
            <p className="lead">New User? <Link to="/register">Create an Account</Link></p> 
          </div>
          <div className="mt-3">
            <p className="lead">Forgot Password? <Link to="/reset-password">Reset Password</Link></p> 
          </div>
        </div>
       </div>
      </div>
    )
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { loginUser })(withRouter(Login))