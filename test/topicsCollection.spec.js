/*global describe, before, it*/

define(function(require) {
  var index = require('index');
  var TopicsCollection = require('topics/TopicsCollection');
  var topicModel = require('topics/TopicModel');

  describe('Topics collection', function() {
    before(function(){
      this.collection = new TopicsCollection([{name: 'fake'}, {name: 'testing'}, {name: 'collection'}]);
    });
    it('should have length === 3', function() {
      expect(this.collection.length).equal(3);
    });
    it('should be created with a TopicsModel base model', function() {
      expect(this.collection.at(0)).to.be.instanceof(topicModel);
    });
  });
});
