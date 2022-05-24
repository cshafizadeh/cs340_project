module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getPeople(res, mysql, context, complete){
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

    router.get('/people', function(req, res){
        var callbackCount = 0;
        var context = {};
        //context.jsscripts = ["deleteperson.js","filterpeople.js","searchpeople.js"];
        var mysql = req.app.get('mysql');
        getPeople(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('peoplePage', context);
            }
        }
    });

    router.post('/people', function(req, res){
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


    return router;
}();