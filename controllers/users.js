const fs = require('fs');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secretOrKey } = require('../config/keys');
const crypto = require('crypto');

//Load User model
const User = require('../models/User');
const Post = require('../models/Post');

//SendGrid NodeMailer
const resetPasswordEmail = require('../nodeMailer/sendGrid');

//@route  /api/user/register
//@method POST
//@access Public
//@desc   Register new users
exports.RegisterController = async (req, res) => {
	try {
		const { errors } = req;

		//checks if the email address already exist
		const user = await User.findOne({ email: req.body.email });
		if (user) {
			//If exist return an error
			errors.email = 'El correo ya esta registrado';
			return res.status(409).json(errors);
		} else {
			//If address does not exist, register the user
			const newUser = new User({ ...req.body });

			// Encrypt the password before save it in the DB
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, async (err, hash) => {
					try {
						if (err) throw err;
						newUser.password = hash;
						//register the user in the Database
						await newUser.save();
						res.status(201).json({ msg: 'OK' });
					} catch (error) {
						res.status(500).json({ error: `User registration failed see ${error}` });
					}
				});
			});
		}
	} catch (error) {
		res.status(503).json({ error: 'Error al registrar el usuario' });
	}
};

//@route  /api/user/login
//@method POST
//@access Public
//@desc   Login user and returning Token
exports.LoginController = async (req, res) => {
	const { errors } = req;

	try {
		const { email: r_email, password } = req.body;

		//Find user by email
		const user = await User.findOne({ email: r_email });

		if (!user) {
			errors.email = 'No se encontro ningun usuario';
			return res.status(404).json(errors);
		}

		/*
      If the user was registered using Google OAuth, the password is equals the Google ID, 
      if this is FALSE so the user needs to access with his password, ELSE the user has not register a password and needs to login using Golgle OAuth.
    */
		if (user.password != user.GoogleId) {
			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) {
				errors.password = 'Contraseña incorrecta';
				return res.status(401).json(errors);
			}

			const { id, firstName, lastName, email, role, avatar, phone, public_email } = user;

			const payload = { id, firstName, lastName, email, role, avatar, phone, public_email };

			jwt.sign(payload, secretOrKey, { expiresIn: '7d' }, (err, token) => {
				res.status(200).json({
					succsess: true,
					token: `Bearer ${token}`
				});
			});
		} else {
			errors.password = 'Use Google OAuth';
			res.json(errors); //REMOVE LATER
		}
	} catch (error) {
		console.error(error);
		res.status(500).json(error);
	}
};


//@route  /api/user/profile
//@method POST
//@access Protected
//@desc   Updates a new profile
exports.UpdateUserProfile = async (req, res) => {
	try {
		const { _id } = req.user;
		const { firstName, lastName, public_email, phone, errors } = req.body;

		if (req.file) {
			const avatar = /* "http://localhost:5000/" + */ req.file.path;
			updatedInfo = { firstName, lastName, public_email, phone, avatar };
		} else {
			updatedInfo = { firstName, lastName, public_email, phone };
		}

		const updatedUser = await User.findByIdAndUpdate(_id, updatedInfo, { new: true });

		if (!updatedUser) {
			errors.user = 'Invalid Request';
			res.status(400).json(errors);
		} else {
			const { id, firstName, lastName, public_email, phone, avatar, email, role } = updatedUser;
			const updatedProfile = { id, firstName, lastName, public_email, phone, avatar, email, role };
			res.status(200).json(updatedProfile);
		}
	} catch (error) {
		console.error(error);
		res.status(500).json(error);
	}
};

//@route  /api/user/change-password
//@method POST
//@access Protected
//@desc   changes the user password
exports.ChangePasswordController = async (req, res) => {
	try {
		const { errors } = req;
		const { password, _id } = req.user;
		const { currentPassword, newPassword } = req.body;

		const user = await User.findOne({ _id });

		if (!user) {
			errors.user = 'Unauthorized request';
			return res.status(401).json(errors);
		}

		const isMatch = await bcrypt.compare(currentPassword, password);

		if (!isMatch) {
			errors.currentPassword = 'Incorrect Password';
			return res.status(401).json(errors);
		}

		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(newPassword, salt, async (err, hash) => {
				try {
					if (err) throw err;

					//Stores the new Password
					await User.findByIdAndUpdate(_id, { password: hash });
					res.status(200).json({ msg: 'Password Changed!' });
				} catch (err) {
					errors.error = err;
					res.status(500).json(errors);
				}
			});
		});
	} catch (err) {
		errors.error = err;
		res.status(500).json(errors);
	}
};

//@route  /api/user/reset-password
//@method POST
//@access Public
//@desc   reset the user password, when user forgot the password (requires user email)
exports.ResetPasswordController = async (req, res) => {
	const { errors } = req;

	try {
		const { email } = req.body;

		const user = await User.findOne({ email });

		if (!user) {
			errors.email = 'No user Found';
			return res.status(401).json(errors);
		}

		//Create a random Token
		let token;

		crypto.randomBytes(32, async (err, buffer) => {
			if (err) {
				console.log(err);
				errors.error = err;
				res.status(500).json(errors);
			}

			token = buffer.toString('hex');
			user.resetToken = token;
			user.expResToken = Date.now() + 3600000; // Token will expire in an Hour
			await user.save();
			await resetPasswordEmail(email, token);
			res.status(200).json({ msg: 'Reset password email successfully sent' });
		});
	} catch (err) {
		errors.error = err;
		res.status(500).json(errors);
	}
};

//@route  /api/user/reset-password
//@method PUT
//@access Public
//@desc   receives the token sent via email and changes the user password
exports.ResetPasswordControllerPut = async (req, res) => {
	const { errors } = req;

	try {
		const { password, token } = req.body;

		const user = await User.findOne({
			resetToken: token,
			expResToken: { $gt: Date.now() } //checks if the token is expired
		});

		if (!user) {
			errors.password = 'Invalid token or token expired';
			res.status(401).json(errors);
		}

		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(password, salt, async (err, hash) => {
				try {
					if(err) throw err
					user.password = hash
					user.resetToken = null,
					user.expResToken = null
					
					await user.save()
					res.status(201).json({ msg: 'Password Updated!' });
				} catch (err) {
					errors.error = err;
					res.status(500).json(errors);
				}
			})
		})
	} catch (err) {
		errors.error = err;
		res.status(500).json(errors);
	}
};

//@route  /api/user/delete
//@method POST
//@access Protected
//@desc   Delete user account
exports.DeleteAccountController = async (req, res) => {
	
	const { errors } = req;

	try {
		const { _id, password } = req.user;
		const { password: currentPassword } = req.body;

		const user = await User.findOne({ _id });

		if (!user) {
			errors.password = 'Unauthorized request';
			return res.status(401).json(errors);
		}

		const userPosts = await Post.find({owner: _id})

		if(userPosts.length > 0) {
			//Merges the images path into a single Array
			const imagesURLs = [].concat.apply([], userPosts.map(post => post.images));
			//Deletes images asociated to each post
			try {
				await imagesURLs.forEach(image => fs.unlinkSync(image))
			 } catch (err) {
				 errors.error = err;
				 res.status(500).json(errors);
			 }
		}


		const isMatch = await bcrypt.compare(currentPassword, password);

		if (!isMatch) {
			errors.password = 'Incorrect Password2';
			return res.status(401).json(errors);
		}

		if(user.avatar !== "avatars/default.jpg"){
			fs.unlink(user.avatar, () => {})
		}

		//If Password is correct, proceed to delete user
		await user.remove();
		res.status(200).json({ msg: 'User Deleted!' });
		
	} catch (err) {
		errors.error = err;
		res.status(500).json(errors);
	}
};
