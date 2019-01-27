const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = (req, res, next) => {

  let { password } = req.body

  let errors = {}

  password = !isEmpty(password) ? password : ''

  //Password Validation
  if(Validator.isEmpty(password)) {
    errors.password = "Password Required"
  } else if(!Validator.isLength(password, {min:6, max:30})){
    errors.password = "Invalid Password"
  }

  if(!isEmpty(errors)) {
    return res.status(400).json(errors)
  }

  req.errors = errors;

  next()

}