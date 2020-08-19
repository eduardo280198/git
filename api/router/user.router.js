'use strict'

var express = require('express');

var api = express.Router();
var UserController = require('../controller/user.controller');

var md_auth = require('../middleware/authenticated');
var md_admin = require('../middleware/admin');

api.get('/busqueda',md_auth.ensureAuth, UserController.find);  //Importa el metodo de busqueda
api.post('/save', [md_auth.ensureAuth, md_admin.isAdmin], UserController.save);  //Importa el metodo de guardar
api.put('update/:id',[md_auth.ensureAuth, md_admin.isAdmin], UserController.update);  //Importa el metodo de guardar
api.post('/login', UserController.login);

module.exports = api;