var configInfo = require('./app/configurations');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
var cors = require('cors');

// Connect to MongoDB on mlab
mongoose.connect(configInfo,{ useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());
// Get the route info
var offerRoutes = require('./app/routes/offerRoutes');
offerRoutes(app);

// Start listening on the port
var port = process.env.PORT || 4000;
app.listen(port);