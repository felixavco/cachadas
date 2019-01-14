//Load User model
const User = require('../models/User')


//@route  /api/post/create
//@method POST
//@access Protected
//@desc   Creates new Ad (Post)
exports.CreatePostController = async (req, res) => {
  console.log(req.body)
  res.status(200).json(req.body);
}