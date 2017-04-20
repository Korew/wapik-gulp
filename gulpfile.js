var gulp = require('gulp'),
		less = require('gulp-less'),
		csso = require('gulp-csso'),
		autoprefixer = require('gulp-autoprefixer'),
		htmlmin = require('gulp-htmlmin'),
		browserSync = require('browser-sync'),
		imagemin = require('gulp-imagemin'),
		pngquant = require('imagemin-pngquant'),
		del = require('del'),
		cache = require('gulp-cache'),
		runSequence = require('run-sequence'),
		path = require('path');


gulp.task('less', function () {
	return gulp.src('./src/less/main.less')
	.pipe(less({
		paths: [ path.join(__dirname, 'less', 'includes') ]
	}))
	.pipe(autoprefixer({
		browsers: ['last 2 versions'],
		cascade: false
	}))
	.pipe(csso())
	.pipe(gulp.dest('./dist/css'))
	.pipe(browserSync.reload({
		stream: true
	}));
});

gulp.task('html', function () {
	return gulp.src('./src/index.html')
	.pipe(htmlmin({collapseWhitespace: true}))
	.pipe(gulp.dest('./dist'))
	.pipe(browserSync.reload({
		stream: true
	}));
});

gulp.task('browserSync', function() {
	browserSync({
		server: {
			baseDir: './dist'
		},
	})
});

gulp.task('watch', ['browserSync'], function (){
	gulp.watch('./src/less/**/*.less', ['less']);
	gulp.watch('./src/index.html', ['html']);
	gulp.watch('./src/font', ['font']);
	gulp.watch('./src/images/**/*', ['images', 'svg']);
})

gulp.task('images', function () {
    return gulp.src('./src/images/*.+(png|jpg|gif)')
        .pipe(cache(imagemin({
            progressive: true,
            use: [pngquant()]
        })))
        .pipe(gulp.dest('./dist/images'));
});

gulp.task('svg', function() {
	return gulp.src('./src/images/**/*.svg')
	.pipe(cache(gulp.dest('./dist/images')));
})

gulp.task('font', function() {
	return gulp.src('./src/font/**/*')
	.pipe(cache(gulp.dest('./dist/font')));
})

gulp.task('clean:dist', function(callback){
	del(['dist/**/*', '!dist/images', '!dist/images/**/*', '!dist/font', '!dist/font/**/*'], callback)
});

gulp.task('build', function (callback) {
  runSequence(
  	['less', 'html', 'images', 'svg', 'font'],
  	callback
  	)
});