define(['backbone', 'handlebars', 'text!./topicTemplate.hbs'], function(Backbone, Handlebars, tmpl) {
  "use strict";

  return Backbone.View.extend({
    template: Handlebars.compile(tmpl)
  });
});
