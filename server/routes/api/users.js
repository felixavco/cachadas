const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secretOrKey } = require('../../config/keys');
const passport = require('passport');

//Load User model
const User = require('../../models/User');

const protected = passport.authenticate('jwt', { session: false });

//@route  /api/users
//@method GET
//@access Protected
//@desc   return a list of users, only accesible from the admin panel
router.get('/', protected, async (req, res) => {
	try {
		const { role } = req.user;
		//Only admins can see the full list of users
		if (role != 'admin') {
			res.status(401).json({ msg: 'Unauthorized' });
		} else {
			const users = await User.find();
			res.status(200).json({ users });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json(error);
	}
});

//@route  /api/users/register
//@method POST
//@access Public
//@desc   Register new users
router.post('/register', async (req, res) => {
	try {
		//checks if the email address already exist
		const user = await User.findOne({ email: req.body.email });
		if (user) {
			//If exist return an error
			return res.status(409).json({ email: 'Email already exist' });
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
						res.status(201);
					} catch (error) {
						res.status(500).json({ error: `User registration failed see ${error}` });
					}
				});
			});
		}
	} catch (error) {
		res.status(503).json({ error });
	}
});

//@route  /api/users/login
//@method POST
//@access Public
//@desc   Login user and returning Token
router.post('/login', async (req, res) => {
	try {
		const { email: r_email, password } = req.body;

		//Find user by email
		const user = await User.findOne({ email: r_email });

		if (!user) return res.status(404).json({ error: 'User not found' });
    
    /*
      If the user was registered using Google OAuth, the password is equals the Google ID, 
      if this is FALSE so the user needs to access with his password, ELSE the user has not register a password and needs to login using Golgle OAuth.
    */
    if (user.password != user.GoogleId) {

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) res.status(401).json({ password: 'Incorrect password' });

      const { id, firstName, LastName, email, role } = user;

      const payload = { id, firstName, LastName, email, role };

      jwt.sign(payload, secretOrKey, { expiresIn: '7d' }, (err, token) => {
        res.status(200).json({
          succsess: true,
          token: `Bearer ${token}`
        });
      });
    } else {
       res.json({msg: "Use Google OAuth 20"}); //REMOVE LATER
    }
	
	} catch (error) {
		res.status(500).json(error);
	}
});

//@route  /api/users/googleoauth
//@method GET
//@access Public
//@desc   Register and Login user with Google Account
router.get('/googleoauth', passport.authenticate('google', { scope: [ 'profile', 'email' ] }));

router.get('/googleoauth/callback', protected, /*passport.authenticate('google', { failureRedirect: '/' }),*/ (req, res) => {
	res.send(req.user);
});

module.exports = router;
