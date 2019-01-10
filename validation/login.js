const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = validateLoginInput = data => {
  let errors = {}

  data.email = !isEmpty(data.email) ? data.email : ''
  data.password = !isEmpty(data.password) ? data.password : ''

  //Email Validation
  if(Validator.isEmpty(data.email)) {
    errors.email = "Ingrese su correo electronico"
  } else if(!Validator.isEmail(data.email)) {
    errors.email = "El formato del Correo electronico no es valido"
  }

  //Password Validation
  if(Validator.isEmpty(data.password)) {
    errors.password = "Ingrese su contraseña"
  } else if(!Validator.isLength(data.password, {min:6, max:30})){
    errors.password = "Contraseña incorrecta."
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }

}