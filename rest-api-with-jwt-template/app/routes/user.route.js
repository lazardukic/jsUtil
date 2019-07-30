//imports
const express = require("express");
const router = express.Router();

//require the controllers
const user_controller = require("../controller/user.controller");

//login
router.post("/login", user_controller.login);

//get all
router.get("/all", verifyToken, user_controller.getAll);

//get all
router.get("/findOne/:id", user_controller.findOne);

//post
router.post("/post", user_controller.post);

//update
router.put("/update/:id", user_controller.update);

//delete
router.delete("/delete/:id", user_controller.delete);

//verify token
function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}

//exports
module.exports = router;
