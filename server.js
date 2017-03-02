// REQUIREMENTS
var express     = require('express');
var logger      = require('morgan');
var app         = express();
var port        = 4000 || process.env.PORT;

// MIDDLEWARE
app.use(express.static('public'));

// LISTENERS
app.listen(port, function() {
  console.log("Server Initialized");
  console.log("Listening on " + port);
})
