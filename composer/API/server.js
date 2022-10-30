const http = require('http');
const hostname = '127.0.0.1';
const port = 5000;
const server = require('./libs/route.js'); // imports the routing file
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

