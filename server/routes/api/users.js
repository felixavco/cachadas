const express = require('express')
const router = express.Router()
const passport = require('passport')

//Controllers 
const registerController = require('../../controllers/users').RegisterController
const loginController = require('../../controllers/users').LoginController
const googleAuthController = require('../../controllers/users').GoogleAuthController
const updateUserProfile = require('../../controllers/users').updateUserProfile

//Validation
const updateProfileValidation = require('../../validation/updateProfile')

//Load Passport jwt authentication
const protected = passport.authenticate('jwt', { session: false })


//@route  /api/user/register
//@method POST
//@access Public
//@desc   Register new users
router.post('/register', registerController)

//@route  /api/user/login
//@method POST
//@access Public
//@desc   Login user and returning Token
router.post('/login', loginController)

//@route  /api/user/googleoauth
//@method GET
//@access Public
//@desc   Register and Login user with Google Account
router.get('/google', passport.authenticate('google', { scope: [ 'profile', 'email' ] }))

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), googleAuthController)

//@route  /api/user/profile
//@method POST
//@access Protected
//@desc   Updates a new profile
router.post('/profile', protected, updateProfileValidation, updateUserProfile)


module.exports = router
