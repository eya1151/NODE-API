
const mongoose = require('mongoose');

mongoose.connect(
  "mongodb+srv://pepolls:pepolls@cluster0.x1yvnbr.mongodb.net/?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (!err) console.log("Mongodb connected");
    else console.log("Connection error :" + err);
  }
)