//Load User model
const Post = require('../models/Post')


//@route  /api/post/create
//@method POST
//@access Protected
//@desc   Creates new Ad (Post)
exports.CreatePostController = async (req, res) => {
  try {
    const images = req.files
    const owner = req.user._id
    const { contactEmail, contactPhone, title, description, category } = req.body
    const price = parseFloat(req.body.price) 
    const { make, year, gas, model, type, transmision } = req.body
    const { propertyType, transaction, rooms, bathrooms } = req.body
    let  newPostData = { owner, title, price, description, contactEmail, contactPhone, description, category }

    switch (category) {

      case "vehicles":
        newPostData = {...newPostData, make, year, gas, model, type, transmision }
        break;

      case "real_estate":
        newPostData = {...newPostData, propertyType, transaction, rooms, bathrooms}
        break;
    
    }

    const newPost = new Post(newPostData)
    console.log(images)
    await newPost.save()
    res.status(200).json({msg: "Post created"})

  } catch (err) {
		res.status(500).json(err)
  }
  
  

  


}