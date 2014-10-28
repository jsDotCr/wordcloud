/*global describe, it, expect, Backbone */

define(function(require) {
  var TopicItemView = require('views/TopicItem');

  describe('Topic item view', function() {
    before(function(){

    });

    it('gets the label rendered', function(){
      var view = new TopicItemView({
        model: new Backbone.Model({
          label: 'whateverlabel'
        })
      });
      view.render();
      expect(view.$el.text().trim()).to.equal('whateverlabel');
    });

    describe('gets a specific classname added based on the sentiment score', function(){
      it('has a sentiment--cool CSS class if sentimentScore is > 60', function(){
        var view = new TopicItemView({
          model: new Backbone.Model({
            label: 'whateverlabel',
            sentimentScore: 61
          })
        });
        view.render();
        expect(view.$el.children('a').hasClass('sentiment--cool')).to.be.true;
      });

      it('has no sentiment--cool nor sentiment--bad CSS classes if sentimentScore is <= 60 and >= 40', function() {
        var viewNeutralMax = new TopicItemView({
          model: new Backbone.Model({
            label: 'whateverlabel',
            sentimentScore: 60
          })
        });
        viewNeutralMax.render();
        expect(viewNeutralMax.$el.children('a').hasClass('sentiment--bad')).to.be.false;
        expect(viewNeutralMax.$el.children('a').hasClass('sentiment--good')).to.be.false;

        var viewNeutralMin = new TopicItemView({
          model: new Backbone.Model({
            label: 'whateverlabel',
            sentimentScore: 40
          })
        });
        viewNeutralMin.render();
        expect(viewNeutralMin.$el.children('a').hasClass('sentiment--bad')).to.be.false;
        expect(viewNeutralMin.$el.children('a').hasClass('sentiment--good')).to.be.false;
      });

      it ('has a sentiment--bad CSS class if sentimentScore is < 40', function() {
        var viewBad = new TopicItemView({
          model: new Backbone.Model({
            label: 'whateverlabel',
            sentimentScore: 39
          })
        });
        viewBad.render();
        expect(viewBad.$el.children('a').hasClass('sentiment--bad')).to.be.true;
      });
    });

    describe('gets a specific font size', function(){
      /*
        With this fontSizeOptions object we are assuming the following ranges in sentimentScores:

        0-10: fontSize === 1;
        11-20: fontSize === 2;
        21-30: fontSize === 3;
        31-40: fontSize === 4;
        41-50: fontSize === 5;
        51-60: fontSize === 6;

        So the maximum sentimentScore allowed in this test will be 60.
      */
      var fontSizeOptions = {
        threshold: 10,
        maxDifferentSizes: 6
      };

      it('should have the highest sentimentScore to be the bigger', function(){
        var view = new TopicItemView({
          model: new Backbone.Model({
            label: 'whateverlabel',
            sentimentScore: 60
          }),
          fontSize: fontSizeOptions
        });
        view.render();
        expect(view.$el.children('a').hasClass('tag--size6')).to.be.true;
      });

      it('should have one of the higher sentimentScore to be the bigger', function(){
        var view = new TopicItemView({
          model: new Backbone.Model({
            label: 'whateverlabel',
            sentimentScore: 51
          }),
          fontSize: fontSizeOptions
        });
        view.render();
        expect(view.$el.children('a').hasClass('tag--size6')).to.be.true;
      });

      it('should have one of the lower sentimentScore to be the smaller', function(){
        var view = new TopicItemView({
          model: new Backbone.Model({
            label: 'whateverlabel',
            sentimentScore: 10
          }),
          fontSize: fontSizeOptions
        });
        view.render();
        expect(view.$el.children('a').hasClass('tag--size1')).to.be.true;
      });

      it('should have the lowest sentimentScore to be the smaller', function(){
        var view = new TopicItemView({
          model: new Backbone.Model({
            label: 'whateverlabel',
            sentimentScore: 0
          }),
          fontSize: fontSizeOptions
        });
        view.render();
        expect(view.$el.children('a').hasClass('tag--size1')).to.be.true;
      });
    });
  });
});
