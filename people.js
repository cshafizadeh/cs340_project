module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getAllPeople(res, mysql, context, complete){ //retrieves data for all customers
        mysql.pool.query("SELECT customerId, customerFirstName, customerLastName FROM customer", function(error, results, fields){ //SQl query to select data for all customers
            if(error){ //checks if there is an error, if so error is logged
                res.write(JSON.stringify(error));
                res.end();
            }
            context.people = results;
            console.log(results)
            complete();
        });
    }

    function searchPeople(res, mysql, context, complete, search) { //retreives data on specific customer selected by user search
        mysql.pool.query("SELECT customerId, customerFirstName, customerLastName FROM customer WHERE " 
            + "customerFirstName LIKE '" + search + "' OR customerLastName LIKE '" + search
            + "' OR CONCAT (customerFirstName,' ', customerLastName) LIKE '" + search + "'", function (error, results, fields) { //SQL query that finds specific customer if exists based on user input and sends it to the page
            if (error) { //checks if there is an error, if so error is logged
                res.write(JSON.stringify(error));
                res.end();
            }
            context.people = results;
            console.log(results)
            complete();
        });
    }

    router.get('/', function(req, res){ //this function gets the necissary data for the customer page and sends it to peoplePage.handlebars
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        if (req.query.search != null) {
            const search = req.query.search.toLowerCase();
            console.log("Searching for: " + search)
            searchPeople(res, mysql, context, complete, search); //calls function to get specific customer data
        }
        else {
            console.log("Get all people Called")
            getAllPeople(res, mysql, context, complete); //calls function to get all customer data
        }
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('peoplePage', context); //renders peoplePage.handlebars with requested data in 'context'
            }
        }
    });

    router.post('/', function(req, res){ //this function adds a customer into the database
        console.log('OK', req.body.person)
        console.log(req.body)
        var mysql = req.app.get('mysql'); //connects to database
        var sql = "INSERT INTO customer (customerFirstName, customerLastName) VALUES (?,?)"; //SQL query that creates a new customer
        var inserts = [req.body.customerFirstName, req.body.customerLastName];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){ //checks if there is an error, if so error is logged
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/people'); //refreshes people page with new customer 
            }
        });
    }); 

    router.delete('/:customerId', function (req, res) { //function to delete a customer
        console.log("Customer Deleted: " + req.params.customerId);
        var mysql = req.app.get('mysql'); //connects to database
        var sql = "DELETE FROM customer WHERE customerId = ?"; //SQL query to delete specific customer
        var inserts = [req.params.customerId];
        sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
            if (error) { //checks if there is an error in deleting customer, if so error is logged
                console.log(error)
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            } else {
                res.status(202).end();
            }
        })
    });

    return router;
}();