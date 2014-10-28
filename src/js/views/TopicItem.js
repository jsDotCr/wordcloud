/* global define, _ */

define(['backbone', 'marionette', 'handlebars', 'text!templates/topicItem.hbs'], function(Backbone, Marionette, Handlebars, tmpl) {
  "use strict";

  return Backbone.Marionette.ItemView.extend({
    template: Handlebars.compile(tmpl),
    tagName: 'span',
    events: {
      'click': 'showItemDetails'
    },

    /**
     * By default, the font size is 2. This is used whenever a fontSize object is not passed in the view options object.
     */
    defaultFontSize: 2,

    /**
     * Extending the basic model's data with some useful rendering infos, like the sentimentScore "range" (cool or not
     * cool) and the topic's font size.
     *
     * @returns {*}
     */
    serializeData: function(){
      var sentimentScore = this.model.get('sentimentScore');

      return _.extend(this.model.toJSON(), {
        isSentimentCool: sentimentScore > 60,
        isSentimentNotCool: sentimentScore < 40,
        fontSize: this.getFontSize(sentimentScore)
      });
    },

    /**
     * Given the topic's sentimentScore, it returns which font size should be used by the template.
     *
     * @param sentimentScore The model's sentimentScore property. It could actually be any number.
     * @returns {number}
     */
    getFontSize: function(sentimentScore){
      var fontSizeOptions = this.options.fontSize;
      if (!fontSizeOptions || !_.isNumber(sentimentScore)){
        return this.defaultFontSize;
      }

      var delta = fontSizeOptions.threshold,
        maxDifferentSizes = fontSizeOptions.maxDifferentSizes,
        fontSize = 0,
        i = 1;
      do {
        if (sentimentScore <= delta*i){
          fontSize = i;
        }
        i += 1;
      } while (!fontSize && i <= maxDifferentSizes);

      return fontSize;
    }
  });
});
