//imports
const User = require("../model/user.model");

//Simple version, without validation or sanitation
exports.test = function(req, res) {
  res.send("Greetings from the Test controller!");
};

//===================
//     get all
//===================
exports.getAll = function(req, res) {
  User.find()
    .then(user => {
      res.send(user);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users."
      });
    });
};

//===================
//      post
//===================
exports.postUser = function(req, res) {
  var user = new User(req.body);
  user
    .save()
    .then(item => {
      res.send("item saved to database");
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
};
