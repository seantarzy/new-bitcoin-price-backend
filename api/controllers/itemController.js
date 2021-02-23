"use strict";

var mongoose = require("mongoose");
// mongoose.connect('mongodb://localhost300/items');
  let Item = require("../models/itemModel");

exports.list_all_items = function (req, res) {
  Item.find({}, function (err, item) {
    if (err) res.send(err);
    res.json(item);
  });
};

exports.create_an_item = function (req, res) {
  var new_task = new Item(req.body);
  new_task.save(function (err, task) {
    if (err) res.send(err);
    res.json(task);
  });
}
  exports.delete_all_items = function (req, res) {
    Item.deleteMany({}, function (err, items) {
      if (err) res.send(err);
      res.json(items);
    });
  };
