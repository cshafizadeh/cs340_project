//run server with "node server.js"

const express = require('express');
const exphbs = require('express-handlebars');
var mysql = require('./dbcon.js'); //connects to database to retrieve data
var bodyParser = require('body-parser');

const app = express()
var handlebars = require('express-handlebars').create({
	defaultLayout:'main',
}); //home page

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({extended:true}));
app.use('/static', express.static('public'));
app.set('mysql', mysql);
app.use('/items', require('./item.js')); //item pag
app.use('/people', require('./people.js')); //customer page
app.use('/orders', require('./order.js')); //order page
app.use('/detailsOrder', require('./orderItem.js')) //orderItems. Not a page but used to link orders and items
app.use(express.static('public'));
app.set('port', 3000);

app.listen(app.get('port'), function () {
	console.log("Server listing on port " + app.get('port') + " Press Ctrl+C to terminate.");
});