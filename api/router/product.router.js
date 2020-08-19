'use strict'

var express = require('express');
var md_auth = require('../middleware/authenticated');
var md_admin = require('../middleware/admin');

var api = express.Router();
var ProductController = require('../controller/product.controller');


//md_auth.ensureAuth, --- Para seguridad de guardar y autorizar
api.get('/busqueda', md_auth.ensureAuth, ProductController.findProduct);
api.post('/guardar', [md_auth.ensureAuth, md_admin.isAdmin], ProductController.saveProduct);
api.put('/update/:id', ProductController.updateProduct);

module.exports = api;