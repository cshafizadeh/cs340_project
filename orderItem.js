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

    router.delete('/:orderId/:itemId', function (req, res) {
        console.log('param', req.params.orders);
        console.log("Order Item Deleted: " + req.params.orderId + "/" + req.params.itemId);
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM `orderItem` WHERE orderId = ? AND itemId = ?";
        var inserts = [req.params.orderId, req.params.itemId];
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