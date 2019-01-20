const express = require('express')
const router = express.Router()
const passport = require('passport')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })


//Load Passport jwt authentication
const protected = passport.authenticate('jwt', { session: false })

//Validation
const validateCreatePost = require('../../validation/createPost')

//Controllers 
const createPostController = require('../../controllers/posts').CreatePostController

//Multer
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     console.log(file)
//     cb(null, 'uploads')
//   }, 
//   filename: (req, file, cb) => {
//     cb(null, file.filename + '-' + Date.now())
//   }
// })


//@route  /api/posts
//@method GET
//@access Protected
//@desc   return a list of posts, only accesible from the admin panel
router.get('/', (req, res) => { res.json({msg: "posts works"})})

//@route  /api/post/create
//@method POST
//@access Protected
//@desc   Creates new Ad (Post)
router.post('/create', upload.array('images', 2), (req, res) => {
    console.log(req.files)
    console.log(req.body)
    res.status(200).json(req.body);
})


module.exports = router