var gulp 			= require('gulp');
var sass 			= require('gulp-sass');
var cleanCSS 		= require('gulp-clean-css');
var autoprefixer	= require('gulp-autoprefixer');
var concat 			= require('gulp-concat');
var rename 			= require("gulp-rename");
var minify 			= require('gulp-minify');
var babel 			= require('gulp-babel');

gulp.task('sass', function() {
  gulp.src('./app/sass/*.sass')
  .pipe(sass())
  .pipe(autoprefixer({
		browsers: ['last 3 versions'],
		cascade: true
  }))
  .pipe(rename({ basename: 'style'}))
  .pipe(gulp.dest('./dist/css'))
  .pipe(cleanCSS({compatibility: 'ie8'}))
  .pipe(rename({ prefix: 'min.'}))
  .pipe(gulp.dest('./dist/css'));
});

gulp.task('js', function() {
  gulp.src('./app/js/*.js')
  .pipe(babel({presets: ['es2015']}))
  .pipe(concat('scripte.js'))
  .pipe(gulp.dest('./dist/js'))
  .pipe(minify())
  .pipe(gulp.dest('./dist/js'));
  
});


gulp.task('default', function() {
	console.log("ABBRUCH mit STRG + C");
	gulp.watch(['./app/**/*.sass','./app/**/*.js'],
	['sass','js'])
})