/*global describe, before, it*/

define(function(require) {
  var index = require('index');
  var TopicModel = require('topics/TopicModel');

  describe('Topic model', function() {
    before(function(){
      this.model = new TopicModel({name: 'fake'});
    });

    it('should be created with some predefined defaults', function() {
      expect(this.model.get('type')).equal('topic');
      expect(this.model.get('sentiment')).to.have.property('positive');
      expect(this.model.get('pageType')).to.have.keys(['blog', 'facebook', 'forum', 'general', 'image', 'news', 'review', 'twitter', 'video']);
    });

    it('should spectacularly fail without an ID', function() {
      expect(function(){
        new TopicModel({name: 'fake without id'}, { validate: true });
      }).to.throw(Error);
    });
  });
});

