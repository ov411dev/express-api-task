'use strict';
module.exports = function(app) {
  // Routes
  app.route('/temp')
    .get(function(req, res){
      res.send({res:'ok'})
    });

  app.route('/temp/mean/:date')
    .get(function(req, res){
      console.log(req.params.date)
      res.send({res:'ok'})
    });

  app.route('/temp/median/:date')
   .get(function(req, res){
    console.log(req.params.date)
    res.send({res:'ok'})
  });

}
