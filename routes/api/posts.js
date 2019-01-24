const express = require('express')
const router = express.Router()
const passport = require('passport')
const multer = require('multer')

//Load Passport jwt authentication
const protected = passport.authenticate('jwt', { session: false })

//Validation
const validateCreatePost = require('../../validation/createPost')
const validateDeletePost = require('../../validation/deletePost')

//Controllers 
const createPostController = require('../../controllers/posts').CreatePostController
const myAdsController = require('../../controllers/posts').MyAdsController
const deletePostController = require('../../controllers/posts').DeletePostController

//Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { _id } = req.user
    cb(null, `uploads`)
  }, 
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
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
    protected,
    multer({ storage, fileFilter }).array('images', 2), 
    validateCreatePost,
    createPostController
)

//@route  /api/post/my-ads
//@method GET
//@access Protected
//@desc   Returns the post (ads) owned by the logged user
router.get(
  '/my-ads',
  protected,
  myAdsController
)

//@route  /api/post/delete
//@method POST
//@access Protected
//@desc   deletes a post, requires post id
router.post(
  '/delete',
  protected,
  validateDeletePost,
  deletePostController
)


module.exports = router