var express = require("express"),
 cors = require('cors'),

    // fs = require('fs'),
    // https = require('https'),
  app = express(),
  port = process.env.PORT || 3000,
    mongoose = require("mongoose"),
// Item = require("./api/models/itemModel"), //created model loading here
    bodyParser = require("body-parser");

    mongoose.Promise = global.Promise;


    mongoose.connect("mongodb://localhost/itemdb", { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

const pem = require('pem');

const {key, cert} = async () => {
	try {
		const certdir = (await fs.readdir("/etc/letsencrypt/live"))[0];

		return {
			key: await fs.readFile(`/etc/letsencrypt/live/${certdir}/privkey.pem`),
			cert: await fs.readFile(`/etc/letsencrypt/live/${certdir}/fullchain.pem`)
		}
	}catch(e) {
		return new Promise((res, rej) => {
			pem.createCertificate({days: 1, selfSigned: true}, function (err, keys) {
				if (err) {
					rej();
				}else {
					res({key: keys.serviceKey, cert: keys.certificate});
				}
			});
		});
	}
};

console.log("certifications: ",key, cert)

// var key = fs.readFileSync(__dirname + "/selfsigned.key");
// var cert = fs.readFileSync(__dirname + "/selfsigned.crt");
// var options = {
//   key: key,
//   cert: cert,
// };

// var server = https.createServer(options, app);


var itemRoutes = require('./api/routes/itemRoutes'); //importing route
var bitcoinPriceRoutes = require("./api/routes/bitcoinPriceRoutes");


bitcoinPriceRoutes(app); //register the route
itemRoutes(app);

var homeRoute = require("./api/routes/homeRoute");

homeRoute(app);
app.listen(port);

console.log("bitcoin server started on: " + port);


app.use(function (req, res) {
  res.status(404).send({ url: req.originalUrl + " not found" });
  res.end();
});
//middleware to redirect