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
  var article = new Article(req.body);
  console.log("creating....",article)
  article.save(function (err, new_article) {
    if (err) res.send(err);
    res.json(new_article);
    console.log("created an article", new_article)
  });
};
exports.delete_all_articles = function (req, res) {
 Article.deleteMany({}, function (err, articles) {
   if (err) res.send(err);
   res.json(articles);
 });
};
