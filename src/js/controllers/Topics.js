/* global define */

define(['marionette', 'json!topics.json', 'collections/TopicList', 'views/TopicList', 'views/FocusedTopic'],
  function(Marionette, topicsData, TopicListCollection, TopicListView, FocusedTopicView) {
  "use strict";

  return Marionette.Object.extend({
    initialize: function(options){
      this.options = options;

      if (!options.App){
        throw Error('Where\'s the app?');
      }

      this.topicListCollection = new TopicListCollection(options.topics || topicsData.topics, { });
      var topicListRegion = options.App.cloud,
        topicListView = new TopicListView({
          collection: this.topicListCollection,
          controller: this,
          container: topicListRegion
        });
      topicListRegion.show(topicListView);
      topicListView.render();
    },

    showFocusedTopic: function(id){
      var focusedTopicRegion = this.options.App.focusedTopic,
        focusedTopicModel = this.topicListCollection.findWhere({
          id: id
        }),
        focusedTopicView = new FocusedTopicView({
          model: focusedTopicModel,
          container: focusedTopicRegion
        });

      focusedTopicRegion.show(focusedTopicView);
      focusedTopicView.render();

      this.trigger('show:focusedTopic', {
        model: focusedTopicModel,
        view: focusedTopicView
      });
    }
  });
});
