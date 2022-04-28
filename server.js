//run server with "node server.js"

const express = require('express');
const exphbs = require('express-handlebars');

var peopleData = require('./peopleData');
var orderData = require('./orderData');

const app = express()
var PORT = 3000

app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', function (req, res, next) {
	res.status(200).sendFile(__dirname + '/public/index.html');
});

app.get('/people', (req, res, next) => {
	res.status(200).render("peoplePage", {
		peopleData
	})
	console.log("people page called")
});

app.get('/orders/:person', (req, res, next) => {
	res.status(200).render("orderPage", {
      	orderData
    })
})

app.listen(PORT, function() {
	console.log("server is listening on port " + PORT)
})