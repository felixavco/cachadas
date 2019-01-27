const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = (req, res, next) => {

  let { postId } = req.body

  let errors = {}

  postId = !isEmpty(postId) ? postId : ''

  //PostID Validation
  if(Validator.isEmpty(postId)) {
    errors.error = "Not Authorized"
  } 

  if(!isEmpty(errors)) {
    return res.status(400).json(errors)
  }

  req.errors = errors;

  next()

}