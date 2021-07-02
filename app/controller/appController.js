'use strict';

var Temp = require('../model/appModel.js');

exports.getTemp = function(req, res) {
    Temp.getTemp(function(err, task) {
      console.log('controller')
      if (err) {
        res.send(err);
      }
      console.log('res', task);
      res.send(task);
    });
};