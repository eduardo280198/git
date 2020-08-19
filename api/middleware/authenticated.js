'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'Ago050700';

exports.ensureAuth = function(req, res, next){
   
    if(!req.headers.authorization){
        return res.status(403).send({
            message: 'Peticion no autorizada'
        });
    }

    var token = req.headers.authorization.replace(/[''']+/g,'');

    try{
        var payload = jwt.decode(token, secret);

        if(payload.sub && (payload.exp <= moment().unix())){
            return res.status(401).send({message: 'El token ha expirado'});
        }

    }catch(err){
        console.error(err);
        return res.status(404).send({message: 'Token no valido'});
    }
    
    next();
}