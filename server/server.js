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
require('./config/passport')(passport)

//Importing API routes
const users =  require('./routes/api/users');
const posts =  require('./routes/api/posts');

//DB Config
const db = require('./config/keys').mongoURI;

//Connect to the Database
(async () => {
  try {
    await mongoose.connect(db, { useNewUrlParser: true });
    console.log("Connected to Database...");
  } catch (error) {
   console.error(`Unable to connect to the Database, ${error}`);
  }
})();

//Defining API routes
app.use('/api/users', users);
app.use('/api/posts', posts);


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});