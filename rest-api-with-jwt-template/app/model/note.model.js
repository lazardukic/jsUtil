//imports
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let noteSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  userID: { type: String, required: true },
  isDeleted: { type: Boolean, required: true },
  dateCreated: { type: Number, required: true }
});

//exports
module.exports = mongoose.model("Note", noteSchema, "note"); //third arg is name of collection
