const gulp         = require('gulp'),
      sass         = require('gulp-sass'),
      plumber      = require('gulp-plumber'),
      nano         = require('gulp-cssnano'),
      sourcemaps   = require('gulp-sourcemaps'),
      autoprefixer = require('gulp-autoprefixer'),

      jade         = require('gulp-jade'),

      iconfont     = require('gulp-iconfont'),
      iconfontCss  = require('gulp-iconfont-css'),
      fontName     = 'Lunacon',
      runTimestamp = Math.round(Date.now()/1000),

      gulpif       = require('gulp-if'),
      del          = require('del');


const Paths = {

}


/********************************/
/* Font Maker
/********************************/
gulp.task('icons', ['clean'], () => {
  return gulp.src(`svgicons/**/*.svg`)
    .pipe(iconfontCss({
      fontName: fontName,
      path: `template/_icons.scss`,
      targetPath: '../../sass/_icons.scss',
      fontPath: 'lunacon/',
      cssClass: 'lunacon'
    }))
    .pipe(iconfont({
      fontName: fontName,
      preappendUnicode: false,
      appendCodepoints: true,
      normalize: true,
      fontHeight: 1001,
      formats: ['ttf', 'eot', 'woff', 'svg'],
      timestamp: runTimestamp, // recommended to get consistent builds when watching files
     }))
    .pipe(gulp.dest('lunacon/fonts/lunacon/'));
});


gulp.task('clean', ()=>{
  del([`lunacon/fonts/**`, `!lunacon/fonts`]);
  del([`lunacon/sass/fonts/_icons.scss`]);
});


gulp.task('jade', ()=>{
  return gulp.src('lunacon/jade/**/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('lunacon/'));
});

gulp.task('sass', ()=>{
  return gulp.src('lunacon/sass/**/*.{sass.scss}')
    .pipe(sass()).on('error', console.log(error))
    .pipe(gulp.dest('lunacon/css'));
});


gulp.task('default', ['icons', 'jade']);
