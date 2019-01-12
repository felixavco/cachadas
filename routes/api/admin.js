const express = require('express')
const router = express.Router()
const passport = require('passport')

//Controllers
const allUsersController = require('../../controllers/users').AllUsersController

//Load Passport jwt authentication
const protected = passport.authenticate('jwt', { session: false })

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

module.exports = router 