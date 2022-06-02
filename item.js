module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getAllItems(res, mysql, context, complete) {
        mysql.pool.query("SELECT itemId, itemTitle, itemDesc, price FROM item", function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.item = results;
            console.log(results)
            complete();
        });
    }

    function searchItems(res, mysql, context, complete, search) {
        mysql.pool.query("SELECT itemId, itemTitle, itemDesc, price FROM item WHERE itemId LIKE '" + search + "'", function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.item = results;
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
            searchItems(res, mysql, context, complete, search);
        }
        else {
            console.log("Get all items called")
            getAllItems(res, mysql, context, complete);
        }
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('itemPage', context);
            }
        }
    });

    router.delete('/:itemId', function (req, res) {
        console.log('param', req.params.items);
        console.log("Item Deleted: " + req.params.itemId);
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM item WHERE itemId = ?";
        var inserts = [req.params.itemId];
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