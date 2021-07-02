const express = require('express'),
  app = express(),
  bodyParser = require('body-parser');
  port = process.env.PORT || 8000;

app.listen(port);
console.log('API server started on: ' + port);