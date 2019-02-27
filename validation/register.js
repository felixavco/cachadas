const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports =  (req, res, next) => {

  let { firstName, lastName, email, password, password2 } = req.body

  let errors = {}

  firstName = !isEmpty(firstName) ? firstName : ''
  lastName = !isEmpty(lastName) ? lastName : ''
  email = !isEmpty(email) ? email : ''
  password = !isEmpty(password) ? password : ''
  password2 = !isEmpty(password2) ? password2 : ''

  //First Name Validation
  if(Validator.isEmpty(firstName)) {
    errors.firstName = "First Name is required"
  } else if (!Validator.isLength(firstName, {min: 2, max: 30})) {
    errors.firstName = "First Name must have between 2 and 30 characters"
  }

  //Last Name Validation
  if(Validator.isEmpty(lastName)) {
    errors.lastName = "Last Name is required"
  } else if(!Validator.isLength(lastName, {min: 2, max: 30})) {
    errors.lastName = "Last Name must have between 2 and 30 characters"
  }

  //Email Validation
  if(Validator.isEmpty(email)) {
    errors.email = "Email is required"
  } else if(!Validator.isEmail(email)) {
    errors.email = "Invaild Email format"
  }

  //Password Validation
  if(Validator.isEmpty(password)) {
    errors.password = "Password is required "
  } else if(!Validator.isLength(password, {min:6, max:30})){
    errors.password = "Password must be 6 characters in length"
  }

  if(Validator.isEmpty(password2)) {
    errors.password2 = "Confirm your password"
  } else if(!Validator.equals(password, password2)) {
    errors.password2 = "Passwords don't match"
  }

  if(!isEmpty(errors)) {
    return res.status(400).json(errors)
  }

  req.errors = errors;
  
  next()

}