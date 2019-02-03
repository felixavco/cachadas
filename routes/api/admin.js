const express = require('express')
const router = express.Router()
const passport = require('passport')

//Load Passport jwt authentication
const protected = passport.authenticate('jwt', { session: false })

//Validation
const validateContactForm = require('../../validation/contactForm');

//Controllers
const allUsersController = require('../../controllers/admin').AllUsersController
const contactFormController = require('../../controllers/admin').ContactFormController


//Authentication 
const isAdmin = require('../../authorization/isAdmin')

//@route  /api/admin/all-users
//@method GET
//@access Protected
//@desc   return a list of users, only accesible from the admin panel
router.get(
  '/all-users', 
  protected, 
  isAdmin, 
  allUsersController
)

//@route  /api/admin/contact
//@method POST
//@access public
//@desc   Send message from a contact form 
router.post(
  '/contact',
  validateContactForm,
  contactFormController
)

module.exports = router 