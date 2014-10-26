define(['backbone', 'handlebars', 'text!templates/topicFocused.hbs'], function(Backbone, Handlebars, tmpl) {
  "use strict";

  return Backbone.Marionette.ItemView.extend({
    template: Handlebars.compile(tmpl),

    classNames: {
      oneThirdColumn: 'col--onethird'
    },

    onDomRefresh: function(){
      this.options.region.$el.addClass(this.classNames.oneThirdColumn);
    }
  });
});
