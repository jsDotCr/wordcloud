require.config({
  baseUrl: 'js',
  paths : {
    json: '../../bower_components/requirejs-plugins/src/json',
    domReady: '../../bower_components/domReady/domReady',
    text: '../../bower_components/requirejs-plugins/lib/text',
    handlebars: '../../bower_components/handlebars/handlebars',
    backbone: '../../bower_components/backbone/backbone',
    marionette: '../../bower_components/marionette/lib/backbone.marionette',
    underscore: '../../bower_components/underscore/underscore',
    jquery: '../../bower_components/jquery/dist/jquery'
  },
  shim: {
    jquery: {
      exports: '$'
    }
  }
});
