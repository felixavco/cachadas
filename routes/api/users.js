const express = require('express');
const router = express.Router();
const passport = require('passport');

//Load Passport jwt authentication
const protected = passport.authenticate('jwt', { session: false });

//Validation
const validateProfileUpdate = require('../../validation/updateProfile');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
const validateChangePassword = require('../../validation/changePassword');
const validateResetPassword = require('../../validation/resetPassword');
const validateResetPasswordPut = require('../../validation/resetPasswordPut');
const validateDeleteAccount = require('../../validation/deleteAccount');

//Controllers
const {
	RegisterController,
	VerificationController,
	LoginController,
	UpdateUserProfile,
	ChangePasswordController,
	ResetPasswordController,
	ResetPasswordControllerPut,
	DeleteAccountController,
	SendVerificationController
} = require('../../controllers/users');

//Multer
const multer = require('multer');

//Configure location where the file will be saved and the name for the file
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'avatars');
	},
	filename: (req, file, cb) => {
		const ext = file.mimetype.split('/')[1];
		cb(null, req.user._id + '.' + ext);
	}
});

//Filter invalid file extensions
const fileFilter = (req, file, cb) => {
	if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

//@route  /api/user/register
//@method POST
//@access Public
//@desc   Register new users
router.post('/register', validateRegisterInput, RegisterController);

//@route  /api/user/login
//@method POST
//@access Public
//@desc   Login user and returning Token
router.post('/login', validateLoginInput, LoginController);

//@route  /api/user/account-verification/:token
//@method GET
//@access Public
//@desc   Verifies the user account
router.get('/account-verification/:token', VerificationController);

//@route  /api/user/send-verification
//@method GET
//@access Protected
//@desc   Sends a new verification email
router.get('/send-verification', protected, SendVerificationController);

//@route  /api/user/profile
//@method POST
//@access Protected
//@desc   Updates a new profile
router.post(
	'/profile',
	protected,
	multer({ storage, fileFilter }).single('avatar'),
	validateProfileUpdate,
	UpdateUserProfile
);

//@route  /api/user/change-password
//@method POST
//@access Protected
//@desc   changes the user password
router.post('/change-password', protected, validateChangePassword, ChangePasswordController);

//@route  /api/user/reset-password
//@method POST
//@access Public
//@desc   reset the user password, when user forgot the password, sends an email with the reset password url (requires user email)
router.post('/reset-password', validateResetPassword, ResetPasswordController);

//@route  /api/user/reset-password
//@method PUT
//@access Public
//@desc   receives the token sent via email and changes the user password
router.put('/reset-password', validateResetPasswordPut, ResetPasswordControllerPut);

//@route  /api/user/delete
//@method POST
//@access Protected
//@desc   Delete user account
router.post('/delete', protected, validateDeleteAccount, DeleteAccountController);

module.exports = router;
