var gulp = require('gulp'),
  prefix = require('gulp-autoprefixer'),
  usemin = require('gulp-usemin'),
  uglify = require('gulp-uglify'),
  minifyHtml = require('gulp-minify-html'),
  minifyCss = require('gulp-minify-css'),
  rev = require('gulp-rev'),
  connect = require('gulp-connect'),
  jshint = require('gulp-jshint'),
  csslint = require('gulp-csslint'),
  inject = require('gulp-inject'),
  rjs = require('gulp-requirejs'),
  karma = require('karma').server;


var paths = {
  scripts: 'src/js/**/*.js',
  css: ['src/css/**/*.css', '!src/css/vendor/**/*.css'],
  html: 'src/index.html'
};


gulp.task('css', function() {
  gulp.src('bower_components/normalize.css/normalize.css')
    .pipe(gulp.dest('build/bower_components/normalize.css'));

  return gulp.src(paths.css)
    .pipe(csslint('.csslintrc'))
    .pipe(csslint.reporter())
    .pipe(prefix('last 2 versions'))
    .pipe(gulp.dest('build/css/'));
});

gulp.task('scripts', function() {
  return gulp.src(paths.scripts)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('rjs', ['scripts'], function(){
  rjs({
    mainConfigFile: 'src/js/config.js',
    baseUrl: 'src/js',
    name: 'index',
    out: 'js/wordscloud.js'
  })
    .pipe(gulp.dest('build/'));
});

gulp.task('copyscripts', ['rjs'], function(){
  return gulp.src(['bower_components/requirejs/require.js', 'src/js/config.js', 'build/js/wordscloud.js'])
    .pipe(gulp.dest('build/js'));
});

gulp.task('buildscripts', ['copyscripts'], function () {
  var target = gulp.src('src/index.html');
  var src = gulp.src(['build/js/require.js', 'build/js/config.js', 'build/js/wordscloud.js'], { read: false });

  return target
    .pipe(inject(src, { relative: true }))
    .pipe(gulp.dest('build/'));
});

gulp.task('build', ['css', 'buildscripts'], function() {
  gulp.src('build/index.html')
    .pipe(usemin({
      css: [minifyCss(), 'concat', rev()],
      js: [uglify(), rev()],
      html: [minifyHtml({empty: true})]
    }))
    .pipe(gulp.dest('build/'))
    .pipe(connect.reload());
});

gulp.task('watch', function() {
  gulp.watch([paths.css], ['css']);
  gulp.watch([paths.scripts], ['scripts']);
});

gulp.task('serve', function(){
  connect.server({
    livereload: true,
    port: 8767
  });
});

gulp.task('test', function (done) {
  karma.start({
    singleRun: false,
    colors: true,
    frameworks: ['mocha', 'requirejs', 'sinon-chai'],
    plugins: [
      'karma-mocha',
      'karma-coverage',
      'karma-requirejs',
      'karma-sinon-chai'
    ],
    files: [
      {pattern: 'node_modules/chai/**/*.js', included: false},
      {pattern: 'node_modules/sinon/lib/**/*.js', included: false},
      {pattern: 'node_modules/squirejs/src/*.js', included: false},
      //'node_modules/sinon-chai/lib/sinon-chai.js',
      //'node_modules/chai-backbone/chai-backbone.js',
      {pattern: 'bower_components/**/*.js', included: false},
      {pattern: 'src/js/**/*.*', included: false},
      {pattern: 'test/**/*.spec.js', included: false},
      'test/runner.js'
    ]
  }, done);
});

gulp.task('dev', ['serve', 'watch']);
gulp.task('prod', ['serve', 'build']);
