define(['backbone', 'marionette', 'handlebars', 'text!templates/topicItem.hbs'], function(Backbone, Marionette, Handlebars, tmpl) {
  "use strict";

  return Backbone.Marionette.ItemView.extend({
    template: Handlebars.compile(tmpl),
    tagName: 'span',
    events: {
      'click': 'showItemDetails'
    },

    serializeData: function(){
      var sentimentScore = this.model.get('sentimentScore');

      return _.extend(this.model.toJSON(), {
        isSentimentCool: sentimentScore > 60,
        isSentimentBad: sentimentScore < 40,
        fontSize: this.getFontSize(sentimentScore)
      })
    },

    getFontSize: function(sentimentScore){
      var delta = this.options.fontSize.threshold,
        maxDifferentSizes = this.options.fontSize.maxDifferentSizes,
        fontSize = 0,
        i = 1;
      do {
        if (sentimentScore <= delta*i){
          fontSize = i;
        }
        i++;
      } while (!fontSize && i <= maxDifferentSizes);

      return fontSize;
    }
  });
});
