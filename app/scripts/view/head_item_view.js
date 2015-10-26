var $ = require('jquery'),
  _ = require('underscore'),
  JSON2 = require('JSON2'),
  Backbone = require('backbone');
Backbone.$ = $;

module.exports = function(widget) {
  "use strict";

  var ItemHeadView = Backbone.View.extend({
    tagName: 'li',
    template: require('./../template/head_item.hbs'),
    render: function(){
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });

  return ItemHeadView;
};
