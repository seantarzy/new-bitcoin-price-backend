"use strict";
module.exports = function (app) {
  var article = require("../controllers/articleController");

  // item Routes
  app.route("/articles").get(article.list_all_articles);

  app.route("/articles/:articleId");

  app.post("/article", article.create_an_article)
};
