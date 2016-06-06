exports = module.exports = function(app, mongoose) {

	var usuarioSchema = new mongoose.Schema({
		email: 			{ type: String },
		pass: 			{ type: String },
		rut: 			{ type: Number },
		apellidoP:  	{ type: String },
		apellidoM:  	{ type: String }
	});

	mongoose.model('UsuarioModel', usuarioSchema);
};