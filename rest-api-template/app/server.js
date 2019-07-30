//imports
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRoute = require("./routes/user.route"); //imports routes for the users

let port = 8081;
const db_url = "mongodb://localhost:27017/test";

//global promise
mongoose.Promise = global.Promise;

//connecting to the database
mongoose
  .connect(db_url, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch(err => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

//configure server
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//route endpoints
app.use("/user", userRoute);

//initialize server
app.listen(port, () => {
  console.log("Server is up and running on port number " + port);
});
