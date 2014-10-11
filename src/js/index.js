require(['config'], function() {
  require(['app', 'router'], function(App, Router) {
    'use strict';

    App.router = new Router();

    Backbone.history.start({
      pushState: true,
      root: App.root
    });
  });
});
