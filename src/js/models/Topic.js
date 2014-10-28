/* global define */

define(['backbone'], function(Backbone) {
  "use strict";
  return Backbone.Model.extend({
    defaults: {
      'label': '',
      'volume': 0,
      'type': 'topic',
      'sentiment': {
        'negative': 0,
        'neutral': 0,
        'positive': 0
      },
      'sentimentScore': 0,
      'burst': 0,
      'days': [ ],
      'pageType': {
        'blog': 0,
        'facebook': 0,
        'forum': 0,
        'general': 0,
        'image': 0,
        'news': 0,
        'review': 0,
        'twitter': 0,
        'video': 0
      },
      'queries': [ ]
    },

    validate: function(attrs){
      if (!attrs.id){
        throw new Error('No ID no party');
      }
    }
  });
});
