const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = (req, res, next) => {

  let {email, password} = req.body

  let errors = {}

  email = !isEmpty(email) ? email : ''
  password = !isEmpty(password) ? password : ''

  //Email Validation
  if(Validator.isEmpty(email)) {
    errors.email = "Ingrese su correo electronico"
  } else if(!Validator.isEmail(email)) {
    errors.email = "El formato del Correo electronico no es valido"
  }

  //Password Validation
  if(Validator.isEmpty(password)) {
    errors.password = "Ingrese su contraseña"
  } else if(!Validator.isLength(password, {min:6, max:30})){
    errors.password = "Contraseña incorrecta."
  }

  if(!isEmpty(errors)) {
    return res.status(400).json(errors)
  }

  next()

}