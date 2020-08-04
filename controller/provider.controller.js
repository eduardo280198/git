'use strict'

var ProviderModel = require('../models/provider.model');

function findProvider (req, res) {

    ProviderModel.find({}).exce((err, response) => {
        if(err){
            res.status(500).send({message: 'Error del servidor...'});
        }else{
            if(!response){
                res.status(404).send({message: 'No hay registros'});
            }else{
                res.status(200).send(
                    response
                );
            }
        }
    });
}

function saveProvider(req, res){

    var params = req.body;

    if(params.nameProvider && params.telephone){

        var newProvider = new ProviderModel();
        newProvider.nameProvider = params.nameProvider;
        newProvider.direction = params.direction;
        newProvider.telephone = params.telephone;

        newProvider.saveProvider((err, providerSave) => {
            if(err){
                res.status(500).send({message: 'Error del servidor...'});
            }else{
                if(!providerSave){
                    res.status(200).send({message: 'No se guardo el usuario.'});
                }else{
                    res.status(200).send({provider: providerSave});
                }
            }
        });
    }
}

module.exports = {
    findProvider,
    saveProvider
}