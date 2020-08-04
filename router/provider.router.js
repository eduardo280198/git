'use strict'

var express = require('express');

var api = express.Router();

var ProviderController = require('../controller/provider.controller');

api.get('/busqueda', ProviderController.findProvider);
api.get('/guardar', ProviderController.saveProvider);

module.exports = api;