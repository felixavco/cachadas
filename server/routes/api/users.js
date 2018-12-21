const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');


//Load User model
const User = require('../../models/User');

//@route  /api/users
//@method GET
//@access Protected
//@desc   return a list of users, only accesible from the admin panel
router.get('/', async (req, res) => {
  const users = await User.find()
  res.status(200).json({users});
})

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
      return res.status(400).json({email: "Email already exist"});
    } else {
      //If address does not exist, register the user
      const {firstName, lastName, email, password} = req.body;
      const newUser = new User({firstName, lastName, email, password});

      // Encrypt the password before save it in the DB
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, async (err, hash) => {
          try {
            if(err) throw err;
            newUser.password = hash;
            //register the user in the Database
            await newUser.save()
          } catch (error) {
            res.status(500).json({error: `User registration failed see ${error}`});
          }
        });
      });

    }
  } catch (error) {
     res.status(503).json({error});
  }
})

//@route  /api/users/admin
//@method POST
//@access Private
//@desc   This route is to create new admins with access to the admin console, this route is privated.
router.post('/admin', (req, res) => {
  const { name } = req.body;
  res.json({name})

})

module.exports = router