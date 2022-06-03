//run server with "node server.js"

const express = require('express');
const exphbs = require('express-handlebars');
var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');

var port = 3000;
const app = express()
var handlebars = require('express-handlebars').create({
	defaultLayout:'main',
});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({extended:true}));
app.use('/static', express.static('public'));
app.set('mysql', mysql);
app.use('/items', require('./item.js'));
app.use('/people', require('./people.js'));
app.use('/orders', require('./order.js'));
app.use('/detailsOrder', require('./orderItem.js'))
app.use(express.static('public'))

app.listen((port), function(){
	console.log('Express started on http://localhost:' + (port) + '; press Ctrl-C to terminate.');
});