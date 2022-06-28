const express = require('express');
const router = express.Router();
const ObjectID = require('mongoose').Types.ObjectId;

const { PostsModel } = require('../postsModel');
router.get('/', (req, res) => {
  console.log('heeeree');
  PostsModel.find((err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error to get data : " + err);
  })
});

router.post('/', (req, res) => {
  const newRecord = new PostsModel({
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  })

  newRecord.save((err, docs) => {
    if (!err) res.send(docs);
    else console.log('Error creating new data : ' + err);
  })
});
// update
router.put("/:id", (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknow : " + req.params.id)
  
  const updateRecord = {
    FirstName: req.body.FirstName,
    LastName: req.body. LastName,
    email: req.body.email,
    password: req.body.password,
    mconfirmPassword: req.body.confirmPassword,
  };

  PostsModel.findByIdAndUpdate(
    req.params.id,
    { $set: updateRecord},
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log("Update error : " + err);
    }
  )
});

router.delete("/:id", (req, res) => {
  if (!ObjectID.isValid(req.params.id))  
    return res.status(400).send("ID unknow : " + req.params.id)
  
  PostsModel.findByIdAndRemove(
    req.params.id,
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log("Delete error : " + err);
    })
});

module.exports = router;