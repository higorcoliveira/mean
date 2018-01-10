const port = 3003;

const bodyParser = require('body-parser');
const express = require('express');
const server = express();
const allowCors = require('./cors')

// configurando middlewares existentes
// indica que o bodyParser vai interpretar os dados que vem da requisição
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(allowCors)

server.listen(port, function() {
    console.log(`BACKEND is running on port ${port}...`);
})

module.exports = server
