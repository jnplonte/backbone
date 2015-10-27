var $ = require('jquery'),
  _ = require('underscore'),
  JSON2 = require('JSON2'),
  Backbone = require('backbone');
Backbone.$ = $;

module.exports = function(widget) {
  "use strict";

  var ServiceRoutes = Backbone.Router.extend({
    routes: {
      '*fltr': 'setFilter'
    },
    setFilter: function(params) {
      widget.fltr = (params) ? params.trim() : '';
      widget.head.addAll();
    }
  });

  widget.serviceRoutes = new ServiceRoutes();
  Backbone.history.start({pushState: true, root: '/'});

  return widget.serviceRoutes;
};
