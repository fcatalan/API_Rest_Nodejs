//File: controllers/usuarioController.js
var mongoose = require('mongoose');
var UsuarioModel  = mongoose.model('UsuarioModel');

//GET - Return todos los usuario en la DB
exports.findAllUsuario = function(req, res) {
	UsuarioModel.find(function(err, usuarioModel) {
    if(err) res.send(500, err.message);

    console.log('GET /usuarios')
		res.status(200).jsonp(usuarioModel);
	});
};

//GET - Return un  usuario
exports.findById = function(req, res) {
	UsuarioModel.findById(req.params.id, function(err, usuarioModel) {
    if(err) return res.send(500, err.message);

    console.log('GET /usuario/' + req.params.id);
		res.status(200).jsonp(usuarioModel);
	});
};

//POST - inserta un nuevo usuario en la DB
exports.addUsuario = function(req, res) {
	console.log('POST');
	console.log(req.body);

	var usuarioModel = new UsuarioModel({
		email:    		 req.body.email,
		pass: 	 		 req.body.pass,
		rut:  			 req.body.rut,
		apellidoP:  	 req.body.apellidoP,
		apellidoM:  	 req.body.apellidoM
	});

	usuarioModel.save(function(err, usuarioModel) {
		if(err) return res.send(500, err.message);
    res.status(200).jsonp(usuarioModel);
	});
};

//PUT - Update 
exports.updateUsuario = function(req, res) {
	UsuarioModel.findById(req.params.id, function(err, usuarioModel) {
		usuarioModel.email   	= req.body.email;
		usuarioModel.pass		= req.body.pass;
		usuarioModel.rut  	 	= req.body.rut;
		usuarioModel.apellidoP  = req.body.apellidoP;
		usuarioModel.apellidoM  = req.body.apellidoM;

		usuarioModel.save(function(err) {
			if(err) return res.send(500, err.message);
      res.status(200).jsonp(usuarioModel);
		});
	});
};

//DELETE - Delete
exports.deleteUsuario = function(req, res) {
	UsuarioModel.findById(req.params.id, function(err, usuarioModel) {
		usuarioModel.remove(function(err) {
			if(err) return res.send(500, err.message);
      res.status(200);
	  
		})
	});
};


//GET - Return un  usuario
exports.findUsuario = function(req, res) {
	console.log("usuarioController");
	res.json({email: "desdeElModulo@aaa.cl"});
};