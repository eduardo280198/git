'use strict' 

var mongoose = require('mongoose');
var schema = mongoose.Schema;

mongoose.set('useFindAndModify', false);//Cuando se haga un cambio se 

var UserSchema =  schema({
    name: String,
    lastname: String,
    email: String,
    role: String,
    password: String,
    image: String
}, {
    versionKey: false
});

//Permite exportar todo lo que se usa
module.exports = mongoose.model ('User', UserSchema);