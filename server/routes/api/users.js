const express = require('express')
const router = express.Router()


/**
  @route  /api/users
  @method GET
  @access Protected
  @desc   return a list of users, only accesible from the admin panel
*/
router.get('/', (req, res) => {
   res.json({
     msg: "UserWorks"
   });
})


module.exports = router