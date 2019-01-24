//Load User model
const Post = require('../models/Post')


//@route  /api/post/create
//@method POST
//@access Protected
//@desc   Creates new Ad (Post)
exports.CreatePostController = async (req, res) => {
  try {
    
    const { files } = req
    const images = files.map(file => file.path)
    const owner = req.user._id
    const { contactEmail, contactPhone, title, description, category } = req.body
    const price = parseFloat(req.body.price) 
    const { make, year, gas, model, type, transmision } = req.body
    const { propertyType, transaction, rooms, bathrooms } = req.body
    let  newPostData = { owner, title, price, description, contactEmail, contactPhone, description, category, images }

    switch (category) {

      case "vehicles":
        newPostData = {...newPostData, make, year, gas, model, type, transmision }
        break;

      case "real_estate":
        newPostData = {...newPostData, propertyType, transaction, rooms, bathrooms}
        break;
    
    }

    const newPost = new Post(newPostData)
    await newPost.save()
    res.status(200).json({msg: "Post created"})

  } catch (err) {
		res.status(500).json(err)
  }
  
  

  


}


//@route  /api/post/my-ads
//@method GET
//@access Protected
//@desc   Returns the post (ads) owned by the logged user
exports.MyAdsController = async (req, res) => {
  const { errors } = req

  try {
    const { _id } = req.user

    const posts = await Post.find({owner: _id})

    res.status(200).json(posts)
    
  } catch (err) {
    errors.error = err
    res.status(500).json(errors)
  }
}

//@route  /api/post/delete
//@method POST
//@access Protected
//@desc   deletes a post, requires post id
exports.DeletePostController = async (req, res) => {
  const { errors } = req;

  try {
    const { _id: userId } = req.user;
    const { postId } = req.body;

    await Post.findOneAndDelete({
      _id: postId,
      owner: userId
    })
    
    res.status(200).json({msg: "Post Deleted"});

  } catch (err) {
    errors.error = err;
    res.status(500).json(errors);
  }
}