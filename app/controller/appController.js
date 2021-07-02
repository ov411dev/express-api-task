'use strict';

var Temp = require('../model/appModel.js');

exports.getTemp = function(req, res) { console.log(req.user);
  if(req.user === undefined) {
    res.sendStatus(401)
  } else {
    Temp.getTemp(function(err, task) {
      console.log('controller')
      if (err) {
        res.send(err);
      }
      console.log('res', task);
      res.send(task);
    });
  }
};

exports.getMeanTempByDate = function(req, res) {
  Temp.getMeanTempByDate(req.params.date, function(err, task) {
    if (err) {
      res.send(err);
    }
    res.json(task);
  });
};

exports.getMedianTempByDate = function(req, res) {
  Temp.getMedianTempByDate(req.params.date, function(err, task) {
    if (err) {
      res.send(err);
    }
    res.json(task);
  });
};