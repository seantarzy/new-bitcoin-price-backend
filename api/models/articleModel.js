"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var ArticleSchema = new Schema({
  title: {
    type: String,
    required: "Kindly enter the name of the article",
  },
  content: { type: String },
  img: {
    type: String,
    default: null,
  },
  source_url: {type: String},
  author: { type: String },
});

var Article = mongoose.model("Articles", ArticleSchema);

module.exports = {Article}

