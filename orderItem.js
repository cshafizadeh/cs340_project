module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getItem(res, mysql, context, complete){
        mysql.pool.query("SELECT itemId, itemTitle, itemDesc FROM item", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.item = results;
            console.log(results)
            complete();
        });
    }

    function getOrder(res, mysql, context, complete){
        mysql.pool.query("SELECT orderId, orderDate, customerId FROM `order`", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.order = results;
            console.log(results)
            complete();
        });
    }

    function getOrderDetails(res, mysql, context, complete){
        mysql.pool.query("SELECT orderId, itemId, quantity FROM `orderItem`", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.orderItem = results;
            console.log(results)
            complete();
        });
    }

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        //context.jsscripts = ["deleteperson.js","filterpeople.js","searchpeople.js"];
        var mysql = req.app.get('mysql');
        getOrderDetails(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('detailsOrder', context);
            }
        }
    });
    
    return router;
}();