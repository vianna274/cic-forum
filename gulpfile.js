let gulp = require('gulp');
var eslint = require('gulp-eslint');
let nodemon = require('gulp-nodemon');

var jsFiles = [
  '*.js',
  'src/**/*.js'
];

/**
  Function to setup nodemon
  to reload at every change
  on js files
*/
let runApp = () => {
  let options = {
    script: 'app.js',
    delayTime: 1,
    env: {
      'PORT': 5000
    },
    watch: jsFiles
  };

  let myApp =
    nodemon(options)
      .on('restart', () => {
        console.log('Restarting...');
      })
      .on('crash', () => {
        console.error('Application has crashed!\n');
        myApp.emit('restart', 10);
      });
}

/*
  Function that verifies
  the syntax of every js
  file
*/
let verifySyntax = () => {
  gulp.src(jsFiles)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}

/*
  Execute both tasks in parallel
*/
const gulpRun = gulp.parallel(runApp, verifySyntax);

gulp.task('server', gulpRun);
