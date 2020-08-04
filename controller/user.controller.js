'use strict'

var UserModel = require('../models/user.model');   //Archivos que se importan, no se ponen las extenciones solo el nombre
var bcrypt = require('bcrypt-nodejs'); //Encriptar las contraseñas

function find(req, res) {
    const user = new UserModel();
    user.find({}).exec((err, response) => {
        if(err) {
            res.status(500).send({message: 'Error del servidor...'});
        } else {
            if(!response) {
                res.status(404).send({message: 'No hay registros'});
            } else {
                res.status(200).send(response);
            }
        }
    });
}

function save(req, res){

    var params = req.body;

    if(params.name && params.email && params.password){
        
        var newUser = new UserModel();
        newUser.name = params.name;
        newUser.lastname = params.lastname;
        newUser.email = params.email;
        
        newUser.role = 'ROLE_USER';

        bcrypt.hash(params.password, null, null, function(err, hash){
            if(err){
                res.status(500).send({message: 'Error al encriptar el password'});
            }else{
                newUser.password = hash;

                newUser.save((err, userSave) => {
                    if(err){
                        res.status(500).send({message: 'Error del servidor...'});
                    }else{
                        if(!userSave){
                            res.status(200).send({message: 'No se guardo el usuario.'});
                        }else{
                            res.status(200).send({user: userSave});
                        }
                    }
                });
            }
        });        
    }
}


function update(req, res) {

    var userId =  req.params.id;
    var body = req.body;
    delete body.password;

    UserModel.findByIdAndUpdate(userId, body, {new: true}, (err, userUpdate) => {
        if(err){
            res.status(500).send({message: 'Error del servidor'})
        } else {
            if(!userUpdate) {
                res.status(404).send({message: 'No se pudo realizar la actualizacion'})
            } else {
                userUpdate.password = undefined;
                res.status(200).send({
                    message: 'Registro actualizado',
                    user: userUpdate
                });
            }
        }
    });
}

module.exports = {
    find,
    save,
    update
};