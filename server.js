//run server with "node server.js"

var fs = require("fs");
var http = require('http');
var PORT = 4000;

var hdrData
var idxData
var cssData
var pplData

var hdrData = fs.readFile('./header.html', 'utf8', function(err, data){
	if(err){
		throw err
	}
	hdrData = data
})

var indexData = fs.readFile('./index.html', 'utf8', function(err, data){
	if(err){
		throw err
	}
	idxData = data
})

var pplData = fs.readFile("./style.css", 'utf8', function(err, data){
	if(err){
		throw err
 	}
	cssData = data
})

var indexData = fs.readFile('./people.html', 'utf8', function(err, data){
	if(err){
		throw err
	}
	pplData = data
})

var server = http.createServer(function(req, res) {
	if(req.url === "/"){
		res.statusCode = 200
		res.setHeader('Content-Type', 'text/html')
        res.write(hdrData)
		res.write(idxData)
		res.end()
		console.log("main page loaded")
    }
    else if(req.url === "/people"){
        res.statusCode = 200
		res.setHeader('Content-Type', 'text/html')
        res.write(hdrData)
		res.write(pplData)
		res.end()
		console.log("people page loaded")
    }
})


server.listen(PORT, function() {
	console.log(" == Server is listening on port " + PORT);	
})