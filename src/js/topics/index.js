define(['backbone', 'json!./topics.json', './TopicsCollection'], function(Backbone, topicsData, TopicsCollection) {
  "use strict";

  var topicsCollection = new TopicsCollection(topicsData, { });

  return {
    collection: topicsCollection
  }
});
