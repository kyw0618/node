const express = require('express')
const Mongoose = require('mongoose');

const app = express()

app.get('/test', async(req, res) => {
    const v123 = 'sssssssss';
    res.status(200).send({v123});
  });

const uri = "mongodb+srv://iium:wonder20@modioz.jck0n.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

async function connectDB() {
  return Mongoose.connect(uri)
  .then(() => console.log('Connected'));
};

connectDB().then(() => {
    console.log(`Server is started… ${new Date()}`);
    app.listen(8080);
  })