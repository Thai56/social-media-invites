const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const controllers = require('./controllers');
const utils = require('./utils');

const {
  insertDocuments,
  findAllDocuments,
  findDocuments,
} = controllers.dbControllers;

const reviewHandler = require('./services/reviews.service');
const reviewInstance = reviewHandler();

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
// const dbName = 'myproject';
const dbName = 'business-users';

let db;
let server;

// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log('Connected successfully to server');

  db = client.db(dbName);


  reviewInstance(db.collection('businesses'));
  // Spinning up server - - - - -
  server = app.listen(8080, function() {
    const port = server.address().port;
    console.log('Example app listening on port ', port);
  });
});

function loadUser(req, res, next) {
  // console.log('loaduser', req.body);
  // const { email } = req.body;
  console.log('req.body ', req.body);
  const { email } = req.body;
  console.log('email ', email);
    db.collection('users').find( { email: email } ).toArray(function(err, user) {
    assert.equal(err, null);
      console.log('return ', user);
      if (!user.length) {
        next(new Error('Couldn\'t find user: ', err));
        return;
      }
      req.user = user[0];
      next();
  });
}

function userExists(req, res, next) {
  db.collection('users').find( { email: req.body.email} ).toArray((err, result) => {
    console.log('USERS_RESULT ', result)
    if (result.length) {
      console.log('user exists', result);
      next(new Error('User alread Exists'));
      return;
    }
    next();
  });
}

function saveBusiness(req, res, next) {
  console.log('body ', req.body);
  req.body.timestamp = (new Date() / 1000);
  db.collection('businesses').save(req.body, (err, result) => {
    if (err) next(new Error(err));
    console.log('saved to database ');
    // TODO: finish connecting data to the view
    req.userId = req.body.userId;
    next();
  });
}

function getUserBusinesses(req, res) {
  const { userId } = req.body;
  console.log('_USER_ID ', userId);
  db.collection('businesses').find({ userId: userId }).toArray((err, result) => {
    assert.equal(err, null);
    console.log(result.length, userId);
    if (err) res.status(404).send(err);
    res.status(200).send(result);
  });
}

// Server Utilities - - - - - -
app.use(cors());
app.use(bodyParser());

// TODO: Test login method below for user info after inserting user
// // TODO: get testing working and write tests for these
// User Collection - - - - - - -
app.post('/user/register', userExists, (req, res, next) => {
  const { body: { email, password } } = req;
  console.log('saving');

  db.collection('users').save(req.body, (err, result) => {
    if (err) res.status(404).send( err);

    console.log('saved to database ');
    res.status(201).send('successfully saved to db');
  });
});

app.post('/user/login', loadUser, (req, res) => {
  console.log('login ');
  const { body: { email, password } } = req;
  console.log(req.user)
  // TODO: add password authentication
  // TODO: write and error handler try/catch for this password fail instead of sending back a response
  if (req.user.password !== password) return res.status(400).send('wrong password');

  const token = utils.guid();

  req.user.token =  token;

  res.status(200).send({ user: req.user });
});

app.delete('/users', (req, res) => {
  db.collection('users').remove( { }, function(err, result) {
    if(err) res.status(404).send(err);
    console.log(result);
    res.status(204).send(result);
  });
})

app.delete('/businesses', (req, res) => {
  db.collection('businesses').remove( { }, function(err, result) {
    if(err) res.status(404).send(err);
    console.log(result);
    res.status(204).send(result);
  });
})



app.post('/dashboard/create/business', saveBusiness, getUserBusinesses);

app.post('/dashboard/businesses', getUserBusinesses);

// Endpoints - - - - - - - - -
app.get('/users', (req, res) => {
  db.collection('users').find().toArray((err, result) => {
    assert.equal(err, null);
    res.status(200).send(result);
  });
});

module.exports = server;
