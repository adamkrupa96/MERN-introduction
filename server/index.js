const appPort = 8080;

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// mongoDB setup
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dbUrl = 'mongodb://localhost:27017';
const dbName = 'todo-app';

const client = new MongoClient(dbUrl);

client.connect((error) => {
    assert.equal(null, error);
    console.log("Connected successfully to database server");

    const db = client.db(dbName);

    insertDocuments(db, () => {
        client.close();
    });
});


// express app setup
const appHandlers = [
    cors(),
    bodyParser.json()
];

const app = express();
app.use(appHandlers);
app.listen(appPort, () => {
    console.log(`Listening on port ${appPort}`);
});

app.get('/', (request, response) => {
    response
        .status(200)
        .send(JSON.stringify({ 'greeting': 'Hello World!' }));
});

const insertDocuments = function (db, callback) {
    // Get the documents collection
    const collection = db.collection('documents');
    // Insert some documents
    collection.insertMany([
        { a: 1 }, { a: 2 }, { a: 3 }
    ], function (err, result) {
        assert.equal(err, null);
        assert.equal(3, result.result.n);
        assert.equal(3, result.ops.length);
        console.log("Inserted 3 documents into the collection");
        callback(result);
    });
}