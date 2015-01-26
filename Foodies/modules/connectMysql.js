
var app = require('../app.js');
var ejs = require('ejs');
var mysql = require('mysql');
var pool = mysql.createPool({
	checkInterval: 1 * 1000,
	max: 2,
	maxIdleTime: 30*1000,
  host     : 'localhost',
  user     : 'root',
  password : 'Password12',
  port: '3306',
  database: 'foodiesdb'
});

function addToCart(){
	
}

function insertAndQuery(){
pool.getConnection(function(err,connection){
var data = app.signup;
console.log(data);
var gender = 0;
var error ="";
var count=Math.floor(Math.random()*1001);

var post = {iduserslist:count,fname:app.signup.firstname,lname:app.signup.lastname,email:app.signup.email,passd:app.signup.password,dob:app.signup.month +"-"+app.signup.day +"-"+app.signup.year,gender:app.signup.gender};
//connection.connect();
var sql = 'INSERT INTO userslist SET ? ';
connection.query(sql, post, function(err, results) {
	if(err){
		error = err.toString();
		exports.error = error;
		console.log(error);
	}
	else {
		console.log("success");
	}
});
connection.release();
});

}


function fetchData(callback,userName,password){
	//var mysql      = require('mysql');
	var login_error ="";
	console.log("USERNAME: " + userName + " " + "Password: " + password);
	
pool.getConnection(function(err,connection){var sql = 'SELECT * FROM userslist WHERE email = ?';
connection.query(sql, userName, function(err, results){
	if(err || results.length===0||results===null){
		console.log(err);
			}
	else {
		console.log("DATA : " + JSON.stringify(results));
					callback(err, results);
		//console.log(results);
	}
	connection.release();
});
});
	
}

function getData(sqlquery,callback){
	//var mysql      = require('mysql');
	console.log("Before Connection");
	pool.getConnection(function(err,connection)
		{
		console.log("After Connection");
		
		console.log("After this.sqlquery");
			connection.query(sqlquery,function(err, results){
				if(err || results.length===0||results===null){
				console.log(err);
				}
				else {
				console.log("getDATA : " + JSON.stringify(results));
				callback(err, results);
				//console.log(results);
		
		}
			connection.release();
});
});
	
}

function insertData(){
	pool.getConnection(function(err,connection){
	var data = app.writereview;
	console.log(data);
	var error ="";
	var count=Math.floor(Math.random()*1001);
	if (app.writereview.category=="Restaurants"){
		var sql = 'INSERT INTO restaurants SET ? ';
		var post = {idrestaurants:count,res_name:app.writereview.subject,res_address:app.writereview.locations,res_review:app.writereview.review,res_rating:app.writereview.Rating,res_city:app.writereview.city};
	}
	else if (app.writereview.category=="Food"){
		var sql = 'INSERT INTO food SET ? ';
		var post = {idfood:count,food_name:app.writereview.subject,food_address:app.writereview.locations,food_review:app.writereview.review,food_rating:app.writereview.Rating,food_city:app.writereview.city};
	}
	else if (app.writereview.category=="Nightlife"){
		var sql = 'INSERT INTO nightlife SET ? ';
		var post = {nightlifeid:count,nightlife_name:app.writereview.subject,nightlife_address:app.writereview.locations,nightlife_review:app.writereview.review,nightlife_rating:app.writereview.Rating,nightlife_city:app.writereview.city};
	}
	else if (app.writereview.category=="Japanese"){
		var sql = 'INSERT INTO japanese SET ? ';
		var post = {japaneseid:count,japanese_name:app.writereview.subject,japanese_address:app.writereview.locations,japanese_review:app.writereview.review,japanese_rating:app.writereview.Rating,japanese_city:app.writereview.city};
	}
	else if (app.writereview.category=="coffee"){
		var sql = 'INSERT INTO coffee SET ? ';
		var post = {coffeeid:count,coffee_name:app.writereview.subject,coffee_address:app.writereview.locations,coffee_review:app.writereview.review,coffee_rating:app.writereview.Rating,coffee_city:app.writereview.city};
	}
	else if (app.writereview.category=="chinese"){
		var sql = 'INSERT INTO chinese SET ? ';
		var post = {chineseid:count,chinese_name:app.writereview.subject,chinese_address:app.writereview.locations,chinese_review:app.writereview.review,chinese_rating:app.writereview.Rating,chinese_city:app.writereview.city};
	}
	else if (app.writereview.category=="bars"){
		var sql = 'INSERT INTO bars SET ? ';
		var post = {barsid:count,bars_name:app.writereview.subject,bars_address:app.writereview.locations,bars_review:app.writereview.review,bars_rating:app.writereview.Rating,bars_city:app.writereview.city};
	}
	else if (app.writereview.category=="beauty"){
		var sql = 'INSERT INTO beauty SET ? ';
		var post = {beautyid:count,beauty_name:app.writereview.subject,beauty_address:app.writereview.locations,beauty_review:app.writereview.review,beauty_rating:app.writereview.Rating,beauty_city:app.writereview.city};
	}
	else if (app.writereview.category=="automotive"){
		var sql = 'INSERT INTO automotive SET ? ';
		var post = {autoid:count,auto_name:app.writereview.subject,auto_address:app.writereview.locations,auto_review:app.writereview.review,auto_rating:app.writereview.Rating,auto_city:app.writereview.city};
	}
	else if (app.writereview.category=="home"){
		var sql = 'INSERT INTO home SET ? ';
		var post = {homeid:count,home_name:app.writereview.subject,home_address:app.writereview.locations,home_review:app.writereview.review,home_rating:app.writereview.Rating};
	}
	else if (app.writereview.category=="health"){
		var sql = 'INSERT INTO health SET ? ';
		var post = {healthid:count,health_name:app.writereview.subject,health_address:app.writereview.locations,health_review:app.writereview.review,health_rating:app.writereview.Rating};
	}
	else {
		var sql = 'INSERT INTO local SET ? ';
		var post = {localid:count,local_name:app.writereview.subject,local_address:app.writereview.locations,local_review:app.writereview.review,local_rating:app.writereview.Rating};
	}

	connection.query(sql, post, function(err, results) {
		if(err){
			error = err.toString();
			exports.error = error;
			console.log(error);
		}
		else {
			console.log("success");

		}
	});
	connection.release();
	});

	}


exports.insertAndQuery = insertAndQuery;
exports.fetchData = fetchData;
exports.getData = getData;
exports.insertData = insertData;