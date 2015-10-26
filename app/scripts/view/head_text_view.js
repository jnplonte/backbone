var $ = require('jquery'),
  _ = require('underscore'),
  JSON2 = require('JSON2'),
  Backbone = require('backbone');
Backbone.$ = $;

module.exports = function(widget) {
  "use strict";

  var TextHeadView = Backbone.View.extend({
    tagName: 'label',
    template: require('./../template/head_text.hbs'),
    render: function(){
      this.$el.html(this.template({"text":this.model}));
      return this;
    }
  });

  return TextHeadView;
};
