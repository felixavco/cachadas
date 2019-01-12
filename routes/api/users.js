const express = require('express')
const router = express.Router()
const passport = require('passport')


//Controllers 
const registerController = require('../../controllers/users').RegisterController
const loginController = require('../../controllers/users').LoginController
const googleAuthController = require('../../controllers/users').GoogleAuthController
const updateUserProfile = require('../../controllers/users').updateUserProfile

//Validation
const validateProfileUpdate = require('../../validation/updateProfile')
const validateRegisterInput = require('../../validation/register')
const validateLoginInput = require('../../validation/login')

//Load Passport jwt authentication
const protected = passport.authenticate('jwt', { session: false })

//Multer 
const multer = require('multer')

//Configure location where the file will be saved and the name for the file
const storage =  multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'avatars')
	},
	filename: (req, file, cb) => {
		const ext = file.mimetype.split('/')[1]
		cb(null, req.body.id + '.' + ext)
	}
})

//Filter invalid file extensions
const fileFilter = (req, file, cb) => {
	if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
		cb(null, true)
	} else {
		cb(null, false)
	}
}

//@route  /api/user/register
//@method POST
//@access Public
//@desc   Register new users
router.post(
	'/register', 
	validateRegisterInput,
	registerController
)

//@route  /api/user/login
//@method POST
//@access Public
//@desc   Login user and returning Token
router.post(
	'/login', 
	validateLoginInput,
	loginController
)

//@route  /api/user/googleoauth
//@method GET
//@access Public
//@desc   Register and Login user with Google Account
router.get(
	'/google', 
	passport.authenticate('google', { scope: [ 'profile', 'email' ] })
)

router.get(
	'/google/callback', 
	passport.authenticate('google', { failureRedirect: '/' }), 
	googleAuthController
)

//@route  /api/user/profile
//@method POST
//@access Protected
//@desc   Updates a new profile
router.post(
    '/profile', 
    protected, 
    multer({ storage, fileFilter }).single('avatar'),
    validateProfileUpdate, 
    updateUserProfile
)


module.exports = router
