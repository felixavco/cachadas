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

  //Email Validation
  if(Validator.isEmpty(email)) {
    errors.email = "El Correo electronico es requerido"
  } else if(!Validator.isEmail(email)) {
    errors.email = "El formato del Correo electronico no es valido"
  }

  //Password Validation
  if(Validator.isEmpty(password)) {
    errors.password = "Ingrese una contraseña"
  } else if(!Validator.isLength(password, {min:6, max:30})){
    errors.password = "La contraseña debe de contener almenos 6 caracteres"
  }

  if(Validator.isEmpty(password2)) {
    errors.password2 = "Confirme su contraseña"
  } else if(!Validator.equals(password, password2)) {
    errors.password2 = "Las contraseñas no coinciden"
  }

  if(!isEmpty(errors)) {
    return res.status(400).json(errors)
  }

  next()

}