/* global define */

define(['backbone', 'models/Topic'], function(Backbone, TopicModel) {
  "use strict";

  return Backbone.Collection.extend({
    model: TopicModel
  });
});
