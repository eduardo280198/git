'use strict'

var express = require('express');

var api = express.Router();
var ProductController = require('../controller/product.controller');

api.get('/busqueda', ProductController.findProduct);
api.get('/guardar', ProductController.saveProduct);

module.exports = api;