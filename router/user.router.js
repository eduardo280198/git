'use strict'

var express = require('express');

var api = express.Router();
var UserController = require('../controller/user.controller');

api.get('/busqueda', UserController.find);  //Importa el metodo de busqueda
api.post('/save', UserController.save);  //Importa el metodo de guardar
api.put('update/:id', UserController.update);  //Importa el metodo de guardar

module.exports = api;