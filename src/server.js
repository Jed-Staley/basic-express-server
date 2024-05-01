'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const handleNotFound = require('./error-handlers/404.js');
const handleError = require('./error-handlers/500.js');
const logger = require('./middleware/logger.js');
const { validateName } = require('./middleware/validator.js');
const timeStamp = require('./middleware/timestamp.js');

const app = express();

let database = {
  // abc111: { name: 'John' },
  // def222: { name: 'Cathy' },
  // ghi333: { name: 'Zachary' },
  // jkl444: { name: 'Allie' },
};

app.use(cors());

app.use(timeStamp);
app.use(logger);


app.get('/', getHomePage);
app.get('/data', getData);
app.get('/data/:id', getData);
app.get('/broken', simulateError);
app.get('/person', validateName, getPerson);
app.get('*', handleNotFound);
app.use( handleError );


function getData(req, res) {
  res.status(200).json(database);
}

function getPerson( req, res, next ) {
  let name = req.query.name;
  let personDatabase = {
    name: name,
  };
  res.status(200).json(personDatabase);
}

function getHomePage(req, res) {
  res.status(200).send('Hello World');
}

function simulateError(req, res, next) {
  next('We have a problem');
}

function start(port) {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

module.exports = {app, start};