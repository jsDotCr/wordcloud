define('App', ['backbone', 'marionette', './AppRouter'],
  function(Backbone, Marionette, AppRouter) {
  "use strict";

    var WordsCloud = new Marionette.Application();

    WordsCloud.addRegions({
      cloud: 'main',
      focusedTopic: 'aside'
    });

    WordsCloud.addInitializer(function () {
      new AppRouter({
        App: this
      });
    });
    WordsCloud.addInitializer(function(){
      if (Backbone.history){
        Backbone.history.start();
      }
    });

  return WordsCloud;
});
