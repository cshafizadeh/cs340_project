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
app.use('/items', require('./item'));
app.use('/people', require('./people.js'));
app.use('/orders', require('./order.js'));
app.use(express.static('public'))

/*
app.get('/people', (req, res, next) => {
	var data = peopleData;
	if (req.query.search != null) {
		const search = req.query.search.toLowerCase();
		data = peopleData.filter(person => {
			const fullName = person.firstname + ' ' + person.lastname;
			return person.firstname.toLowerCase() == search || person.lastname.toLowerCase() == search
				|| fullName.toLowerCase() == search;
		});
	}
	res.status(200).render("peoplePage", {
		filteredPeopleData: data
	})
	console.log("people page called");
});
*/
/*
app.get('/orders/:person', (req, res, next) => {
	var person = req.params.person.toLowerCase();
	var personData = peopleData[person]
	console.log("  -- personData:", personData)
	if(personData){
		
		res.status(200).render("orderPage", {
			//peopleData
			orderData
		})
		console.log("order page called")
	}
	else {
		next();
	}
});
*/   /*
app.get('/items', (req, res, next) => {
	console.log("items!")
	res.status(200).render("itemPage", {
		itemData
	})
	console.log("items page called")
})
*/
app.listen((port), function(){
	console.log('Express started on http://localhost:' + (port) + '; press Ctrl-C to terminate.');
});