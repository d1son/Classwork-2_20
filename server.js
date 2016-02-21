//express setup, initializing express
var express = require('express');
var app = express();
var port = 3000;
var bodyParser = require("body-parser");

//database setup
var Sequelize = require('sequelize');
var connection = new Sequelize('chocolate_db', 'root');

//handlebars setup, setting default lauout, 
var expressHandlebars = require('express-handlebars');
app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main' //setting the default layout to the "main.handlebars" in the layouts folder
}));
app.set('view engine', 'handlebars'); 

app.use(bodyParser.urlencoded({
	extended: false
}));

// Creates the table "Chocolate" 
var Chocolate = connection.define("chocolate", {
	name: Sequelize.STRING,
	satisfaction: Sequelize.INTEGER
});

//routes
// app.get('/', function(req, res) { //using express to set up the route, render implies that we're rendering a template, in the views folder there should be a file named "chocolate"
//     res.render('chocolate');
// });

app.get("/", function(req, res){
	Chocolate.findAll({}).then(function(chocolates) {
		res.render("chocolate", {chocolates})
	});
});



// Chocolate.bulkCreate([ // this will create multiple entries into the chocolate table, but it may cause errors because everytime you restart the server it may add new table entries
// 	{ name: "Dark Chocolate", satisfaction: 8 },
// 	{ name: "Couverture", satisfaction: 5 },
// 	{ name: "Milk Chocolate", satisfaction: 10 }
// ]);

// database connection via sequelize, we're listening to the port 
connection.sync().then(function() {
  app.listen(port, function() {
      console.log("Listening on:" + port)
  });
});