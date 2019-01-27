const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = (req, res, next) => {

  let { firstName, lastName, public_email, phone } = req.body

  let errors = {}

  firstName = !isEmpty(firstName) ? firstName : ''
  lastName = !isEmpty(lastName) ? lastName : ''
  public_email = !isEmpty(public_email) ? public_email : ''
  phone = !isEmpty(phone) ? phone : ''

  //phone Validation 
  if(!Validator.isEmpty(phone)) {
    if(!Validator.isNumeric(phone)) {
      errors.phone = "Invalid Phone Number"
    }
  }
 
  //Email Validation
  if(!Validator.isEmpty(public_email)) {
    if(!Validator.isEmail(public_email)) {
      errors.public_email = "El formato del Correo electronico no es valido"
    }
  }

  //First Name Validation
  if(Validator.isEmpty(firstName)) {
    errors.firstName = "El campo Nombre es requerido"
  } else if (!Validator.isLength(firstName, {min: 2, max: 30})) {
    errors.firstName = "El Nombre debe de tener entre 2 a 30 caracteres"
  }

  //Last Name Validation
  if(Validator.isEmpty(lastName)) {
    errors.lastName = "El campo Apellido es requerido"
  } else if(!Validator.isLength(lastName, {min: 2, max: 30})) {
    errors.lastName = "El Apellido debe de tener entre 2 a 30 caracteres"
  }
  
  if(!isEmpty(errors)) {
    return res.status(400).json(errors)
  }

  req.errors = errors;
  
  next()

}