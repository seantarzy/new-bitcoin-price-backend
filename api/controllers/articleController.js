"use strict";

var mongoose = require("mongoose");
var {Article} = require("../models/articleModel");


exports.list_all_articles = function (req, res) {
  Article.find({}, function (err, articles) {
    if (err) res.send(err);
    res.json(articles);
  });
};

exports.create_an_article = function (req, res) {
    console.log("creating an article")
  var article = new Article(req.body);
  article.save(function (err, new_article) {
    if (err) res.send(err);
    res.json(new_article);
  });
};
