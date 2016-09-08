const gulp = require('gulp');

//streams
const sourcemaps = require('gulp-sourcemaps');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

// bundlers, watchers, etc.
const babel = require('babelify');
const browserify = require('browserify');
const watch = require('gulp-watch');
const uglify = require('gulp-uglify');
const pump = require('pump');

//css 
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

//font libraries
const fontAwesome = require('node-font-awesome');

//Bootstrap
const path = require('path');
const bootstrapEntry = require.resolve('bootstrap-sass');
const bootstrapSCSS = path.join(bootstrapEntry, '..', '..', 'stylesheets');

//localhost, node server
const server = require('gulp-server-livereload');
const nodemon = require('gulp-nodemon');

//linters
const eslint = require('gulp-eslint');
const htmlhint = require('gulp-htmlhint');

//error handlers
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');

const notifyError = () => {
  return plumber({
    errorHandler: notify.onError("Error: <%= error.message %>")
  });
}

const browserifyError = (err) => {
  notify.onError("Error: <%= error.message %>")(err);
  this.emit('end');
}

//////////////////////////
// styles+fonts+linters// 
////////////////////////
gulp.task('sass', () => {
  gulp.src('./sass/main.scss')
    .pipe(notifyError())
    .pipe(sourcemaps.init({
      loadMaps: true
    }))
    .pipe(sass({
      includePaths: require('node-neat').with([fontAwesome.scssPath, bootstrapSCSS])
    }))
    .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./app/css'));
});

// gulp.task('normalize', () => {
//   gulp.src(require.resolve('normalize.css'))
//     .pipe(notifyError())
//     .pipe(uglify())
//     .pipe(gulp.dest('./app/css'));
// });

gulp.task('fonts', () => {
  gulp.src(fontAwesome.fonts)
    .pipe(notifyError())
    .pipe(gulp.dest('./app/fonts'));
});

gulp.task('style:js', () => {
  return gulp.src('./js/**/**.js')
    .pipe(eslint())
    .pipe(eslint.format())
});

gulp.task('hint:html', () => {
  return gulp.src('./app/index.html')
    .pipe(notifyError())
    .pipe(htmlhint())
    .pipe(htmlhint.failReporter());
});


///////////////
// Bundlers //
/////////////
gulp.task('browserify', () => {
  return browserify('./js/main.js', {
      debug: true
    })
    .transform(babel)
    .bundle()
    .on('error', browserifyError)
    .pipe(source('./main.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(sourcemaps.init({
      loadMaps: true
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./app/js'));
});


gulp.task('browserify-test', () => {
  return browserify('./js/tests.js', {
      debug: true
    })
    .transform(babel)
    .bundle()
    .on('error', browserifyError)
    .pipe(source('./tests.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({
      loadMaps: true
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./spec/'));
});


gulp.task('watch', () => {
  watch('./sass/**/*.scss', () => gulp.start('sass'));
  watch(['./js/**/*.js', './package.json'], () => gulp.start(['browserify', 'browserify-test']));
  watch('./app/index.html', () => gulp.start('hint:html'));
  watch('./js/**/*.js', () => gulp.start('style:js'));
});

//////////////////
// server tasks//
////////////////
gulp.task('server', ['default'], () => {
  gulp.src('app')
    .pipe(server({
      livereload: {
        enable: true
      },
    }))
});

gulp.task('nodemon', () => {
  gulp.src('server.js')
  var stream = nodemon({
    script: 'server.js'
  })
  return stream;
});

gulp.task('lint', ['style:js', 'hint:html']);

gulp.task('default', [
  'sass',
  'fonts',
  'lint',
  'browserify'
]);


//serve
gulp.task('serve-client', ['default', 'watch', 'server']);

gulp.task('serve-express', ['default', 'watch', 'nodemon']);

//serve both client and server code
gulp.task('start', ['default', 'watch','server','nodemon' ]);





