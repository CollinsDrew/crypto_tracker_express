// Import express from 'express';
const express = require("express");
// Axios
const axios = require("axios");
const cors = require("cors");
const serverless = require("serverless-http");

const dotenv = require("dotenv");
dotenv.config();

// Mongoose dependency
const mongoose = require("mongoose");
//connect DB
const DB = process.env.DATABASE;

const connectDB = mongoose.connect(DB);
console.log(connectDB);

const app = express(); // Run express when this page is rendered/loaded

//middlewares
//const res = require('express/lib/response');
//middelsware for cors
app.use(cors());
//middleware for json data recieving
app.use(express.json());

// account = string
// coin = string
// amount = number
// postion (buy/sell) = string
// time = timestamp
// current price = number

// Schema
const simulatorSchema = new mongoose.Schema({
  account: String,
  coin: String,
  amount: Number,
  poition: String,
  time: String,
  currentPrice: Number,
  balance: Number,
});

// Modal
const simulatorModal = mongoose.model("Trade", simulatorSchema);

app.get("/purchase", (req, res) => {
  res.send("hurray");
});

app.post("/purchase/create", async (req, res) => {
  const newData = new simulatorModal({
    account: req.body.account,
    coin: req.body.coin,
    amount: req.body.amount,
    position: req.body.position,
    time: req.body.time,
    currentPrice: req.body.currentPrice,
    balance: req.body.balance,
  });
  newData.save();

  const allData = await simulatorModal.find();

  res.send(allData);

  console.log(req.body);
});

app.get("/account", async (req, res) => {
  const profile = req.query.account;

  const allData = await simulatorModal.find();

  res.send(allData.filter((item) => item.account === profile));
});

// app.patch("update/:account", async (req,res)=>{
//   const accountUpdate = req.params.account;
//   const reqAccount = await simulatorModal.find(accountUpdate);
//   reqAccount.amount = req.params.amount;
//   reqAccount.balance = req.params.balance;
//   reqAccount.save()
//   res.send(reqAccount);
// })

// app.listen(8011, () => {
//   console.log("http://localhost:8011");
// });

//new Netlify way to start the server
const handler = serverless(app);

//We use this so the handler can use async (that mongoose uses)
module.exports.handler = async (event, context) => {
  // You can do any code here
  const result = await handler(event, context);
  // and here
  return result;
};
