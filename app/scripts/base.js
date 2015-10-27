var $ = require('jquery'),
  _ = require('underscore'),
  JSON2 = require('JSON2'),
  Backbone = require('backbone');
Backbone.$ = $;

var baseTemplate = require('./template/main.hbs');

var configs = require('./../configs/site.json');

global.App = function(widgetEl, params) {
  "use strict";

  var widget = {};

  widget.elm = widgetEl;
  widget.str = 'test';
  widget.fltr= null;

  var BaseView = Backbone.View.extend({
    el: $(widget.elm),

    initialize: function() {
      this.render();
    },

    render: function() {
      this.$el.html(baseTemplate).promise().done(function() {
        require('./view/head_view.js')(widget);
        require('./service/routes.js')(widget);
      });
    }
  });

  require('./helper/handlebars_helper.js');

  widget.base = new BaseView();

  return widget;
}
