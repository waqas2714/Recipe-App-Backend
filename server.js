const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use('/api/auth', require('./routes/authRoute.js'));
app.use('/api/recipe', require('./routes/recipeRoute.js'));

const PORT = process.env.PORT || 3000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT,() => {
     console.log(`Running Server on port: ${PORT}`);
      console.log("MongoDB Connected!");
    });
  })
  .catch((err) => {
    console.log(err);
  });

