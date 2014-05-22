var gulp = require('gulp');
var livereload = require('gulp-livereload');
var connect = require('connect');
var serveStatic = require('serve-static');
var concat = require('gulp-concat');

var src_js = [
  'app/app.js',
  'app/**/**/*.js'
];

var styles = [
  'app/assets/styles/*.css'
]

gulp.task('livereload', function(){
  var server = livereload();
  gulp.watch('dist/*').on('')
});

gulp.task('css', function(){
  gulp.src(styles)
    .pipe(concat('main.css'))
    .pipe(gulp.dest('app'))
})

gulp.task('karma-unit', function(){
  var server = karma.server;
  var karmaFiles = [
      'bower_components/angular-mocks/angular-mocks.js',
      'test/unit/*.js'
  ];
  karmaFiles = lib_js.concat(src_js.concat(karmaFiles));
  var config = {
    browsers: ['PhantomJS'],
    frameworks: ['jasmine'],
    singleRun: true,
    plugins: [
      'karma-jasmine',
      'karma-phantomjs-launcher'
    ],
    files: karmaFiles
  };
  
  server.start(config, function(exitCode){
    console.log('Karma exited with ' + exitCode);
  })  
})

gulp.task('staticsvr', function(next){
  var app = connect();
  app.use(serveStatic('.', {'index': 'app/index.html'}));
  app.listen(3000, function(){
    next();
    console.log('listen');
  });
})

gulp.task('dev', ['staticsvr'], function(){
  var lr = livereload();
/*  gulp.watch(src_js.concat(views), ['build', 'views', 'css']).on('change', function(file){
    lr.changed(file.path)
  });*/

  gulp.watch(['app/*.html'].concat(styles), ['css']).on('change', function(file){
    lr.changed(file.path);
  });

  //watch css and sass them
});