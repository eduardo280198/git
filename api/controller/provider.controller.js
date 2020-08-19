'use strict'

var ProviderModel = require('../models/provider.model');

function findProvider (req, res) {

    ProviderModel.find({}).exec((err, response) => {
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

        newProvider.save((err, providerSave) => {
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

function updateProvider(req, res){

    var providerId = req.params.id;
    var body = req.body;
    
    ProviderModel.findByIdAndUpdate(providerId, body, {new: true}, (err, providerUpdate) =>{
        if(err){
            res.status(500).send({message: 'Error del servidor'});
        }else{
            if(err){
                res.status(404).send({message: 'No se pudo realizar la actualizacion'});
            }else{
                res.status(200).send({           
                    message: 'Registro Actualizado',
                    provider: providerUpdate
                
                });
            }
        }
    });
}

module.exports = {
    findProvider,
    saveProvider,
    updateProvider
}