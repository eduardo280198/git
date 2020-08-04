'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.set('useFindAndModify', false);

var ProviderSchema = Schema({

    nameProvider: String,
    direction: String,
    telephone: String
}, {
    versionKey: false
});

module.export = mongoose.model('Provider', ProviderSchema);