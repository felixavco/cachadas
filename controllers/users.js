const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { secretOrKey } = require('../config/keys')

//Load User model
const User = require('../models/User')

//Imput Validation 
const validateRegisterInput = require('../validation/register')
const validateLoginInput = require('../validation/login')


exports.AllUsersController = async (req, res) => {
	try {
	
		const users = await User.find()
		res.status(200).json({ users })
		
	} catch (error) {
		console.error(error)
		res.status(500).json(error)
	}
}

exports.RegisterController = async (req, res) => {
	try {
		//Check Validation
		const { errors, isValid } = validateRegisterInput(req.body)
		if(!isValid) return res.status(400).json(errors)

		//checks if the email address already exist
		const user = await User.findOne({ email: req.body.email })
		if (user) {
			//If exist return an error
			errors.email = 'El correo ya esta registrado'
			return res.status(409).json(errors)
		} else {
			//If address does not exist, register the user
			const newUser = new User({ ...req.body })

			// Encrypt the password before save it in the DB
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, async (err, hash) => {
					try {
						if (err) throw err
						newUser.password = hash
						//register the user in the Database
						await newUser.save()
						res.status(201).json({status: "OK"})
					} catch (error) {
						res.status(500).json({ error: `User registration failed see ${error}` })
					}
				})
			})
		}
	} catch (error) {
		res.status(503).json({error: "Error al registrar el usuario"})
	}
}

exports.LoginController =  async (req, res) => {
	try {
		//Check Validation
		const { errors, isValid } = validateLoginInput(req.body)
		if(!isValid) return res.status(400).json(errors)

		const { email: r_email, password } = req.body

		//Find user by email
		const user = await User.findOne({ email: r_email })

		if (!user) {
			errors.email = 'No se encontro ningun usuario'
			return res.status(404).json(errors)
		}
    
    /*
      If the user was registered using Google OAuth, the password is equals the Google ID, 
      if this is FALSE so the user needs to access with his password, ELSE the user has not register a password and needs to login using Golgle OAuth.
    */
    if (user.password != user.GoogleId) {

      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
				errors.password = 'Contraseña incorrecta'
				return res.status(401).json(errors)
			}

      const { id, firstName, lastName, email, role, avatar, phone, public_email } = user

      const payload = { id, firstName, lastName, email, role, avatar, phone, public_email }

      jwt.sign(payload, secretOrKey, { expiresIn: '7d' }, (err, token) => {
        res.status(200).json({
          succsess: true,
          token: `Bearer ${token}`
        })
      })
    } else {
			errors.password = "Use Google OAuth"
       res.json(errors) //REMOVE LATER
    }
	
	} catch (error) {
		console.error(error)
		res.status(500).json(error)
	}
}

exports.GoogleAuthController = (req, res) => {
	const { id, firstName, lastName, email, role, avatar } = req.user

	const payload = { id, firstName, lastName, email, role, avatar }

	jwt.sign(payload, secretOrKey, { expiresIn: '7d' }, (err, token) => {
		res.status(200).json({
			succsess: true,
			token: `Bearer ${token}`
		})
	})

	req.logout()
}



exports.updateUserProfile = async (req, res) => {
	try {
		const { id, firstName, lastName, public_email, phone, errors } = req.body
		if(req.file) {
			const avatar = "http://localhost:5000/" + req.file.path
			updatedInfo = { firstName, lastName, public_email, phone, avatar }
		} else {
			updatedInfo = { firstName, lastName, public_email, phone }
		}
		
		const updatedUser = await User.findByIdAndUpdate(id, updatedInfo, {new: true})

		if(!updatedUser) {
			errors.user = "Invalid Request"
			res.status(400).json(errors)
		} else {
			const { id, firstName, lastName, public_email, phone, avatar, email, role } = updatedUser
			const updatedProfile = { id, firstName, lastName, public_email, phone, avatar, email, role  }
			res.status(200).json(updatedProfile)
		}

	} catch (error) {
		console.error(error)
		res.status(500).json(error);
	}
}

