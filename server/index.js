const appPort = 8080;

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// mongoose setup
const mongoose = require('mongoose');
const dbUrl = 'mongodb://localhost:27017/todo-app';
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
const dbConnection = mongoose.connection;

dbConnection.on('error', console.error.bind(console, 'MongoDB connection error:'));

mongoose.connect(dbUrl).then(() => {
    console.log("Connected successfully to database server");    
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

const TodoTask = require('./models/TodoTask');

app.post('/api/add-task', (request, response) => {
    TodoTask.create(request.body, (error, newTask) => {
        if (error) {
            console.log('Todotask saving error: ' + error);
        }
        response
            .status(201)
            .send(newTask);
    });
});