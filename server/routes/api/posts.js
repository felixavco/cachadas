const express = require('express')
const router = express.Router()

//@route  /api/posts
//@method GET
//@access Protected
//@desc   return a list of posts, only accesible from the admin panel
router.get('/', (req, res) => {
   res.json({
     msg: "posts works"
   });
})


module.exports = router