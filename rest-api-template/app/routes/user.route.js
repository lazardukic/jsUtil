//imports
const express = require("express");
const router = express.Router();

//require the controllers
const user_controller = require("../controller/user.controller");

//a simple test url
router.get("/test", user_controller.test);

//get all
router.get("/all", user_controller.getAll);

//post
router.post("/postUser", user_controller.postUser);

//exports
module.exports = router;
