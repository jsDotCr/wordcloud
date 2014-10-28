/* global define */

define(['backbone', 'marionette', 'handlebars', 'underscore', 'text!templates/topicFocused.hbs'],
  function(Backbone, Marionette, Handlebars, _, tmpl) {
  "use strict";

  return Backbone.Marionette.ItemView.extend({
    template: Handlebars.compile(tmpl),
    className: 'spotlight',

    classNames: {
      visible: 'col__secondary--visible'
    },

    /**
     * It extends the model's data with the default '0' value for the three different sentiments.
     *
     * @returns {*} The data used by the template to get rendered.
     */
    serializeData: function(){
      var model = this.model.toJSON();

      _.forEach(['positive', 'neutral', 'negative'], function(mood){
        model.sentiment[mood] = model.sentiment[mood] || 0;
      });

      return model;
    },

    /**
     * Since at this point we are going to have some data to show, it's nice to show this view's container, too.
     */
    onShow: function(){
      this.options.container.$el.addClass(this.classNames.visible);
    }
  });
});
