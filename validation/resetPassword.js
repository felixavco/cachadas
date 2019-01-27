const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = (req, res, next) => {

  let { email } = req.body

  let errors = {}

  email = !isEmpty(email) ? email : ''

  //Email Validation
  if(Validator.isEmpty(email)) {
    errors.email = "Email address is required"
  } else if(!Validator.isEmail(email)) {
    errors.email = "Invalid email format"
  }

  if(!isEmpty(errors)) {
    return res.status(400).json(errors)
  }

  req.errors = errors;

  next()

}

