const express = require('express');
const morgan = require('morgan');
const server = express();
const routes = require('./routes/index');


// dropea la collection igual q el {force: true}, pero aun no se donde iria XD.
// mongoose.connection.db.dropCollection('products', function(err, results) {
//     if(err) console.log(err);
//     else console.log(results);
// });

server.use(morgan('dev'));
//server.use(express.urlencoded());
server.use(express.json())

server.use('/', routes);

module.exports = server;