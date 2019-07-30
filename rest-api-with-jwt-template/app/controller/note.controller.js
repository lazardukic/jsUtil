//imports
const Note = require("../model/note.model");

//===================
//     get all
//===================
exports.getAll = function(req, res) {
  Note.find()
    .then(note => {
      res.send(note);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving notes."
      });
    });
};

//===================
//      post
//===================
exports.postNote = function(req, res) {
  var note = new Note(req.body);
  note
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
  Note.findById(req.params.id)
    .then(note => {
      if (!note) {
        return res.status(404).send({
          message: "Note not found with id " + req.params.noteId
        });
      }
      res.send(note);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Note not found with id " + req.params.noteId
        });
      }
      return res.status(500).send({
        message: "Error retrieving note with id " + req.params.noteId
      });
    });
};

//===================
//      delete
//===================
exports.delete = (req, res) => {
  Note.findByIdAndRemove(req.params.id, { useFindAndModify: false })
    .then(note => {
      if (!note) {
        return res.status(404).send({
          message: "Note not found with id " + req.params.id
        });
      }
      res.send({ message: "Note deleted successfully!" });
    })
    .catch(err => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Note not found with id " + req.params.id
        });
      }
      return res.status(500).send({
        message: "Could not delete note with id " + req.params.id
      });
    });
};

//===================
//      update
//===================
exports.update = (req, res) => {
  //find and update note
  Note.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      isDeleted: req.body.isDeleted,
      content: req.body.content,
      dateCreated: req.body.dateCreated,
      userID: req.body.userID
    },
    { new: true, useFindAndModify: false }
  )
    .then(note => {
      if (!note) {
        return res.status(404).send({
          message: "Note not found with id " + req.params.id
        });
      }
      res.send(note);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Note not found with id " + req.params.id
        });
      }
      return res.status(500).send({
        message: "Error updating note with id " + req.params.id
      });
    });
};
