'use strict'

var UserModel = require('../models/user.model');   //Archivos que se importan, no se ponen las extenciones solo el nombre
var bcrypt = require('bcrypt-nodejs'); //Encriptar las contraseñas

var jwtService = require('../services/jwt.service');

function find(req, res) {

    UserModel.find({}).exec((err, response) => {
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
            res.status(500).send({message: 'Error del servidor'});
        } else {
            if(!userUpdate) {
                res.status(404).send({message: 'No se pudo realizar la actualizacion'});
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

function login(req, res){

    var body = req.body;

    var email = body.email;
    var password = body.password;

    //Busca en base de datos un registro unico si es que existe
    UserModel.findOne( {email: email.toLowerCase()}, (err, existUser) =>{
        if(err){
            res.status(500).send({message: 'Error al comprobar el correo electronico'});
        }else{
            if(existUser){
                bcrypt.compare(password, existUser.password, (err, res) => {
                    if(success){
                        existUser.password = undefined;
                        //

                        if(body.gettoken){
                            res.status(200).send({
                                token: jwtService.createToken(existUser)
                            });
                        }else{
                            res.status(200).send(existUser);
                        }
                    }else{
                        res.status(404).send({
                            message:"El usuario y/o contraseña incorrecta"
                        });
                    }
                });
            }else{
                res.status(404).send({message:'Correo electronico no registrado'});
            }
        }
    }); 
}

module.exports = {
    find,
    save,
    update,
    login
};