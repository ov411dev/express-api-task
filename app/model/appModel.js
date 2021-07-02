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

// both mean and median temperature calculation by Date
Temp.getTempByDate = function (date, result) {
    sql.query("SELECT climate.mean_temperature FROM (SELECT round(lng, 1) lng, round(lat, 1) lat FROM cities) tmp JOIN climate ON round(climate.lat, 1) = tmp.lat AND round(climate.lng, 1) = tmp.lng where local_date = ? ORDER BY 1", formatDate(date) + " 0:00", function (err, res) {
        temperature_count = res.length;
        var odd = temperature_count % 2;
        if(odd) {
            median_temperature_index = (temperature_count - 1)/2 + 1;
        } else {
            median_temperature_index = temperature_count/2;
        }
        var temperature_sum = 0;
        res.forEach((item, index) => {
            console.log(item.mean_temperature);
            temperature_sum += item.mean_temperature
            if(median_temperature_index == index + 1) {
                if(odd) {
                    median_temperature = item.mean_temperature
                } else {
                    median_temperature = (item.mean_temperature + res[index + 1].mean_temperature) / 2;
                }
            }
        })
        median_temperature = median_temperature.toFixed(1);
        mean_temperature = Math.round(temperature_sum/temperature_count).toFixed(1);
        result(null, {median_temperature: median_temperature, mean_temperature:mean_temperature});
    })
};

function formatDate(date) {
    var d = new Date(date),
        month = d.getMonth() + 1;
        day = d.getDate();
        year = d.getFullYear();

    return [month, day, year].join('/');
}

module.exports = Temp;
