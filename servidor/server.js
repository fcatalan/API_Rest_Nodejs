var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    mongoose        = require('mongoose');

/*
// Connection to DB
mongoose.connect('mongodb://localhost/sistemaDistribuido', function(err, res) {
  if(err) throw err;
  console.log('Connected to Database');
});
*/

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(methodOverride());


var modelUsuario     = require('./models/usuarioModel')(app, mongoose);
var modelProducto    = require('./models/productoModel')(app, mongoose);

var usuarioCtrl = require('./controllers/usuarioController');
var productoCtrl = require('./controllers/productoController');

var usuario = express.Router();



usuario.route('/usuario')
  .get(usuarioCtrl.findUsuario);
app.use(usuario);


app.get('/usuario2/:email/:pass', function (req, res, next) {
	console.log(req.params.email);
	//res.send(JSON.stringify({ email: req.params.email }));
	res.json({email: req.params.email});
});


// Start server
app.listen(8080, function() {
  console.log("Node server running on http://localhost:8080");
});