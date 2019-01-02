const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const port = process.env.PORT || 5000;
const app = express();

/** BodyParser Middleware **/
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//Passport Middleware
app.use(passport.initialize());

//Passport Config
require('./config/passport')(passport);
require('./config/googleOauth')(passport);

//Importing API routes
const userRoutes =  require('./routes/api/users');
const postRoutes =  require('./routes/api/posts');
const adminRoutes = require('./routes/api/admin')

//DB Config
const { mongoURI } = require('./config/keys');

//Connect to the Database
(async () => {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true });
    console.log("Connected to Database...");
  } catch (error) {
   console.error(`Unable to connect to the Database, ${error}`);
  }
})();

//Defining API routes
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/admin', adminRoutes);

//Catchall route 
app.use((req, res) => {
  res.send("<p>Invalid route please read the API documentation</p>");
})


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});