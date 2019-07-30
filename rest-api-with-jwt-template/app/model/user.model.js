//imports
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userSchema = new Schema({
  roles: { type: Array, default: [] },
  firstName: { type: String, required: true, max: 100 },
  lastName: { type: String, required: true, max: 100 },
  email: { type: String, required: true, max: 100 },
  password: { type: String, required: true, max: 100 },
  jobTitle: { type: String, required: true, max: 100 },
  daysPTO: { type: Number, required: true },
  isDeleted: { type: Boolean, required: true },
  dateCreated: { type: Number, required: true }
});

//exports
module.exports = mongoose.model("User", userSchema, "user"); //third arg is name of collection
