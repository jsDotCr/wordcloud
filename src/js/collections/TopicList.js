define(['backbone', 'underscore', 'models/Topic'], function(Backbone, _, TopicModel) {
  "use strict";
  return Backbone.Collection.extend({
    model: TopicModel
  });
});
