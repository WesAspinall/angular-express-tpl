var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');


var app = express();
app.use(express.static(__dirname + '/app'));


var server = app.listen(process.env.PORT || 8000, function () {
  var port = server.address().port;
  console.log('App now running on port', port);
});