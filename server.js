const express = require('express'),
  app = express(),
  jsonwebtoken = require("jsonwebtoken"),
  bodyParser = require('body-parser');
  port = process.env.PORT || 8000;

require('dotenv').config();
const mysql = require('mysql');
// connection configurations
const mc = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE
});
 
// connect to database
mc.connect();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {console.log(req.headers.authorization);
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[1] === 'JWT') {

    jsonwebtoken.verify(req.headers.authorization.split(' ')[2], 'JWT_SECRET', function(err, decode) {
      if (err) {
		    console.log(err.message);
		    req.user = undefined;
	    } else {
        req.user = decode;
      }
      next();
    });
  } else {
    console.log("NO JWT");
    req.user = undefined;
    next();
  }
});

var routes = require('./app/routes/appRoutes'); //importing route
routes(app); //register the route

app.listen(port);
console.log('API server started on: ' + port);