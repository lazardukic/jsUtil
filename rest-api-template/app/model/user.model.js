//imports
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userSchema = new Schema({
  name: { type: String, required: true, max: 100 },
  password: { type: String, required: true, max: 100 },
  jobTitle: { type: String, required: true, max: 100 },
  daysPTO: { type: Number, required: true }
});

//exports
module.exports = mongoose.model("User", userSchema, "user"); //third arg is name of collection
