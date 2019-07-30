//imports
const User = require("../model/user.model");
const jwt = require("jsonwebtoken");

//===========
//   login
//===========
exports.login = async function(req, res) {
  var users = [];
  //get users
  await User.find()
    .then(user => {
      users = user;
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users."
      });
    });

  var email = req.body.email;
  var password = req.body.password;
  var validLogin = false;

  var foundUser = {};
  users.forEach(user => {
    if (user.email === email && user.password === password) {
      validLogin = true;
      foundUser = user;
    }
  });
  if (!validLogin) {
    res.json({
      validLogin
    });
  }
  //return token
  jwt.sign({ user: foundUser }, "secretkey", (err, token) => {
    res.json({
      token: token,
      user: foundUser
    });
  });
};

//===================
//     get all
//===================
exports.getAll = function(req, res) {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    }
  });
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
exports.post = function(req, res) {
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

//===================
//    get by id
//===================
exports.findOne = (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: "User not found with id " + req.params.id
        });
      }
      res.send(user);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "User not found with id " + req.params.id
        });
      }
      return res.status(500).send({
        message: "Error retrieving User with id " + req.params.id
      });
    });
};

//===================
//      delete
//===================
exports.delete = (req, res) => {
  User.findByIdAndRemove(req.params.id, { useFindAndModify: false })
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: "User not found with id " + req.params.id
        });
      }
      res.send({ message: "User deleted successfully!" });
    })
    .catch(err => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "User not found with id " + req.params.id
        });
      }
      return res.status(500).send({
        message: "Could not delete user with id " + req.params.id
      });
    });
};

//===================
//      update
//===================
exports.update = (req, res) => {
  //find and update user
  User.findByIdAndUpdate(
    req.params.id,
    {
      isDeleted: req.body.isDeleted,
      dateCreated: req.body.dateCreated,
      userID: req.body.userID,
      roles: req.body.roles,
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      jobTitle: req.body.jobTitle,
      daysPTO: req.body.daysPTO
    },
    { new: true, useFindAndModify: false }
  )
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: "User not found with id " + req.params.id
        });
      }
      res.send(user);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "User not found with id " + req.params.id
        });
      }
      return res.status(500).send({
        message: "Error updating user with id " + req.params.id
      });
    });
};
