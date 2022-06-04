module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getAllItems(res, mysql, context, complete) { //function to get all items from database
        mysql.pool.query("SELECT itemId, itemTitle, itemDesc, price FROM item", function (error, results, fields) { //SQL query to get items
            if (error) { //checks if there is an error, if so error is logged
                res.write(JSON.stringify(error));
                res.end();
            }
            context.item = results;
            console.log(results)
            complete();
        });
    }

    function searchItems(res, mysql, context, complete, search) { //gets item based on specific itemId
        mysql.pool.query("SELECT itemId, itemTitle, itemDesc, price FROM item WHERE itemId LIKE '" + search + "'", function (error, results, fields) {
            if (error) { //checks if there is an error, if so error is logged
                res.write(JSON.stringify(error));
                res.end();
            }
            context.item = results;
            console.log(results)
            complete();
        });
    }

    router.get('/', function(req, res){ //gets item data from database with functions and renders item page with data
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        if (req.query.search != null) {
            const search = req.query.search.toLowerCase();
            console.log("Searching for: " + search)
            searchItems(res, mysql, context, complete, search); 
        }
        else {
            console.log("Get all items called")
            getAllItems(res, mysql, context, complete); //gets items from getAllItems function
        }
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('itemPage', context); //renders item page with data
            }
        }
    });

    router.delete('/:itemId', function (req, res) { //deletes item based on itemId
        console.log('param', req.params.items);
        console.log("Item Deleted: " + req.params.itemId);
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM item WHERE itemId = ?"; //SQL query to delete item based on itemId
        var inserts = [req.params.itemId];
        sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
            if (error) { //checks if there is an error, if so error is logged
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