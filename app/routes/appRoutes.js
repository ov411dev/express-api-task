'use strict';
module.exports = function(app) {
  var temp = require('../controller/appController');
  // Routes
  app.route('/temp')
    .get(temp.getTemp);

  app.route('/temp/mean/:date')
    .get(temp.getMeanTempByDate);

  app.route('/temp/median/:date')
    .get(temp.getMedianTempByDate);
}
