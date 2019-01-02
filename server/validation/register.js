const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = validateRegisterInput = data => {
  let errors = {}

  data.firstName = !isEmpty(data.firstName) ? data.firstName : ''
  data.lastName = !isEmpty(data.lastName) ? data.lastName : ''
  data.email = !isEmpty(data.email) ? data.email : ''
  data.password = !isEmpty(data.password) ? data.password : ''
  data.password2 = !isEmpty(data.password2) ? data.password2 : ''

  //First Name Validation
  if(Validator.isEmpty(data.firstName)) {
    errors.firstName = "El campo Nombre es requerido"
  } else if (!Validator.isLength(data.firstName, {min: 2, max: 30})) {
    errors.firstName = "El Nombre debe de tener entre 2 a 30 caracteres"
  }

  //Last Name Validation
  if(Validator.isEmpty(data.lastName)) {
    errors.lastName = "El campo Apellido es requerido"
  } else if(!Validator.isLength(data.lastName, {min: 2, max: 30})) {
    errors.lastName = "El Apellido debe de tener entre 2 a 30 caracteres"
  }

  //Email Validation
  if(Validator.isEmpty(data.email)) {
    errors.email = "El Correo electronico es requerido"
  } else if(!Validator.isEmail(data.email)) {
    errors.email = "El formato del Correo electronico no es valido"
  }

  //Password Validation
  if(Validator.isEmpty(data.password)) {
    errors.password = "Ingrese una contraseña"
  } else if(!Validator.isLength(data.password, {min:6, max:30})){
    errors.password = "La contraseña debe de contener almenos 6 caracteres"
  }

  if(Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirme su contraseña"
  } else if(!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Las contraseñas no coinciden"
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }

}