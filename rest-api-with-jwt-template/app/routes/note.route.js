//imports
const express = require("express");
const router = express.Router();

//require the controllers
const note_controller = require("../controller/note.controller");

//get all
router.get("/all", note_controller.getAll);

//get all
router.get("/findOne/:id", note_controller.findOne);

//post
router.post("/post", note_controller.postNote);

//update
router.put("/update/:id", note_controller.update);

//delete
router.delete("/delete/:id", note_controller.delete);

//exports
module.exports = router;
