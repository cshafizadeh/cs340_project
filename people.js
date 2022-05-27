module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getAllPeople(res, mysql, context, complete){
        mysql.pool.query("SELECT customerId, customerFirstName, customerLastName FROM customer", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.people = results;
            console.log(results)
            complete();
        });
    }

    function searchPeople(res, mysql, context, complete, search) {
        mysql.pool.query("SELECT customerId, customerFirstName, customerLastName FROM customer WHERE " 
            + "customerFirstName LIKE '" + search + "' OR customerLastName LIKE '" + search
            + "' OR CONCAT (customerFirstName,' ', customerLastName) LIKE '" + search + "'", function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.people = results;
            console.log(results)
            complete();
        });
    }

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        //context.jsscripts = ["deleteperson.js","filterpeople.js","searchpeople.js"];
        var mysql = req.app.get('mysql');
        if (req.query.search != null) {
            const search = req.query.search.toLowerCase();
            console.log("Searching for: " + search)
            searchPeople(res, mysql, context, complete, search);
        }
        else {
            console.log("Get all people Called")
            getAllPeople(res, mysql, context, complete);
        }
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('peoplePage', context);
            }
        }
    });

    router.post('/', function(req, res){
        console.log('OK', req.body.person)
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO customer (customerFirstName, customerLastName) VALUES (?,?)";
        var inserts = [req.body.customerFirstName, req.body.customerLastName];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/people');
            }
        });
    }); 

    router.delete('/:customerId', function (req, res) {
        console.log("Customer Deleted: " + req.params.customerId);
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM customer WHERE customerId = ?";
        var inserts = [req.params.customerId];
        sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
            if (error) {
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