var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var del = require('del');
var bowerFiles = require('main-bower-files');
var Q = require('q');
var concatCss = require('gulp-concat-css');
var cleanCSS = require('gulp-clean-css');
var sass = require('gulp-sass');

// == PATH STRINGS ========
var PATHS = {
    bowerDir: './bower_components' ,
    fonts: './app/assets/fonts' ,
    scripts: './app/**/*.js',
    styles: './app/**/*.scss',
    images: './app/assets/images/**/*',
    index: './app/index.html',
    partials: './app/templates/*.html',
    distVendor: './public/lib',
    public: './public',
    server_path: 'server.js'
};

// == TASKS ========
gulp.task('del', function() {
    var deferred = Q.defer();
    del(PATHS.public);
});

gulp.task('index', function() {
    return gulp.src(PATHS.index)
        .pipe(plugins.htmlhint())
        .pipe(plugins.htmlhint.reporter())
        .pipe(gulp.dest(PATHS.public));
});

gulp.task('templates', function() {
    return gulp.src(PATHS.partials)
        .pipe(gulp.dest(PATHS.public + '/templates'));
});

gulp.task('images', function() {
    return gulp.src(PATHS.images)
        .pipe(gulp.dest(PATHS.public + '/images/'));
});

gulp.task('js', function() {
    return gulp.src(PATHS.scripts)
        //.pipe(plugins.jshint())
        //.pipe(plugins.jshint.reporter('jshint-stylish'));
        .pipe(plugins.angularFilesort())
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.concat('app.js'))
        //.pipe(plugins.uglify())
        // .pipe(plugins.sourcemaps.write())
        .pipe(gulp.dest(PATHS.public));
});

gulp.task('fonts', function() {
    return gulp
        .src([
            PATHS.fonts + '/*.*',
            PATHS.bowerDir + '/bootstrap-sass/assets/fonts/**/*'
        ])
        .pipe(gulp.dest(PATHS.public + '/fonts'));
});

gulp.task('css', function() {
    return gulp.src('./app/assets/css/main.scss')
        .pipe(sass({
            includePaths: [
                PATHS.bowerDir + '/bootstrap-sass/assets/stylesheets',
            ]
        }))
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest(PATHS.public + '/css'));
});

gulp.task('vendor', function() {
    return gulp.src(bowerFiles(['**/*.js']))
        .pipe(plugins.concat('vendor.min.js'))
        .pipe(plugins.uglify())
        .pipe(gulp.dest(PATHS.distVendor));
});

// ------------------------------------------------------------------
// ------------------------------------------------------------------
// ------------------------------ WORK ------------------------------
// ------------------------------------------------------------------
// ------------------------------------------------------------------
gulp.task('build', [
    'vendor',
    'fonts',
    'css',
    'js',
    'images',
    'index',
    'templates'
]);

gulp.task('watch', ['build'], function() {
    plugins.nodemon({
            script: PATHS.server_path,
            ext: 'js',
            env: {
                NODE_ENV: 'development'
            }
        })
        .on('restart', function() {
            console.log('[nodemon] restarted dev server');
        });

    gulp.watch(PATHS.scripts, ['js']);
    gulp.watch(PATHS.partials, ['templates']);
    gulp.watch(PATHS.styles, ['css']);
    gulp.watch(PATHS.index, ['index']);
});

// default task builds for prod
gulp.task('default', ['watch']);
