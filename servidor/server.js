var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    cors            = require('cors'),
    mongoose        = require('mongoose'),
    http = require('http')
    , server = http.createServer(app),
    io = require('socket.io').listen(server);

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

     usuarioModel.find({email: req.params.email, pass: req.params.pass },function(err, usuario){

 if (err) return handleError(err);
    console.log(usuario[0]); // Space Ghost is a talk show host.
    if(usuario[0] != undefined ){
      res.json(usuario[0]);
    }else{
      res.json(null);
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



app.post('/eliminarProducto', function (req, res, next) {
console.log(req.body);

  productoModel.findOne({ 'codigo': req.body.codigo }, function(err, producto) {
    console.log(producto);
    producto.remove(function(err) {
      if(err) return res.send(500, err.message);
      res.status(200);    
    })
  });

});


app.post('/eliminarUsuario', function (req, res, next) {

  usuarioModel.findOne({ 'rut': req.body.rut }, function(err, usuario) {
    usuario.remove(function(err) {
      if(err) return res.send(500, err.message);
      res.status(200);    
    })
  });

});

//Path de funciones en Javascript que podrían utilizar
app.use("/controller", express.static(__dirname + '/controller'));
app.use("/js", express.static(__dirname + '/js'));

//Routing
app.get('/preguntas', function (req, res) {
  res.sendfile(__dirname + '/views/index.html');
});

io.sockets.on('connection', function (socket) {
  
  socket.on('initRoom', function (data) {
    console.log("Un usuario entró al chat de la sala " + data.room);
    socket.join(data.room);
  });

  socket.on('exitRoom', function (data) {
    console.log("Un usuario se salió del chat de la sala " + data.room);
    socket.leave(data.room);
  });

  socket.on('disconnect', function () {
    console.log("Usuario desconectado");
  });
  
  socket.on('broadcast', function (data) {
    console.log("Un usuario envió el mensaje: " + data.text);
    socket.broadcast.emit('broadcastCallback', { text:data.text});
  });

  socket.on('multicast', function (data) {
    console.log("Se envió el mensaje " + data.text + " a la sala " + data.room);
    io.sockets.in(data.room).emit('multicastCallback', {text:data.text});
  });
});






// Start server
app.listen(8080, function() {
  console.log("Node server running on http://localhost:8080");
});