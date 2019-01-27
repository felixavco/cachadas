const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = (req, res, next) => {

  let {currentPassword, newPassword, confirmNewPwd} = req.body

  let errors = {}

  currentPassword = !isEmpty(currentPassword) ? currentPassword : ''
  newPassword = !isEmpty(newPassword) ? newPassword : ''
  confirmNewPwd = !isEmpty(confirmNewPwd) ? confirmNewPwd : ''

  //Current Password Validation
  if(Validator.isEmpty(currentPassword)) {
    errors.currentPassword = "Current password is required"
  } else if(!Validator.isLength(currentPassword, {min:6, max:30})){
    errors.currentPassword = "Incorrect Password"
  }

  //New Password Validation
  if(Validator.isEmpty(newPassword)) {
    errors.newPassword = "New password is required"
  } else if(!Validator.isLength(newPassword, {min:6, max:30})){
    errors.newPassword = "Password must have at least 6 characters"
  }

  if(Validator.isEmpty(confirmNewPwd)) {
    errors.confirmNewPwd = "Confirm your new password"
  } else if(!Validator.equals(newPassword, confirmNewPwd)) {
    errors.confirmNewPwd = "Passwords don't match"
  }

  if(!isEmpty(errors)) {
    return res.status(400).json(errors)
  }
  
  req.errors = errors;

  next()

}