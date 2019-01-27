const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = (req, res, next) => {

  let { contactEmail, contactPhone, title, description, category, price } = req.body

  let { make, year, gas, model, type, transmision } = req.body
  
  let { propertyType, transaction, rooms, bathrooms } = req.body

  let errors = {}

  contactEmail = !isEmpty(contactEmail) ? contactEmail : ''
  contactPhone = !isEmpty(contactPhone) ? contactPhone : ''
  description = !isEmpty(description) ? description : ''
  category = !isEmpty(category) ? category : ''
  title = !isEmpty(title) ? title : ''
  price = !isEmpty(price) ? price : ''

  transmision = !isEmpty(transmision) ? transmision : ''
  model = !isEmpty(model) ? model : ''
  make = !isEmpty(make) ? make : ''
  year = !isEmpty(year) ? year : ''
  type = !isEmpty(type) ? type : ''
  gas = !isEmpty(gas) ? gas : ''


  propertyType = !isEmpty(propertyType) ? propertyType : ''
  transaction = !isEmpty(transaction) ? transaction : ''
  bathrooms = !isEmpty(bathrooms) ? bathrooms : ''
  rooms = !isEmpty(rooms) ? rooms : ''

  //Contact Phone Validation 
  if(!Validator.isEmpty(contactPhone)) {
    if(!Validator.isNumeric(contactPhone)) {
      errors.contactPhone = "Invalid Phone Number"
    }
  }
 
  //Email Validation
  if(!Validator.isEmpty(contactEmail)) {
    if(!Validator.isEmail(contactEmail)) {
      errors.contactEmail = "Invalid Email address"
    }
  }

  //Description Validation
  if(Validator.isEmpty(description)) {
    errors.description = "Description is required"
  } else if (!Validator.isLength(description, {min: 6, max: 500})) {
    errors.description = "Description must have between 6 to 500 characters"
  }

  //Title Validation
  if(Validator.isEmpty(title)) {
    errors.title = "Title is required"
  } else if(!Validator.isLength(title, {min: 6, max: 50})) {
    errors.title = "Title must have between 6 to 50 characters"
  }

  //Price Validation
  if(Validator.isEmpty(price)) {
    errors.price = "Price is required"
  } else if(!Validator.isNumeric(price)) {
    errors.price = "Price must be a number"
  }


    //Category Validation
    if(!Validator.isEmpty(category)) {
      
      switch (category) {
        case "vehicles":

          //Make Validation
          if(Validator.isEmpty(make)) {
            errors.make = "Make is required"
          }

          //Gas Validation
          if(Validator.isEmpty(gas)) {
            errors.gas = "Gas is required"
          }

          //Type Validation
          if(Validator.isEmpty(type)) {
            errors.type = "Type is required"
          }

          //Model Validation
          if(Validator.isEmpty(model)) {
            errors.model = "Model is required"
          }

          //Transmision Validation
          if(Validator.isEmpty(transmision)) {
            errors.transmision = "Transmision is required"
          }

          //Year Validation
          if(Validator.isEmpty(year)) {
            errors.year = "Year is required"
          } else if(!Validator.isNumeric(year)) {
            errors.year = "Invalid Year Format"
          }

          break;
        
        case "real_estate":

          //Property Type Validation
          if(Validator.isEmpty(propertyType)) {
            errors.propertyType = "Property Type is required"
          }

          //Transaction Validation
          if(Validator.isEmpty(transaction)) {
            errors.transaction = "Transaction is required"
          }

          //Rooms Validation
          if(Validator.isEmpty(rooms)) {
            errors.rooms = "Rooms field is required"
          }

          //Bathrooms Validation
          if(Validator.isEmpty(bathrooms)) {
            errors.bathrooms = "Bathrooms field is required"
          }

          break;
      }
      
    } else {
      errors.category = "Category is required"
    }


  if(!isEmpty(errors)) {
    return res.status(400).json(errors)
  }

  req.errors = errors;
  
  next()

}