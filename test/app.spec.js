/*global describe, it*/

define(function(require) {

  var Marionette = require('marionette');
  var App = require('App');

  describe('App', function() {
    before(function(){

    });

    it('should have a start function', function() {
      expect(App.start).to.be.a('function');
    });

    it('should have two regions', function() {
      expect(App.getRegion('focusedTopic')).to.be.instanceof(Marionette.Region);
      expect(App.getRegion('cloud')).to.be.instanceof(Marionette.Region);
    });
  });
});
