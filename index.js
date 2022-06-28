const express = require('express');
const app = express();
require('./models/dbConfig');
const postsRoutes = require('./models/routes/postsController');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');


app.use(bodyParser.json());
app.use(cors());
app.use('/posts', postsRoutes);

app.listen(5000, () => console.log('Server started: 5000'));