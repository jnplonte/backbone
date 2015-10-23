var $ = require('jquery'),
  _ = require('underscore'),
  JSON2 = require('JSON2'),
  Backbone = require('backbone');
Backbone.$ = $;

var mainViewTemplate = require('./template/main.hbs');

global.App = function(widgetEl, params) {
  "use strict";

  var widget = {};

  widget.elm = widgetEl;

  var MainView = Backbone.View.extend({
    el: widget.elm,

    initialize: function() {
      this.render();
    },

    render: function() {
      this.$el.html(mainViewTemplate).promise().done(function(){
          require('./view/head_view.js')(widget);
      });
    }
  });

  widget.mainView = new MainView();

  return widget;
}
