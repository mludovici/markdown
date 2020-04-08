const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');

/*
gulp.task = tasks
gulp.src = src folder to use
gulp.dest = dest folder to output
gulp.watch = watch files and folders for changes
*/

gulp.task('message', function(done) {
	setTimeout(() => {
		console.log("Gulp is starting...");
		done();
	},3000);	
})

//Copy all html files
gulp.task('copyHTML', function(done) {
	gulp.src('src/*.html')
	.pipe(gulp.dest('dist'));
	done();
});


gulp.task('imageMin', () => (
	gulp.src('src/images/*')
			.pipe(imagemin())
			.pipe(gulp.dest('dist/images'))
));

gulp.task('minify', () => {	
	return gulp.src('src/js/*.js')
	.pipe(uglify())
	.pipe(gulp.dest('dist/js'));	
});

function test(done) {
	console.log("TEST");
	done();
}

exports.test = test;

gulp.task('sass',  () => (
	gulp.src('src/sass/*.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(gulp.dest('dist/css'))
));

gulp.task('scripts', function() {
	return gulp.src('src/js/*.js')
	.pipe(concat('main.js'))
	.pipe(uglify())
	.pipe(gulp.dest('dist/js'));
});

exports.default = gulp.series('message', 'copyHTML', gulp.parallel(
	'imageMin', 'minify', 'sass', test));

// exports.default = gulp.series('message', 
// 	gulp.parallel(['copyHTML', 'imageMin', 'minify', 'sass']));

gulp.task('watch', function(done) {
	gulp.watch('src/js/*.js', gulp.series('scripts'));
	gulp.watch('./src/sass/*.scss', test);
});