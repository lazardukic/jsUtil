//imports
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let roleSchema = new Schema({
  role: { type: String, required: true, max: 100 },
  id: { type: Number, required: true }
});

//exports
module.exports = mongoose.model("Role", roleSchema, "role"); //third arg is name of collection
