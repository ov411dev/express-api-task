'user strict';
var sql = require('./db.js');

//object constructor
var Temp = function() {
    this.created_at = new Date();
};

// it is just for testing API (DB connection and route is up and JWT authentication)
Temp.getTemp = function (result) {
    sql.query("SELECT * FROM climate LIMIT 1", function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        } else { 
            result(null, res);
        }
    });   
};

module.exports = Temp;
