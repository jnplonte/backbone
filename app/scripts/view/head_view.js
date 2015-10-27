var $ = require('jquery'),
  _ = require('underscore'),
  JSON2 = require('JSON2'),
  Backbone = require('backbone');
Backbone.$ = $;

module.exports = function(widget) {
  "use strict";

  var HeadCollection = require('./../collection/head_collection.js')(widget), ItemHeadView = require('./../view/head_item_view.js')(widget), TextHeadView = require('./../view/head_text_view.js')(widget);

  var headCollection = new HeadCollection();

  var HeadView = Backbone.View.extend({
    el: $('.head'),

    input: null,

    template: require('./../template/head.hbs'),

    initialize: function() {
      headCollection.on('add', this.addOne, this);
      headCollection.on('reset', this.addAll, this);
      headCollection.fetch();

      this.render();
    },

    events: {
      'keypress #new-todo': 'createTodoOnEnter',
      'keyup #new-todo': 'createTodoOnText'
    },

    createTodoOnEnter: function(e){
      if(!this.input){ this.input = $(e.currentTarget); }

      if ( e.which !== 13 || !this.input.val().trim() ) {
        this.changeText(this.input.val().trim());
        return;
      }else{
        headCollection.create(this.newAttributes());
        this.input.val('');
      }
    },

    createTodoOnText: function(e){
      if(!this.input){ this.input = $(e.currentTarget); }
      
      this.changeText(this.input.val().trim());
    },

    changeText: function(text){
      var textHeadView = new TextHeadView({model: text});
      $('#text-list').html(textHeadView.render().el);
    },

    addOne: function(todo){
      var itemHeadView = new ItemHeadView({model: todo});
      $('#todo-list').append(itemHeadView.render().el);
    },

    addAll: function(){
      headCollection.each(this.addOne, this);
    },

    newAttributes: function(){
      return {
        title: this.input.val().trim(),
        completed: false
      }
    },

    render: function() {
      var self = this;

      this.$el.html(this.template()).promise().done(function() {
        self.input = self.$el.find('#new-todo');
        self.addAll();
      });
    }

  });

  widget.head = new HeadView();

  return widget.head;
};
