const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
// const morgan = require('morgan')


const port = process.env.PORT || 5000

const app = express()

//Morgan MiddleWare
// app.use(morgan('combined'))

/** BodyParser Middleware **/
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//Passport Middleware
app.use(passport.initialize())

//Passport Config
require('./config/passport')(passport)
require('./config/googleOauth')(passport)

//Importing API routes
const userRoutes =  require('./routes/api/users')
const postRoutes =  require('./routes/api/posts')
const adminRoutes = require('./routes/api/admin')

//DB Config
const { mongoURI } = require('./config/keys')


//Defining API routes
app.use('/api/user', userRoutes)
app.use('/api/post', postRoutes)
app.use('/api/admin', adminRoutes)

//Serving Static forlder for avatar images
app.use('/avatars', express.static(path.join(__dirname, 'avatars')))

//Catchall route
app.use((req, res) => {
  res.send("<p>Invalid route please read the API documentation</p>")
})

// Connect to the Database
mongoose.connect(mongoURI, { useNewUrlParser: true })
  .then(db => {
    console.log("Connected to DB")
    app.listen(port, () => console.log(`Server running on port ${port}`))
  })
  .catch(err => console.error(err))


