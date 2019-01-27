const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = (req, res, next) => {

  let { password, password2, token } = req.body

  let errors = {}

  password = !isEmpty(password) ? password : ''
  password2 = !isEmpty(password2) ? password2 : ''
  token = !isEmpty(token) ? token : ''

  //Token Validation  
  if(Validator.isEmpty(token)) {
    error.password = "Invalid Token"
  }

  //New Password Validation
  if(Validator.isEmpty(password)) {
    errors.password = "New password is required"
  } else if(!Validator.isLength(password, {min:6, max:30})){
    errors.password = "Password must have at least 6 characters"
  }

  if(Validator.isEmpty(password2)) {
    errors.password2 = "Confirm your new password"
  } else if(!Validator.equals(password, password2)) {
    errors.password2 = "Passwords don't match"
  }

  if(!isEmpty(errors)) {
    return res.status(400).json(errors)
  }
  
  req.errors = errors;

  next()

}