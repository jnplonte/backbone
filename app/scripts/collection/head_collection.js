var $ = require('jquery'),
  _ = require('underscore'),
  JSON2 = require('JSON2'),
  Backbone = require('backbone');
Backbone.$ = $;
Backbone.LocalStorage = require("backbone.localstorage");

module.exports = function(widget) {
  "use strict";

  var HeadModel = require('./../model/head_model.js')(widget);

  var HeadCollection = Backbone.Collection.extend({
    model: HeadModel,
    localStorage: new Backbone.LocalStorage(widget.str)
  });

  return HeadCollection;
};
