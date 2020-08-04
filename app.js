'use strict'

var express = require('express'); //Emula los servicios e importa la libreria express
var bodyParse = require('body-parser');
var app = express();    //Hace uso de la libreria

var UserRouter = require('./router/user.router');
var ProductRouter = require('./router/product.router');
var ProviderRouter = require('./router/provider.router');

app.use(bodyParse.urlencoded({extended: false}));//Negar la interpretacion (la opcion automatica)
app.use(bodyParse.json());//Se le dice que es lo que hara

app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');  
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use('/api/user', UserRouter);
app.use('/api/product', ProductRouter);
app.use('/api/provider',ProviderRouter);

module.exports = app; //Hasta el final para exportar todo al index (Funcion de note)