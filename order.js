module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getAllOrders(res, mysql, context, complete){
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

    function searchOrders(res, mysql, context, complete, search) {
        mysql.pool.query("SELECT orderId, orderDate, customerId FROM `order` WHERE orderId LIKE '" + search + "'", function (error, results, fields) {
                if (error) {
                    res.write(JSON.stringify(error));
                    res.end();
                }
                context.order = results;
                console.log(results)
                complete();
            });
    }

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
        if (req.query.search != null) {
            const search = req.query.search.toLowerCase();
            console.log("Searching for: " + search)
            searchOrders(res, mysql, context, complete, search); 
        }
        else {
            console.log("Get all orders called")
            getAllOrders(res, mysql, context, complete);
        }
        getItem(res, mysql, context, complete);
        getPeople(res, mysql, context, complete);
        console.log('boom')
        function complete(){
            callbackCount++;
            if(callbackCount >= 3){
                res.render('orderPage', context);
            }
        }
    });

    router.post('/', function(req, res){
        console.log('OK', req.body.order)
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "insert into `order`(orderDate, customerId) values(?,?);";
        var inserts = [req.body.orderDate, req.body.customerId];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/orders');
            }
        });
    });

    router.delete('/:orderId', function (req, res) {
        console.log('param', req.params.orders);
        console.log("Order Deleted: " + req.params.orderId);
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM `order` WHERE orderId = ?";
        var inserts = [req.params.orderId];
        sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
            if (error) {
                console.log('no good')
                console.log(error)
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            } else {
                console.log('good');
                res.status(202).end();
            }
        })
    });

    return router;
}();