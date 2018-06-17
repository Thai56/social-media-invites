const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const controllers = require('./controllers');

const {
  insertDocuments,
  findAllDocuments,
  findDocuments,
} = controllers.dbControllers;

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
  console.log("Connected successfully to server");

  db = client.db(dbName);

  // Spinning up server - - - - -
  server = app.listen(8080, function() {
    const port = server.address().port;
    console.log('Example app listening on port ', port);
  });

  // insertDocuments(db, function() {
  //   findDocuments(db, function() {
  //     client.close();
  //   });
  // });
});

// Server Utilities - - - - - -
app.use(cors());
app.use(bodyParser());

// Endpoints - - - - - - - - -
app.get('/', /*controllers.getTest*/ (req, res) => {
  db.collection('businessInfo')
});

app.get('/businessInfo', (req, res) => {
  db.collection('businessInfo').find().toArray((err, result) => {
    assert.equal(err, null); 
    res.status(200).send(result);
  });
});

app.post('/businessInfo', /*controllers.postBusinessInfo*/ (req, res) => {
  console.log('request ', req.body);
  db.collection('businessInfo')
    .save((req.body), (err, result) => {
      if (err) console.log('error ', err);

      console.log('saved to database ');
      res.redirect('/');
    });
});

module.exports = server;
