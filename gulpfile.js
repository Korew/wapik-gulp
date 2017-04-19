var gulp = require('gulp'),
		less = require('gulp-less'),
		csso = require('gulp-csso'),
		autoprefixer = require('gulp-autoprefixer'),
		htmlmin = require('gulp-htmlmin'),
		imagemin = require('gulp-imagemin'),
		pngquant = require('imagemin-pngquant'),
		del = require('del'),
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
	.pipe(gulp.dest('./dist/css'));
});

gulp.task('html', function () {
	return gulp.src('./src/index.html')
	.pipe(htmlmin({collapseWhitespace: true}))
	.pipe(gulp.dest('./dist'));
});

gulp.task('images', function () {
    return gulp.src('./src/images/*.+(png|jpg|gif)')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('./dist/images'));
});

gulp.task('font', function() {
	return gulp.src('./src/font/**/*')
	.pipe(gulp.dest('./dist/font'))
})

gulp.task('clean:dist', function(callback){
	del(['dist/**/*', '!dist/images', '!dist/images/**/*', '!dist/font', '!dist/font/**/*'], callback)
});