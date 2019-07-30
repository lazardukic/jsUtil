//imports
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("./config/config");
const userRoute = require("./routes/user.route");
const noteRoute = require("./routes/note.route");

let port = 8081;

//global promise
mongoose.Promise = global.Promise;

//connecting to the database
mongoose
  .connect(config.DB_URL, {
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
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//route endpoints
app.use("/user", userRoute);
app.use("/note", noteRoute);

//initialize server
app.listen(port, () => {
  console.log("Server is up and running on port number " + port);
});
