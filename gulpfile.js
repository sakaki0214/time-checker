'use strict';

var gulp        = require('gulp');
var compass     = require('gulp-compass');
var livereload  = require('gulp-livereload');

var SCSS_FILE   = './scss/*.scss';

var webserver = require('gulp-webserver');

gulp.task('webserver', function() {
  gulp.src('./')
    .pipe(webserver({
      port: 8888,
      livereload: true,
      directoryListing: true,
      open: true
    }));
});

/*
 * Compass
 */
gulp.task('compass',function(){
    gulp.src([SCSS_FILE])
        .pipe(compass({
            config_file : 'config.rb',
            comments : false,
            css : 'css/',
            sass: 'scss/'
        }))
        .pipe(livereload());
});


/*
 * Watch
 */
gulp.task('watch',function(){
    gulp.watch(SCSS_FILE, function(event){
        gulp.run('compass');
    });
});

gulp.task('default', ['watch','webserver']);
