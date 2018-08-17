var configInfo = require('./app/configurations');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
// Connect to MongoDB on mlab
mongoose.connect(configInfo,{ useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// Get the route info
var offerRoutes = require('./app/routes/offerRoutes');
offerRoutes(app);

// Start listening on the port
var port = process.env.PORT || 3000;
app.listen(port);