exports = module.exports = function(app, mongoose) {

	var productoSchema = new mongoose.Schema({
		nombre: 			{ type: String },
		codigo: 			{ type: String },
		cantidad: 			{ type: Number },
		precioUnitario:  	{ type: String }
	});

	mongoose.model('ProductoModel', productoSchema);
};