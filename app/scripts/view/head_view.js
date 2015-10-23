var $ = require('jquery'),
  _ = require('underscore'),
  JSON2 = require('JSON2'),
  Backbone = require('backbone');
Backbone.$ = $;

var headViewTemplate = require('./../template/head.hbs');

module.exports = function(widget) {
  "use strict";

  var HeadView = Backbone.View.extend({
      el: $('.head'),

      initialize: function(){
        this.render();
      },

      render: function(){
        this.$el.html( headViewTemplate );
      }

    });

    widget.headView = new HeadView();

    return widget.headView;
};
