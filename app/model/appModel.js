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

// mean temperature calculation by Date
Temp.getMeanTempByDate = function (date, result) {
    const meanTempQuery = "SELECT round(sum(mean_temperature)/count(*),2) as mean_temperature from climate WHERE LOCAL_DATE = ?";
    sql.query(meanTempQuery, formatDate(date) + " 0:00", function (err, res) {             
        if(err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, {mean_temperature: res[0].mean_temperature});
        }
    });   
};

// median temperature calculation by Date
Temp.getMedianTempByDate = function (date, result) {
    // get the total records count and figure out if it is odd or even
    sql.query("SELECT count(*) cnt, mod(count(*),2) as remainder FROM climate WHERE LOCAL_DATE = ?", formatDate(date) + " 0:00", function (err, res) {
            if(err) {
                console.log("error: ", err);
                result(null, err);
            } else {
                console.log('sql res : ', res[0].cnt);
                var median_temperature = null;
                if(res[0].cnt > 0) {
                    sql.query("SELECT mean_temperature FROM climate WHERE LOCAL_DATE = ? ORDER BY 1", formatDate(date) + " 0:00", function (err, res2) {
                        if(res[0].remainder) {
                            median_temperature_index = (res[0].cnt - 1)/2 + 1;
                        } else {
                            median_temperature_index = res[0].cnt/2;
                        }
                        console.log(median_temperature_index);
                        res2.forEach((item, index) => {
                            //console.log(item.mean_temperature);
                            if(median_temperature_index == index + 1) {
                                //console.log(res2[index + 1]);
                                if(res[0].remainder) {
                                    median_temperature = item.mean_temperature
                                } else {
                                    median_temperature = (item.mean_temperature + res2[index + 1].mean_temperature) / 2;
                                }
                                return;
                            }
                        })
                        result(null, {median_temperature: median_temperature});
                    })
                } else {
                    result(null, {median_temperature: null}); 
                }
            }
        });   
};

function formatDate(date) {
    var d = new Date(date),
        month = d.getMonth() + 1;
        day = d.getDate();
        year = d.getFullYear();

    return [month, day, year].join('/');
}

module.exports = Temp;
