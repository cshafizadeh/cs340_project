var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'cs340_shafizac',
    password        : '5385',
    database        : 'cs340_shafizac'
})
module.exports.pool = pool;