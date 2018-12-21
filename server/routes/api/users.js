const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secretOrKey } = require('../../config/keys')
const passport = require('passport');


//Load User model
const User = require('../../models/User');

//@route  /api/users
//@method GET
//@access Protected
//@desc   return a list of users, only accesible from the admin panel
router.get('/', 
  passport.authenticate('jwt', { session: false }), 
  async (req, res) => {
  try {
    const { role } = req.user;
    //Only admins can see the full list of users
    if(role != 'admin') {
      res.status(401).json({msg: "Unauthorized"});
    } else { 
      const users = await User.find();
      res.status(200).json({users});
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
    if(user) {
      //If exist return an error
      return res.status(409).json({email: "Email already exist"});
    } else {
      //If address does not exist, register the user
      const newUser = new User({ ...req.body });

      // Encrypt the password before save it in the DB
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, async (err, hash) => {
          try {
            if(err) throw err;
            newUser.password = hash;
            //register the user in the Database
            await newUser.save();
            res.status(201);
          } catch (error) {
            res.status(500).json({error: `User registration failed see ${error}`});
          }
        });
      });

    }
  } catch (error) {
     res.status(503).json({error});
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
    const user = await User.findOne({ email: r_email});

    if(!user) res.status(404).json({error: "User not found"});
     
    //Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) res.status(401).json({password: "Incorrect password"});

    //If the password is correct, Sign Token
    const { id, firstName, LastName, email, role } = user;

    const payload = { id, firstName, LastName, email, role };

    jwt.sign(
      payload, 
      secretOrKey, 
      { expiresIn: '7d' },
      (err, token) => {
        res.status(200).json({
          succsess: true,
          token: `Bearer ${token}`
        });
      }
    );
    
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
});

//@route  /api/users/admin
//@method POST
//@access Private
//@desc   This route is to create new admins with access to the admin console, this route is privated.
router.post('/admin', (req, res) => {
  const { name } = req.body;
  res.json({name})

});

module.exports = router