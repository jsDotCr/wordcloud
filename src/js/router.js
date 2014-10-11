define('router', function(require, exports, module) {
  "use strict";

  var Backbone = require('backbone');

  module.exports = Backbone.Router.extend({
    routes: {
      '': 'index'
    },

    index: function() {
      require('./topics/index');
    }
  });
});
