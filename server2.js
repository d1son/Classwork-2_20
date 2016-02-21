var express = require("express");
var app = express();
var expressHandlebars = require("express-handlebars");
var bodyParser = require("body-parser");
var mySql = require("mysql");
var Sequelize = require("sequelize");
var PORT = 8080;
var passport = require("passport");
var passportLocal = require("passport-local");
var bcrypt = require("bcryptjs");
var session = require("express-session");


var connection = new Sequelize("login_db", "root");

var expressHandlebars = ("experss-handlebars");
app.engine("handlebars", expressHandlebars({
	defaultlayout: "main"
}));

app.set("view engine", "handlebars");

app;use(bodyParser, urlencoded({
	extended: false
}));

app.use(require('express-session')({
	secret: "SECRET",
	resave: true,
	saveUninitialized: true,
	cookie : { secure : false, maxAge : (4 * 60 * 60 * 1000) }, // 4 hours
}));

var User = sequelize.define("user", {
	username: {
		type: Sequelize.STRING,
		validate: {
			allowNull: false, 
			unique: true,
			len: {
				arg: [5, 10],
				msg: "Your user name needs to be between 5 and 10 characters"
			}
		} 
	},
	email: {
		type: Sequelize.STRING,
		validate: {
			allowNull: false,
			unique: true
		}
	},
	password: {
		type: Sequelize.STRING,
		validate: {
			allowNull: false,
			unique: true,
			len: {
				arg: [5, 20],
				msg: "Your password needs to be between 5 and 20 characteres"
			}
		}
	}
});

connection.sync().then(function() {
  app.listen(port, function() {
      console.log("Listening on:" + port)
  });
});