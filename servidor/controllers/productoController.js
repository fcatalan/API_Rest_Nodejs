//File: controllers/productoController.js
var mongoose = require('mongoose');
var ProductoModel  = mongoose.model('ProductoModel');

//GET - Return all productos in the DB
exports.findAllProducto = function(req, res) {
	ProductoModel.find(function(err, productoModel) {
    if(err) res.send(500, err.message);

    console.log('GET /productos')
		res.status(200).jsonp(productoModel);
	});
};

//GET - Return a ProductoModel with specified ID
exports.findById = function(req, res) {
	ProductoModel.findById(req.params.id, function(err, productoModel) {
    if(err) return res.send(500, err.message);

    console.log('GET /productoModel/' + req.params.id);
		res.status(200).jsonp(productoModel);
	});
};

//POST - Insert a new ProductoModel in the DB
exports.addProducto = function(req, res) {
	console.log('POST');
	console.log(req.body);

	var productoModel = new ProductoModel({
		nombre:    			 req.body.nombre,
		codigo: 	 		 req.body.codigo,
		cantidad:  			 req.body.cantidad,
		precioUnitario:  	 req.body.precioUnitario
	});

	productoModel.save(function(err, productoModel) {
		if(err) return res.send(500, err.message);
    res.status(200).jsonp(productoModel);
	});
};

//PUT - Update a register already exists
exports.updateProducto = function(req, res) {
	ProductoModel.findById(req.params.id, function(err, productoModel) {
		productoModel.nombre   		 = req.body.nombre;
		productoModel.codigo		 = req.body.codigo;
		productoModel.cantidad  	 = req.body.cantidad;
		productoModel.precioUnitario = req.body.precioUnitario;

		productoModel.save(function(err) {
			if(err) return res.send(500, err.message);
      res.status(200).jsonp(productoModel);
		});
	});
};

//DELETE - Delete a ProductoModel with specified ID
exports.deleteProducto = function(req, res) {
	ProductoModel.findById(req.params.id, function(err, productoModel) {
		productoModel.remove(function(err) {
			if(err) return res.send(500, err.message);
      res.status(200);
		})
	});
};