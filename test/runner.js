var tests = [];
for (var file in window.__karma__.files) {
  if (/\/base\/test\/.*\.spec\.js$/.test(file)) {
    tests.push(file);
  }
}

requirejs.config({
  baseUrl: '/base/src/js',

  paths: {
    json: '../../bower_components/requirejs-plugins/src/json',
    domReady: '../../bower_components/domReady/domReady',
    text: '../../bower_components/requirejs-plugins/lib/text',
    handlebars: '../../bower_components/handlebars/handlebars',
    backbone: '../../bower_components/backbone/backbone',
    marionette: '../../bower_components/marionette/lib/backbone.marionette',
    underscore: '../../bower_components/underscore/underscore',
    jquery: '../../bower_components/jquery/dist/jquery',
    chai: '../../node_modules/chai/chai',
    //'chai-backbone': '../../node_modules/chai-backbone/chai-backbone',
    sinon: '../../node_modules/sinon/lib/sinon'
    //'sinon-chai': '../../node_modules/sinon-chai/lib/sinon-chai'
  },

  shim: {
    underscore: {
      exports: '_'
    },
    jquery: {
      exports: '$'
    }
  },

  // ask Require.js to load these files (all our tests)
  deps: tests,

  // start test run, once Require.js is done
  callback: window.__karma__.start
});

