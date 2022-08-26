const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');

const app = express();

app.use(bodyParser.json());

app.use('/auth', authRoutes);

app.use("/", (req, res, next) => {
    res.json([{
        "id" : "1",
        "content" : "json data",
        "body" : "This is a Hello world msg"
    }]);
});




mongoose
  .connect(
    'mongodb+srv://dbUser:dbUser@cluster0.phflj.mongodb.net/Atoa?retryWrites=true', { useNewUrlParser: true }
  )
  .then(result => {
   
    app.listen(3000, ()=> {
        console.log(`App listening on port 3000 \n db connected`);
    });
  })
  .catch(err => {
    console.log(err);
  });