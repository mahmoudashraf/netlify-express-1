'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');

const router = express.Router();

let userBalance = 0
app.use(express.json())


app.get("/api/balance", (req, res) => {
  res.status(200).send({ balance: userBalance })
})
app.post("/api/balance", (req, res) => {
  const { amount } = req.body
  if (typeof amount !== "number" && amount > 0) return res.status(400).send({ error: "Invalid amount!" })
  userBalance += amount
  res.status(200).send()
})

router.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Hello from Express.js!</h1>');
  res.end();
});
router.get('/api/balance', (req, res) =>  res.status(200).send({ balance: userBalance }));
router.post('/api/balance', (req, res) =>  {const { amount } = req.body
if (typeof amount !== "number" && amount > 0) return res.status(400).send({ error: "Invalid amount!" })
userBalance += amount
res.status(200).send()
});


module.exports = app;
module.exports.handler = serverless(app);
