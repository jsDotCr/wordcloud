/* global define */

define(['marionette', 'controllers/Topics'], function(Marionette, Topics) {
  "use strict";

  return Marionette.AppRouter.extend({
    routes: {
      '': 'topics',
      'detail/:id': 'showDetail'
    },

    topics: function() {
      this.topicsController = new Topics({
        App: this.options.App
      });
    },

    showDetail: function(id){
      if (!this.topicsController){
        this.topics();
      }
      this.topicsController.showFocusedTopic(id);
    }
  });
});
