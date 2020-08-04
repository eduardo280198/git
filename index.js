'use strict' //Obligatorio (Emnaascript(?))

//var global
//let funciona solo en el metodo
//const es una constante

var mongoose = require('mongoose');
var app = require('./app'); //Servicios

var port = process.env.PORT || 3789;
mongoose.Promise = global.Promise; //Promesas

mongoose.connect('mongodb://localhost:27017/producto', {useNewUrlParser: true}) //base de datos//ip:puerto/esquema
    .then(() => {
        console.log('Conexion a mongodb exitosa');

        app.listen(port, () =>{ //Escucha el puerto
            console.log('El servidor de NodeJS esta corriendo...');
        }); 
    })
    .catch(err =>{
        console.error('Error de conexion', err);
    });