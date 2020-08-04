'use strict'

var mongoose = require('mongoose');
//const productController = require('../controller/product.controller');

var Schema = mongoose.Schema;
mongoose.set('useFindAndModify', false);

var ProductSchema = Schema({
    nameProduct: String,
    price: String,
    description: String
}, {
    versionKey: false
});

module.export = mongoose.model ('Product', ProductSchema);