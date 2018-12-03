const appPort = 8080;

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

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
        .send(JSON.stringify({'greeting': 'Hello World!' }));
});