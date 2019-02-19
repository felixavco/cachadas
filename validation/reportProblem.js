const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports =  (req, res, next) => {

  let { category, subject, message } = req.body

  let errors = {}

  category = !isEmpty(category) ? category : ''
  subject = !isEmpty(subject) ? subject : ''
  message = !isEmpty(message) ? message : ''

  //Name Validation
  if(Validator.isEmpty(category)) {
    errors.category = "Category field is Required"
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