const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports =  (req, res, next) => {

  let { name, email, subject, message } = req.body

  let errors = {}

  name = !isEmpty(name) ? name : ''
  email = !isEmpty(email) ? email : ''
  subject = !isEmpty(subject) ? subject : ''
  message = !isEmpty(message) ? message : ''

  //Name Validation
  if(Validator.isEmpty(name)) {
    errors.name = "Name field is Required"
  } else if (!Validator.isLength(name, {min: 2, max: 30})) {
    errors.name = "Name must have between 2 and 30 chars"
  }

  //Email Validation
  if(Validator.isEmpty(email)) {
    errors.email = "Email is Required"
  } else if(!Validator.isEmail(email)) {
    errors.email = "Invalid email format"
  }

   //Name Validation
   if(Validator.isEmpty(subject)) {
    errors.subject = "Subject field is Required"
  } else if (!Validator.isLength(subject, {min: 6, max: 60})) {
    errors.subject = "Subject must have between 6 and 60 chars"
  }

   //message Validation
   if(Validator.isEmpty(message)) {
    errors.message = "Message field is Required"
  } else if (!Validator.isLength(message, {min: 20, max: 500})) {
    errors.message = "Message must have between 20 and 500 chars"
  }

  if(!isEmpty(errors)) {
    return res.status(400).json(errors)
  }

  req.errors = errors;
  
  next()

}