//run server with "node server.js"

var fs = require("fs");
var http = require('http');
var PORT = 3000;

var idxData

var indexData = fs.readFile('./index.html', 'utf8', function(err, data){
	if(err){
		throw err
	}
	idxData = data
})

var server = http.createServer(function(req, res) {
	if(req.url === "/"){
		res.statusCode = 200
		res.setHeader('Content-Type', 'text/html')
		res.write(idxData)
		res.end()
		console.log("main page loaded")
    }
})


server.listen(PORT, function() {
	console.log(" == Server is listening on port " + PORT);	
})