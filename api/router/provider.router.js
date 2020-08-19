'use strict'

var express = require('express');

var api = express.Router();

var ProviderController = require('../controller/provider.controller');

var md_auth = require('../middleware/authenticated');
var md_admin = require('../middleware/admin');

api.get('/busqueda',md_auth.ensureAuth, ProviderController.findProvider);
api.post('/guardar',md_auth.ensureAuth, ProviderController.saveProvider);
api.put('/update/:id',[md_auth.ensureAuth, md_admin.isAdmin], ProviderController.updateProvider);

module.exports = api;