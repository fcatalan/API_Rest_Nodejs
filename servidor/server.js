var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    cors            = require('cors'),
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
  res.header('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With');
    next();
});

app.use(cors());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(methodOverride());

mongoose.connect('mongodb://localhost/sistemaDistribuido');

var usuarioModel = mongoose.model('usuarioModel', 
                                                  {email: String,
                                                   nombre: String, 
                                                   pass: String,
                                                   rut: String, 
                                                   apellidoP: String, 
                                                   apellidoM: String });

var productoModel = mongoose.model('productoModel',
                                               {nombre:           String,
                                                codigo:           String,
                                                cantidad:         String,
                                                precioUnitario:   String});



//prueba
var usuario = new usuarioModel({email: 'fcatalan@gmail.com', pass: '1234', 
  rut: '18', apellidoP: 'catalan', apellidoM: 'chavez' });

app.post('/agregarUsuario', function (req, res, next) {
  console.log('POST');
  console.log(req.body);

  var usuario = new usuarioModel({
    email:         req.body.email,
    nombre:      req.body.nombre,
    pass:        req.body.pass,
    rut:         req.body.rut,
    apellidoP:     req.body.apellidoP,
    apellidoM:     req.body.apellidoM
  });

  usuario.save(function(err, usuario) {
    if(err) return res.send(500, err.message);
    res.status(200).jsonp(usuario);
  }); 
});



app.get('/usuarios', function (req, res, next) {
    usuarioModel.find(function (err, usuarios) {
    if (err) return console.error(err);
    console.log(usuarios);
    res.json(usuarios);
  });  
});

app.post('/agregarProducto', function (req, res, next) {
  console.log('POST');
  console.log(req.body);

  var producto = new productoModel({
    nombre:           req.body.nombre,
    codigo:           req.body.codigo,
    cantidad:         req.body.cantidad,
    precioUnitario:   req.body.precioUnitario
  });

  producto.save(function(err, producto) {
    if(err) return res.send(500, err.message);
    res.status(200).jsonp(productoModel);
  }); 
});





app.get('/usuario2/:email/:pass', function (req, res, next) {
  console.log(req.params.email);
  //res.send(JSON.stringify({ email: req.params.email }));
  res.json({email: req.params.email});
});



app.get('/producto/:codigo', function (req, res, next) {
console.log("/producto/:codigo" + req.params.codigo);
  var query = productoModel.findOne({ 'codigo': req.params.codigo });
  query.exec(function (err, producto) {
    if (err) return handleError(err);
    console.log(producto); // Space Ghost is a talk show host.
    res.json(producto);
  });

});

app.get('/usuarioByRut/:rut', function (req, res, next) {
console.log("/usuarioByRut/:rut" + req.params.rut);
  var query = usuarioModel.findOne({ 'rut': req.params.rut });
  query.exec(function (err, usuario) {
    if (err) return handleError(err);
    console.log(usuario); // Space Ghost is a talk show host.
    res.json(usuario);
  });

});

app.get('/loginUsuario/:email/:pass', function (req, res, next) {

    usuarioModel.find(function (err, usuarios) {
    if (err) return console.error(err);
    
    for(var usuario in usuarios)
    {       
      if(usuarios[usuario].email == req.params.email && usuarios[usuario].pass == req.params.pass )
      {
        console.log(usuarios[usuario]);
        res.json(usuarios[usuario]);
      }else{
          res.json(null);
      }
    }


  }); 

});


app.put('/actualizarUsuario/', cors(), function (req, res, next) {

console.log("looog");
console.log(" usuario desde el cliente: " + req.body);

usuarioModel.findOne({ 'rut': req.body.rut }, function(err, usuario) {
    usuario.email    = req.body.email;
    usuario.pass   = req.body.pass;
    usuario.rut      = req.body.rut;
    usuario.apellidoP  = req.body.apellidoP;
    usuario.apellidoM  = req.body.apellidoM;

    usuario.save(function(err, usuario) {
      if(err) return res.send(500, err.message);
      console.log("usuario actualizado: " + usuario);
      res.status(200).jsonp(usuario);
    });
  });

});


app.put('/actualizarProducto/', cors(), function (req, res, next) {

console.log("looog");
console.log(" producto desde el cliente: " + req.body);

productoModel.findOne({ 'codigo': req.body.codigo }, function(err, producto) {
    producto.nombre         = req.body.nombre;
    producto.codigo         = req.body.codigo;
    producto.cantidad       = req.body.cantidad;
    producto.precioUnitario = req.body.precioUnitario;

    producto.save(function(err) {
      if(err) return res.send(500, err.message);
      res.status(200).jsonp(producto);
    });
  });

});

// Start server
app.listen(8080, function() {
  console.log("Node server running on http://localhost:8080");
});