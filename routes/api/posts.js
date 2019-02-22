const express = require('express');
const router = express.Router();
const passport = require('passport');
const multer = require('multer');

//Load Passport jwt authentication
const protected = passport.authenticate('jwt', { session: false });

//Validation
const validateCreatePost = require('../../validation/createPost');
const validateDeletePost = require('../../validation/deletePost');
const validateSinglePost = require('../../validation/singlePost');
const validateEditPost = require('../../validation/editPost');

//Controllers
const {
	CreatePostController,
	EditPostController,
	MyAdsController,
	DeletePostController,
	SinglePostController,
	AllPostsController
} = require('../../controllers/posts');

//Multer
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, `uploads`);
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + '-' + file.originalname);
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

//@route  /api/post
//@method GET
//@access public
//@desc   returns a list of all posts (ads)
router.get('/', AllPostsController);

//@route  /api/post/single
//@method POST
//@access public
//@desc   return a single post
router.post('/single', validateSinglePost, SinglePostController);

//@route  /api/post/edit
//@method POST
//@access Private
//@desc   Edit the incoming Post (Ad)
router.post(
	'/edit',
	protected,
	multer({ storage, fileFilter }).array('images', 10),
	validateEditPost,
	EditPostController
);

//@route  /api/post/create
//@method POST
//@access Protected
//@desc   Creates new Ad (Post)
router.post(
	'/create',
	protected,
	multer({ storage, fileFilter }).array('images', 10),
	validateCreatePost,
	CreatePostController
);

//@route  /api/post/my-ads
//@method GET
//@access Protected
//@desc   Returns the post (ads) owned by the logged user
router.get('/my-ads', protected, MyAdsController);

//@route  /api/post/delete
//@method POST
//@access Protected
//@desc   deletes a post, requires post id
router.post('/delete', protected, validateDeletePost, DeletePostController);

module.exports = router;
