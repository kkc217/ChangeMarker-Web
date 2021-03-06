const express= require('express');
const http = require('http');
const app = express();

const hostname = 'localhost';
const port = 3000;

const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
    //console.log("Server is running!");
});

const indexRouter = require('./routes/index');

app.use('/', indexRouter);