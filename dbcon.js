var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'cs340_laraje',
    password        : '8597',
    database        : 'cs340_laraje'
})
module.exports.pool = pool;