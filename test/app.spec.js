/*global describe, it*/

define(function(require) {

  var Backbone = require('backbone');
  var App = require('app');
  var index = require('index');

  describe('App', function() {
    before(function(){

    });
    it('should have a root route', function() {
      expect(App.root).to.equal('/');
    });

    it('should have a defined router', function() {
      expect(App.router).to.be.an.instanceof(Backbone.Router);
    });
  });
});
