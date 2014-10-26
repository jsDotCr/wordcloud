/*global describe, before, it, expect, Handlebars */

define(function(require) {
  var TopicListView = require('views/TopicList');
  var TopicListCollection = require('collections/TopicList');

  describe('Topic list view', function() {
    before(function(){
      this.collection = new TopicListCollection([{label: 'fake1', sentimentScore: 19}, {label: 'fake2', sentimentScore: 47}]);
      var controller = Marionette.Object.extend();
      this.view = new TopicListView({
        collection: this.collection,
        controller: new controller()
      });
    });

    it('has an empty $el before rendering it', function() {
      expect(this.view.$el.get(0).outerHTML).equal('<div></div>');
    });

    it('creates two children with the fake collection', function() {
      this.view.render();
      expect(this.view.$el.get(0).children.length).equal(2);
    });

    it('automagically updates the view when a new model gets added', function(){
      this.collection.add({
        label: 'new one'
      });
      expect(this.view.$el.get(0).children.length).equal(3);
    });

    after(function(){
      this.view.destroy();
      this.collection = null;
    });
  });
});

