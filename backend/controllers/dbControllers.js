const assert = require('assert');

const insertDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('documents');
  // Insert some documents
  collection.insertMany([
    {a : 1},
    {a : 2},
    {a : { b: 3 }}
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
}

const findAllDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('documents');
  // Find some documents
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log('docs ', docs);
    callback(docs);
  });
};

const findDocuments = function(db, callback) {
  // Get the documents
  const collection = db.collection('documents');
  // Find some documents
  collection.find( { "a.b": { $lt: 3 } } ).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs)
    callback(docs);
  });
};

module.exports = {
  insertDocuments,
  findAllDocuments,
  findDocuments,
};
