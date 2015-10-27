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

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },

    initialize: function() {
      this.model.on('change', this.render, this);
      this.model.on('destroy', this.remove, this);
    },

    events: {
      'dblclick label': 'edit',
      'keypress .edit': 'updateOnEnter',
      'blur .edit': 'close',
      'click .destroy': 'destroy',
      'change .toggle': 'complete'
    },

    complete: function(e){
      var value = this.$el.find('.toggle').is(':checked');
      this.model.save({
        completed: value
      });

      widget.head.addAll();
    },

    edit: function(e) {
      this.$el.addClass('editing');
      this.$el.find('.edit-input').focus();
    },

    close: function(e) {
      var value = this.$el.find('.edit-input').val().trim();
      if (value) {
        this.model.save({
          title: value
        });
      }
      this.$el.removeClass('editing');
    },

    updateOnEnter: function(e) {
      if (e.which === 13) {
        this.close();
      }
    },

    destroy: function() {
      this.model.destroy();
    }
  });

  return ItemHeadView;
};
