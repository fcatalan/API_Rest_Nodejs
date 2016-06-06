var express         = require("express"),
	bodyParser   	= require('body-parser'),
    app             = express();
    



// Example Route
var router = express.Router();
router.get('/', function(req, res) {
  res.send("Hello world!");
});
app.use(router);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded



app.post('/profile', function (req, res, next) {
  console.log(req.body);
  res.json(req.body);
});

app.get('/usuario/', function(req, res, next) {
  //res.send(JSON.stringify({ email: req.params.email }));
	res.json({email: "aaa@aaa.cl"});
});

app.post('/', function(req, res, next) {
 // Handle the post for this route
});


app.get('/usuario2/:email/:pass', function (req, res, next) {
	console.log(req.params.email);
	//res.send(JSON.stringify({ email: req.params.email }));
	res.json({email: req.params.email});
});
/*
app.get('/usuario/', function (req, res) {
	
	//res.send(JSON.stringify({ email: req.params.email }));
	res.json({email: "aaa@aaa.cl"});
});

*/



// Start server
app.listen(8080, function() {
  console.log("Node server running on http://localhost:8080");
});