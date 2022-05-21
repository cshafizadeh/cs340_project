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

    router.get('/', function(req, res){
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
    return router;
}();