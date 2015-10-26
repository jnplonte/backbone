var $ = require('jquery'),
  _ = require('underscore'),
  JSON2 = require('JSON2'),
  Backbone = require('backbone');
Backbone.$ = $;

module.exports = function(widget) {
  "use strict";

  var HeadModel = Backbone.Model.extend({
    defaults: {
      title: '',
      completed: false,
      created_at: Date()
    }
  });

  return HeadModel;
};
