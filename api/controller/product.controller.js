'use strict'

var ProductModel = require('../models/product.model');

function findProduct(req, res) {

    ProductModel.find({}).exec((err, response) => {
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

function saveProduct(req, res){
    
    var params = req.body;

    if(params.nameProduct && params.price){

        var newProduct = new ProductModel();

        newProduct.nameProduct = params.nameProduct;
        newProduct.price = params.price;
        newProduct.description = params.description;
        newProduct.code = params.code;
        
        newProduct.save((err, productSave) => {

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

function updateProduct(req, res) {

    var productId = req.params.id;
    var body = req.body;
    ProductModel.findByIdAndUpdate(productId, body, {new:true}, (err, productUpdate) =>{
        if(err){
            res.status(500).send({message: 'Error del servidor'});
        }else{
            if(!productUpdate){
                res.status(404).send({message:'No se pudo realizar la actualizacion'});
            }else{
                res.status(200).send({
                    message: 'Registro actualizado',
                    product: productUpdate
                });
            }
        }
    })
}

module.exports = {
    findProduct,
    saveProduct,
    updateProduct
};