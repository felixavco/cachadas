const express = require('express')
const router = express.Router()
const passport = require('passport')

//Load Passport jwt authentication
const protected = passport.authenticate('jwt', { session: false })

//Validation
const validateCreatePost = require('../../validation/createPost')

//Controllers 
const createPostController = require('../../controllers/posts').CreatePostController

//Multer
const multer = require('multer')

//@route  /api/posts
//@method GET
//@access Protected
//@desc   return a list of posts, only accesible from the admin panel
router.get('/', (req, res) => { res.json({msg: "posts works"})})

//@route  /api/post/create
//@method POST
//@access Protected
//@desc   Creates new Ad (Post)
router.post(
  '/create', 
  multer().single('images'),
  protected,
  validateCreatePost,
  createPostController
)


module.exports = router