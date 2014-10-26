/*global describe, it*/

define(function(require) {
  var Backbone = require('backbone');
  var Router = require('AppRouter');

  describe('Router', function() {
    it('should exist', function() {
      expect(Router).to.exist;
      expect(new Router()).to.be.an.instanceof(Backbone.Router);
    });
  });
});
