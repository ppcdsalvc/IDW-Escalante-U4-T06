const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const wagner = require('wagner-core');
const path = require('path');

const URL = `/naldeportivo`;

// MODELS
require('./models/models')(wagner);

const cliente = require('./router/cliente.router')(wagner);
const producto = require('./router/producto.router')(wagner);


let app = express();
let app1 = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app1.use(morgan('dev'));
app1.use(bodyParser.json());
app1.use(bodyParser.urlencoded({ extended: false }));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app1.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});


// ROUTERS

const uri = `/cliente/v1/`;
const uri1 = `/producto/v1/`;

app.use(uri+'cliente', cliente);
app1.use(uri1+'producto',producto);

module.exports = app;
module.exports = app1;