var Handlebars = require('hbsfy/runtime');

Handlebars.registerHelper('helper_test', function(key, options) {
   return new Handlebars.SafeString('help-me');
});
