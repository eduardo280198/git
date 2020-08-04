'use strict'

var ProductModel = require('../models/product.model');

function findProduct(req, res){

    ProductModel.findProduct({}).exec((err, response) =>{
        if(err){
            res.status(500).send({message:'Error del servidor...'});
        }else{
            if(!response){
                res.status(404).send({message:'No hay registros.'});
            }else{
                res.status(200).send(
                    response
                );
            }
        }
    });
}

function saveProduct(req, res){
    
    var params = req.body;

    if(params.nameProduct && params.price){

        var newProduct = new ProductModel();

        newProduct.nameProduct = params.nameProduct;
        newProduct.price = params.price;
        newProduct.description = params.description;
        
        newProdcut.save((err, productSave) => {

            if(err){
                res.status(500).send({message: 'Error del servidor...'});
            }else{
                if(!productSave){
                    res.status(200).send({message: 'No se guardo el usuario'});
                }else{
                    res.status(200).send({product: productSave});
                }
            }
        });
    }
}

module.exports = {
    findProduct,
    saveProduct
};