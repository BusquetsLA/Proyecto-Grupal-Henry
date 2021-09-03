const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const server = express();
const routes = require('./routes/index');

dotenv.config();
// dropea la collection igual q el {force: true}, pero aun no se donde iria XD.
// mongoose.connection.db.dropCollection('products', function(err, results) {
//     if(err) console.log(err);
//     else console.log(results);
// });

server.name = 'API';

server.use(morgan('dev'));
//server.use(express.urlencoded());
server.use(express.json())
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  });

  // Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
  });

server.use('/', routes);

module.exports = server;
