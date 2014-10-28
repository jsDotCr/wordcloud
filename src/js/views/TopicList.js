/* global define */

define(['backbone', 'marionette', 'underscore', 'views/TopicItem'], function(Backbone, Marionette, _, TopicItemView) {
  "use strict";

  return Backbone.Marionette.CollectionView.extend({
    /**
     * Delta to determine which font size should be used. It's computed by getFontThreshold().
     */
    fontThreshold: null,

    /**
     * Maximum number of different font sizes to be used by a single model's view.
     */
    maxFontSizes: 6,

    childView: TopicItemView,
    childViewOptions: function(){
      /*
       To decouple this between this TopicListView and its children, the single model's views, this fontSize
       object is passed, with the computed threshold and the max different sizes that can be used.
       */
      return {
        fontSize: {
          threshold: this.fontThreshold,
          maxDifferentSizes: this.maxFontSizes
        }
      };
    },

    classNames: {
      shrinked: 'col__primary--shrinked'
    },

    initialize: function(options){
      this.fontThreshold = this.getFontThreshold();

      /**
       * If a container (aka: a region) is specified as option parameter, a callback on the show:focusedTopic event
       * gets attached. This is triggered by the controller when it knows the topic list's container must be shrinked
       * down.
       */
      if (options.container){
        this.listenTo(options.controller, 'show:focusedTopic', function(){
          if (options.container.$el){
            options.container.$el.addClass(this.classNames.shrinked);
          }
        });
      }
    },

    /**
     * Based on the collection's models, it calculates the min and max values appearing as 'sentimentScore' property.
     *
     * @returns {{min: (sentimentScore), max: (sentimentScore)}}
     */
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

    /**
     * Based on the min/max sentimentScore, it computes the delta between each different font size to be used.
     *
     * @returns {number} The font delta to be used.
     */
    getFontThreshold: function(){
      var bounds = this.getSentimentMinMax();
      return (bounds.max - bounds.min) / this.maxFontSizes;
    }
  });
});
