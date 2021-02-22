var express = require("express"),
 cors = require('cors'),

  app = express(),
  port = process.env.PORT || 3000,
    mongoose = require("mongoose"),
    bodyParser = require("body-parser");

    mongoose.Promise = global.Promise;

    mongoose.connect("mongodb://localhost/", { useNewUrlParser: true, useUnifiedTopology: true });

    
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());


var itemRoutes = require('./api/routes/itemRoutes'); //importing route
var articleRoutes = require('./api/routes/articleRoutes'); //importing route
var homeRoute = require("./api/routes/homeRoute");

itemRoutes(app);
articleRoutes(app);
homeRoute(app);

app.listen(port);

console.log("bitcoin server started on: " + port);

app.use(function (req, res) {
  res.status(404).send({ url: req.originalUrl + " not found" });
  res.end();
});
//middleware to redirect