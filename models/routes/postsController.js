const express = require('express');
//const postsModel = require ("../postsModel");
const router = express.Router();
const ObjectID = require('mongoose').Types.ObjectId;
const bcrypt = require("bcryptjs");
const {registerValidation , loginValidation}=require ("../../validation")
const JWT =require("jsonwebtoken");
const { PostsModel } = require('../postsModel');
const { result } = require('@hapi/joi/lib/base');
const tokenSecret = "my-token-secret"
const refreshtokenSecret= "my refreshtoken"



router.get('/', (req, res) => {
  console.log('heeeree');
  PostsModel.find((err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error to get data : " + err);
  })
});

router.get('/:id', async(req, res) => {
 const test=await  PostsModel.find({_id:req.params.id})
 if (test) {res.send(test) 
 }
else{
  res.send({message:"no data with this id "})
}})
  


//register
router.post('/signup',async (req, res) => {
// // validate the user 
 const{error}= registerValidation(req.body);
 if (error) { res.status(400).send(error.details[0].message);
 }
 // checking user email
  const emailExiste= await PostsModel.findOne({email:req.body.email});
 if (emailExiste) { res.status(400).send("Email exists");
 }
 const salt =await bcrypt.genSalt(10);
 const hashedPassword=await bcrypt.hash(req.body.password,salt); 
const hashedconfirmPassword=await bcrypt.hash(req.body.confirmPassword,salt); 
  
const newRecord = new PostsModel({
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    email: req.body.email,
    password: hashedPassword  ,
    confirmPassword: hashedconfirmPassword  ,
  })

  newRecord.save((err, docs) => {
    if (!err) res.send(docs);
    else console.log('Error creating new data : ' + err);
  })
});

router.post('/login', (req, res) => {
  PostsModel.findOne({email: req.body.email})
  .then(user => {
      if(!user) res.status(404).json({error: 'no user with that email found'})
      else {
          bcrypt.compare(req.body.password, user.password, (error, match) => {
              if (error) res.status(500).json(error)
              else if (match) res.status(200).json({token: generateToken(user),refreshtoken:generateRefreshToken(user)})
              else res.status(403).json({error: 'passwords do not match'})
          })
      }
  })
  .catch(error => {
      res.status(500).json(error)
  })
});


function generateToken(user){
  return JWT.sign({data: user}, tokenSecret, {expiresIn: '24h'})
}
function generateRefreshToken(user) {
  return JWT.sign({data: user}, refreshtokenSecret, {expiresIn: '1h'});
}


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