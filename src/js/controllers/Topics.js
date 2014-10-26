define(['backbone', 'json!topics.json', 'collections/TopicList', 'views/TopicList', 'views/FocusedTopic'],
  function(Backbone, topicsData, TopicListCollection, TopicListView, FocusedTopicView) {
  "use strict";

  return Marionette.Object.extend({
    initialize: function(options){
      "use strict";

      this.options = options;

      if (!options.App){
        throw Error('Where\'s the app?');
      }

      var topicListCollection = this.topicListCollection = new TopicListCollection(options.topics || topicsData.topics, { }),
        topicListRegion = options.App.cloud,
        topicListView = new TopicListView({
          collection: topicListCollection,
          controller: this,
          region: topicListRegion
        });
      topicListRegion.show(topicListView);
      topicListView.render();
    },

    showFocusedTopic: function(id){
      "use strict";

      var focusedTopicRegion = this.options.App.focusedTopic,
        focusedTopicModel = this.topicListCollection.findWhere({
          id: id
        }),
        focusedTopicView = new FocusedTopicView({
          model: focusedTopicModel,
          controller: this,
          region: focusedTopicRegion
        });

      focusedTopicRegion.show(focusedTopicView);
      focusedTopicView.render();

      this.trigger('show:focusedTopic');
    }
  });
});
