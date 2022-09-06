'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
let userBalance = 0

const router = express.Router();
router.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Hello from Express.js!</h1>');
  res.end();
});
router.get('/api/balance', (req, res) => res.status(200).json({ balance: userBalance }));
router.post('/api/balance', (req, res) => {
  const { amount } = req.body
  if (typeof amount !== "number" && amount > 0) return res.status(400).send({ error: "Invalid amount!" })
  userBalance += amount
  res.status(200)
});

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

module.exports = app;
module.exports.handler = serverless(app);
