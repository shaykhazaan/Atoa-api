const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');
const txnController = require('./controllers/transaction');

const isAuth = require('./middleware/is-auth');

const app = express();

app.use(bodyParser.json());

//To prevent the cors errors when accessed through different means.
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'content-type, Authorization');
  next();
  
});

app.use('/auth', authRoutes);

app.post("/", isAuth , txnController.getTransactions);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({message: message});
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