const express = require('express');
const req = require('express/lib/request');
const Mongoose = require('mongoose');
const Account = require("./schema/accountModel");
const router = express.Router();

const app = express()

router.get("/test", async (req, res) => {
  try {
    const accounts = await Account.find();
    res.json(accounts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const uri = "mongodb+srv://iium:wonder20@modioz.jck0n.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

async function connectDB() {
  return Mongoose.connect(uri)
  .then(() => console.log('Connected'));
};

const accountRouter = require("./router/routes");
app.use("/account", accountRouter);

connectDB().then(() => {
    console.log(`Server is started… ${new Date()}`);
    app.listen(8080);
  })

