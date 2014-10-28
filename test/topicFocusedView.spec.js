/*global describe, it, expect*/

define(function(require) {
  var FocusedTopicView = require('views/FocusedTopic');

  describe('Focused topic view', function() {
    it('should be rendered in a container with "spotlight" classname', function() {
      var view = new FocusedTopicView({
        model: new Backbone.Model({
          label: 'whateverlabel',
          volume: 61,
          sentiment: {}
        })
      });
      view.render();
      expect(view.$el.hasClass('spotlight')).to.be.true;
    });

    it('should have the model label as title', function() {
      var view = new FocusedTopicView({
        model: new Backbone.Model({
          label: 'whateverlabel',
          volume: 61,
          sentiment: {}
        })
      });
      view.render();
      expect(view.$el.find('.spotlight__title').text().trim()).to.equal('whateverlabel');
    });

    it('should have the # of mentions in an h4 tag', function() {
      var view = new FocusedTopicView({
        model: new Backbone.Model({
          label: 'whateverlabel',
          volume: 61,
          sentiment: {}
        })
      });
      view.render();
      expect(view.$el.find('h4').text().trim()).to.equal('61 mentions in total');
    });

    describe('positive, neutral and negative mentions', function() {
      it('should be rendered as per the model', function(){
        var view = new FocusedTopicView({
          model: new Backbone.Model({
            label: 'whateverlabel',
            volume: 61,
            sentiment: {
              positive: 17,
              neutral: 33,
              negative: 11
            }
          })
        });
        view.render();
        expect(view.$el.find('.sentiment--cool').text().trim()).to.equal('17');
        expect(view.$el.find('.sentiment').text().trim()).to.equal('33');
        expect(view.$el.find('.sentiment--bad').text().trim()).to.equal('11');
      });

      it('should be rendered regardless of their availability in the model (they should be 0 by default)', function(){
        var view = new FocusedTopicView({
          model: new Backbone.Model({
            label: 'whateverlabel',
            volume: 0,
            sentiment: {
            }
          })
        });
        view.render();
        expect(view.$el.find('.sentiment--cool').text().trim()).to.equal('0');
        expect(view.$el.find('.sentiment').text().trim()).to.equal('0');
        expect(view.$el.find('.sentiment--bad').text().trim()).to.equal('0');
      })
    });
  });
});
