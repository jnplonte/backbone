var Handlebars = require('hbsfy/runtime');

Handlebars.registerHelper('helperTest', function(key, options) {
   return new Handlebars.SafeString('help-me');
});

Handlebars.registerHelper('checkCheck', function(key, options) {
   if(options){
     return new Handlebars.SafeString('checked="checked"');
   }
});
