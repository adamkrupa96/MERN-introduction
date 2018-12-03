const http = require('http');
const appPort = 8080;

http.createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({'greeting': 'Hello World!' }));
})
.listen(appPort);

console.log(`Listening on port ${appPort}`);