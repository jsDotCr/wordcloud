/*global describe, it*/

define(function(require) {
  var index = require('index');
  var topicsModule = require('topics/index');
  var topicsView = require('topics/TopicView');
  var topicsCollection = require('topics/TopicsCollection');

  describe('App', function() {
    it('should create a collection', function() {
      expect(topicsModule).to.have.property('collection');
    });

    it('should create a TopicsCollection', function() {
      expect(topicsModule.collection).to.be.an.instanceof(topicsCollection);
    });
  });
});
