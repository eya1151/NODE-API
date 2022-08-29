const mongoose = require("mongoose");

const PostsModel = mongoose.model(
  "pepollsdb",
  {
    
    FirstName: {
      type: String,
      required: true
    },
    LastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required:true
    },
    password: {
      type: String,
      required:true
    },
    confirmPassword: {
      type:String ,
      required:true
    },
  },
  "pepolls"
);

module.exports = { PostsModel };
