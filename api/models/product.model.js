'use strict'

var mongoose = require('mongoose');
var schema = mongoose.Schema;

mongoose.set('useFindAndModify', false);

var ProductSchema = schema({
    code: String,
    nameProduct: String,
    description: String,
    price: Number,    
    user: {type: mongoose.Schema.ObjectId, ref: 'User'} //Funciona solo al guardar
}, {
    versionKey: false
});

module.exports = mongoose.model ('Product', ProductSchema);