'use strict';
module.exports = function(app) {
  var temp = require('../controller/appController');
  // Routes
  app.route('/temp')
    .get(temp.getTemp);

  app.route('/temp/:date')
    .get(temp.getTempByDate);
}
