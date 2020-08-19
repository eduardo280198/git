'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'Ago050700';

//Toma los datos que pueda
exports.createToken = function(user){
    
    var payload = {

        sub : user._id,
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        rol: user.role,
        iat: moment().unix(),
        exp: moment().add(20, 'day').unix
        //exp:moment().unix()
    };

    return jwt.encode(payload, secret);
}