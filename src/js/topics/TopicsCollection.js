define(['backbone', './TopicModel'], function(Backbone, Model) {
  "use strict";
  return Backbone.Collection.extend({
    model: Model
  });
});
