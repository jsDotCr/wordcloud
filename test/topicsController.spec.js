/*global describe, it, expect, sinon */

define(function(require) {
  var TopicsController = require('controllers/Topics');

  describe('Topics controller', function() {
    before(function(){
      this.fakeApp = {
        cloud: {
          show: sinon.spy()
        },
        focusedTopic: {
          show: sinon.spy()
        }
      };
      this.topicsController = new TopicsController({
        App: this.fakeApp,
        topics: [
          {
            id: 10,
            label: 'wonderful fakeTopic',
            sentimentScore: 1
          },
          {
            id: 42,
            label: 'second wonderful fakeTopic',
            sentimentScore: 10
          }
        ]
      });
    });

    it('should create a valid collection', function() {
      expect(this.topicsController.topicListCollection.models).to.be.ok;
    });

    it('should have two associated models', function() {
      expect(this.topicsController.topicListCollection.length).equals(2);
      expect(this.topicsController.topicListCollection.at(0).get('label')).equals('wonderful fakeTopic');
    });

    it('should call the show function of the cloud region', function() {
      expect(this.fakeApp.cloud.show).to.have.been.calledOnce;
      expect(this.fakeApp.focusedTopic.show).to.not.have.been.called;
    });

    describe('showFocusedTopic function', function(){
      it('should throw an exception if called with an invalid model id as argument', function(){
        var topicsController = this.topicsController;
        var errorThrower = function(){
          topicsController.showFocusedTopic();
        };
        expect(errorThrower).to.throw(Error, 'this.model is undefined');
        var errorThrowerBis = function(){
          topicsController.showFocusedTopic(99999999);
        };
        expect(errorThrowerBis).to.throw(Error, 'this.model is undefined');
      });

      it('should call the show function on the focusedTopic', function(){
        var eventSpy = sinon.spy();
        this.topicsController.listenTo(this.topicsController, 'show:focusedTopic', eventSpy);
        this.topicsController.showFocusedTopic(42);

        expect(this.fakeApp.focusedTopic.show).to.not.have.been.calledOnce;
        expect(eventSpy).to.have.been.calledOnce;
      });
    });

    after(function(){
      this.topicsController = null;
    })
  });
});
