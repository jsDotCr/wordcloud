/*global describe, it, expect*/

define(function(require) {
  var TopicsController = require('controllers/Topics');

  describe('Topics controller', function() {
    before(function(){
      var fakeApp = {
        cloud: {
          show: sinon.stub()
        },
        focusedTopic: {
          show: sinon.stub()
        }
      };
      this.topicsController = new TopicsController({
        App: fakeApp,
        topics: [ {
          label: 'fake',
          sentimentScore: 1
        } ]
      });
    });

    it('should create a valid collection', function() {
      expect(this.topicsController.topicListCollection.models).to.be.ok;
    });

    it('should create a valid view', function() {
      expect(this.topicsController.view).to.be.instanceof(Backbone.Marionette.CollectionView);
    });

    after(function(){
      this.topicsController = null;
    })
  });
});
