const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = (req, res, next) => {

  let {email, password} = req.body

  let errors = {}

  email = !isEmpty(email) ? email : ''
  password = !isEmpty(password) ? password : ''

  //Email Validation
  if(Validator.isEmpty(email)) {
    errors.email = "Enter your email address"
  } else if(!Validator.isEmail(email)) {
    errors.email = "Invalid Email format"
  }

  //Password Validation
  if(Validator.isEmpty(password)) {
    errors.password = "Enter your password"
  } else if(!Validator.isLength(password, {min:6, max:30})){
    errors.password = "Incorrect Password"
  }

  if(!isEmpty(errors)) {
    return res.status(400).json(errors)
  }

  req.errors = errors;

  next()

}