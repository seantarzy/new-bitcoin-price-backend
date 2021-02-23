"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var unirest = require("unirest");
var nconf = require("nconf");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
var ItemSchema = new Schema({
  title: {
    type: String,
    required: "Kindly enter the name of the item",
  },
  image: {
    type: String,
    default: null,
  },
  price: { type: String },
});

let Item = mongoose.model("Items", ItemSchema);

let date = new Date();

let fullYear = date.getFullYear();

let day = date.getDate();

let month = date.getMonth();


date = `${month}/${day}/${fullYear}`;

nconf.use("file", { file: "./config.json" });
nconf.load();