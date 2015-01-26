  
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

//var signup = require('./routes/signup');
var mysql = require("./modules/connectMysql");
var ejs = require('ejs');


var app = express();

// all environments
app.set('port', process.env.PORT || 3009);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/signin', routes.signin);
app.get('/signup', routes.signup);
app.get('/users', user.list);
app.get('/writereview', routes.writereview);

app.post('/afterSignup', function (req, res) {
	var signup = req.body;
	var firstname = req.body.firstname;
	var password = req.body.passd;
	console.log(password);
	exports.signup = signup;
	//exports.lastname = lastname;
	mysql.insertAndQuery();
	if(mysql.error===""){
		console.log(mysql.error);
		res.end("An Error Occured");
	}
	else{
	res.render('user',{firstname:firstname});
	}
	
});

app.post('/validate', function (req, res) {

if(!req.body.hasOwnProperty('Username') ||!req.body.hasOwnProperty('Password')) {
		res.statusCode = 400;
		return res.send('Error 400: Please input correct values');
}
mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}else{
		ejs.renderFile('views/home.ejs',{logname : results[0].fname,dpassword : results[0].passd,duser : results[0].email},function(err, result) {
				if (!err) {
					console.log(results[0].fname);
					console.log(results[0].passd);
					console.log(results[0].email);
					res.render('home',{
										logname : results[0].fname,
						                duser : results[0].email,
						                dpassword : results[0].passd
						               });
				}
				// render or error
				else {
					res.end('An error occurred');
					console.log(err);
				}
			});
		}
	},req.param('Username'),req.param('Password'));
	
});

app.post('/writereview', function (req, res) {
	
	var writereview = req.body;
	exports.writereview = writereview;
	mysql.insertData();
	if(mysql.error===""){
		console.log(mysql.error);
		res.end("An Error Occured");
	}
	else{
	res.render('submitreview');
	}
	
});

app.post('/results', function (req, res) {
	var results = req.body;
	var find = req.body.find;
	var near = req.body.near;
	exports.results = results;
	console.log(near);
	var sqls="select * from restaurants where res_city='san jose'";
	mysql.getData(sqls,function(err, results) {
		res.render('results', {
			title : 'Foodies',
			search : results,
		});
});
});


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

