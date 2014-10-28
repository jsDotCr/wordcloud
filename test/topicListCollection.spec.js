/*global define, describe, before, it, expect*/

define(function(require) {
  var TopicsCollection = require('collections/TopicList');

  describe('Topic list collection', function() {
    before(function(){
      this.collection = new TopicsCollection([{name: 'fake'}, {name: 'testing'}, {name: 'collection'}]);
    });
    it('should have length === 3', function() {
      expect(this.collection.length).equal(3);
    });
    it('should have items of the default model (aka models/Topic)', function() {
      expect(this.collection.at(0)).to.be.instanceof(this.collection.model);
    });
  });
});
