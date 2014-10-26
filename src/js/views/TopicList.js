define(['backbone', 'marionette', 'underscore', 'views/TopicItem'], function(Backbone, Marionette, _, TopicItemView) {
  "use strict";

  return Backbone.Marionette.CollectionView.extend({
    maxFontSizes: 6,

    childView: TopicItemView,
    childViewOptions: function(){
      return {
        fontSize: {
          threshold: this.fontThreshold,
          maxDifferentSizes: this.maxFontSizes
        }
      };
    },

    classNames: {
      twoThirdsColumn: 'col--twothirds'
    },

    initialize: function(options){
      this.fontThreshold = this.getFontThreshold();
      this.listenTo(options.controller, 'show:focusedTopic', function(){
        options.region.$el.addClass(this.classNames.twoThirdsColumn);
      });
    },

    getSentimentMinMax: function(){
      var modelList = this.collection.toJSON();

      return {
        min: _.min(modelList, function(model){
          return model.sentimentScore;
        }).sentimentScore,
        max: _.max(modelList, function(model){
          return model.sentimentScore;
        }).sentimentScore
      };
    },

    getFontThreshold: function(){
      var bounds = this.getSentimentMinMax();
      return (bounds.max - bounds.min) / this.maxFontSizes;
    }
  });
});
